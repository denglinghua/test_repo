import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Evaluate from './pages/Evaluate';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/evaluate" element={<Evaluate />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;