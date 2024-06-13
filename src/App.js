import React from 'react';
import { Container } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
                        <Route path='/' exact element={() => <Navigate to="/posts" />} />
                        <Route path='/posts' exact element={<Home />} />
                        <Route path='/posts/search' exact element={<Home />} />
                        <Route path='/posts/:id' exact element={<PostDetails />} />
                        <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;