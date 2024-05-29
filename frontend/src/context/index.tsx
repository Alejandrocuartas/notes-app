import React, { useState, createContext, useContext } from "react";

const logContext = createContext<UserContext | null>(null);
const Context = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserContext | null>(null);

    return (
        <logContext.Provider value={{
            tag_id: user?.tag_id,
            id: user?.id,
            name: user?.name,
            setUser,
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };