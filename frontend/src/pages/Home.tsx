import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authValidator } from "../hooks/auth_validator";
const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const isLogged = authValidator();
        !isLogged ? navigate("/login") : null
    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;