import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home"
import RegisterPage from "./pages/RegisterPage";
import './App.css';
import Archive from "./pages/Archive";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/archive" element={<Archive />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;