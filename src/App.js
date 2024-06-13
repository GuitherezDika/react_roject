import React from 'react';
import { Container } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <GoogleOAuthProvider clientId='720796861195-0kfgqf7340agfivb86f83qoe6ee1dd1a.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/search' element={<Home />} />
                        <Route path='/posts/:id' element={<PostDetails />} />
                        <Route path='/auth' element={!user ? <Auth /> : <Home />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;