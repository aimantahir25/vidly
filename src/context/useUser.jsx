import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(()=> {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
});

    return (
        <UserContext.Provider value= {{ user:{user, setUser} }}>
            {children}
        </UserContext.Provider>
    );

}