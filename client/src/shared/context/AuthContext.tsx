import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean,
    token: string | null,
    login: (uid: string, token: string, expirationDate?: Date) => void,
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

    const login = useCallback((uid: string, token: string, expirationDate?: Date) => {
        setToken(token)
        setUserId(uid)
        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token,
                expiration: tokenExpiration.toISOString()
            })
        )
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
            if (data && data.token && new Date(data.expirationDate) > new Date()) {
                login(data.userId, data.token, new Date(data.expirationDate))
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