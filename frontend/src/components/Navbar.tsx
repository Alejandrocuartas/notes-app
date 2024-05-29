import React from "react";
import { useGlobalState } from "../context";

const Navbar = () => {
    const globalState = useGlobalState()

    const logOut = () => {
        localStorage.removeItem("notes_app_user");
        window.location.href = "/login";
    }

    return (
        <div>
            <button onClick={logOut}>{globalState?.name ? globalState.name : "Hola"}</button>
        </div>
    )
}

export default Navbar