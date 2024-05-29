import React, { useState, createContext, useContext, useEffect } from "react";

const logContext = createContext<UserContext>(null);
const Context = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserContext>(null);

    return (
        <logContext.Provider value={{
            name: user?.name,
            setUser,
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };