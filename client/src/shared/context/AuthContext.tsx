import { createContext, useCallback, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean,
    login: (uid: string) => void,
    logout: () => void,
    userId: string | null,
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    userId: null
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | null>("")

    const login = useCallback((uid: string) => {
        setIsLoggedIn(true)
        setUserId(uid)
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
        setUserId(null)
    }, [])


    return (
        <AuthContext.Provider
            value={{ login, logout, isLoggedIn, userId }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };