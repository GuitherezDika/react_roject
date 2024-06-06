import React from 'react';

import { Container } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

    return (
        <GoogleOAuthProvider clientId='720796861195-0kfgqf7340agfivb86f83qoe6ee1dd1a.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/auth' exact element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;