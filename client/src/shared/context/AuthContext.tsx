import { createContext, useCallback, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean,
    login: () => void,
    logout: () => void,
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const login = useCallback(() => {
        setIsLoggedIn(true)
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
    }, [])


    return (
        <AuthContext.Provider
            value={{ login, logout, isLoggedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };