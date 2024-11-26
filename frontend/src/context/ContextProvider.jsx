import React, { createContext, useContext, useState } from 'react'

const authContext = createContext()

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null); // Đặt lại user thành null khi đăng xuất
    };

    return (
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);

export default ContextProvider;
