import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Evaluate from './pages/Evaluate';
import Error from './pages/Error';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/evaluate" element={<Evaluate />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;