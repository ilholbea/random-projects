import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type ApiResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

interface Response {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

type GetApiResponse = {
  data: ApiResponse[];
};

async function getImages() {
  try {
    const { data, status } = await axios.get<GetApiResponse>('https://go-apod.herokuapp.com/apod', {
      headers: {
        Accept: 'application/json'
      }
    });

    console.log('response status: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

function App(): ReactElement {
  const [response, setResponse] = useState({
    copyright: '',
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    service_version: '',
    title: '',
    url: ''
  });

  useEffect(() => {
    getImages().then((data) => {
      setResponse(JSON.parse(JSON.stringify(data)) as Response);
    });
  }, []);

  return (
    <div>
      <p>{response.copyright}</p>
      <p>{response.date}</p>
      <p>{response.explanation}</p>
      <p>{response.hdurl}</p>
      <p>{response.media_type}</p>
      <p>{response.service_version}</p>
      <p>{response.title}</p>
      <p>{response.url}</p>
    </div>
  );
}

export default App;
