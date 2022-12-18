import React from 'react';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { GoogleLogin } from '@react-oauth/google';

import { client } from '../client';
import jwtDecode from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
        const { name, picture, sub } = jwtDecode(response.credential);
        const userInfo = { id: sub, name: name, image: picture };
        localStorage.setItem('user', JSON.stringify(userInfo));

        const doc = {
            _id: userInfo.id,
            _type: 'user',
            userName: userInfo.name,
            image: userInfo.image
        };

        client.createIfNotExists(doc).then(
            () => {
                navigate('/', { replace: true });
            }
        );
    };

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />

                <div
                    className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay '>
                    <div className='p-5'>
                        <img src={logo} width='130px' alt='logo' />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
