import { createContext, useCallback, useEffect, useState } from "react";

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
        localStorage.setItem("userData", JSON.stringify({ userId: uid, token }))
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("userId")
        setToken(null)
        setUserId(null)
    }, [])

    useEffect(() => {
        const storedData = localStorage.getItem("userData")
        if (storedData) {
            const data = JSON.parse(storedData)
            if (data && data.token) {
                login(data.userId, data.token)
            }
        }
    }, [login])


    return (
        <AuthContext.Provider
            value={{ login, logout, isLoggedIn: !!token, userId, token }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };