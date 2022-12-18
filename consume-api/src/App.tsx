import React, {ReactElement, useEffect, useState} from "react";
import "./App.css";
import axios from "axios";

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

function App(): ReactElement {
    const [response, setResponse] = useState({
        copyright: "",
        date: "",
        explanation: "",
        hdurl: "",
        media_type: "",
        service_version: "",
        title: "",
        url: ""
    });

    async function getImages() {
        try {
            const {data} = await axios.get<Response>("https://go-apod.herokuapp.com/apod", {
                headers: {
                    Accept: "application/json"
                }
            });
            setResponse(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("error message: ", error.message);
                return error.message;
            } else {
                console.log("unexpected error: ", error);
                return "An unexpected error occurred";
            }
        }
    }
    getImages();

    // useEffect(() => {
    //     console.log('test')
    // }, []);

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
