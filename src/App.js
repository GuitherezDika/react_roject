import React, { useEffect, useState } from 'react';
import { Container } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = useState(JSON.parse(localStorage.getItem('profile')));
    
    return (
        <GoogleOAuthProvider clientId='720796861195-0kfgqf7340agfivb86f83qoe6ee1dd1a.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Navigate to="/posts" />}
                        // Navigate to == Fungsi Redirect ke halaman Posts => route di url => "/posts"
                        />

                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/search' element={<Home />} />
                        <Route path='/posts/:id' element={<PostDetails />} />
                        <Route path='/auth' element={!user ? <Auth /> : <Navigate to="/posts" />} 
                        // Navigate to = bila user sudah login tapi akan akses url "/auth" => web akan kembali ke route "/posts" 
                        />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;