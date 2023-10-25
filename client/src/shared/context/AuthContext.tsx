import { createContext, useCallback, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean,
    token: string | null,
    login: (uid: string, token: string) => void,
    logout: () => void,
    userId: string | null,
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    token: null,
    login: () => { },
    logout: () => { },
    userId: null
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>("")

    const login = useCallback((uid: string, token: string) => {
        setToken(token)
        setUserId(uid)
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
    }, [])


    return (
        <AuthContext.Provider
            value={{ login, logout, isLoggedIn: !!token, userId, token }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };