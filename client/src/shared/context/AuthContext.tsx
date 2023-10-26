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

let logoutTime: string | number | NodeJS.Timeout | undefined;

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>("")
    const [tokenExpiration, setTokenExpiration] = useState<Date | null>(null)

    const login = useCallback((uid: string, token: string, expirationDate?: Date) => {
        setToken(token)
        setUserId(uid)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpiration(tokenExpirationDate)
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token,
                expiration: tokenExpirationDate.toISOString()
            })
        )
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("userData")
        setTokenExpiration(null)
        setToken(null)
        setUserId(null)
    }, [])

    useEffect(() => {
        const storedData = localStorage.getItem("userData")
        if (storedData) {
            const data = JSON.parse(storedData)
            if (data && data.token && new Date(data.expiration) > new Date()) {
                login(data.userId, data.token, new Date(data.expiration))
            }
        }
    }, [login])

    useEffect(() => {
        if (token && tokenExpiration) {
            const remainingTIme = tokenExpiration.getTime() - new Date().getTime()
            logoutTime = setTimeout(logout, remainingTIme)
        } else {
            clearTimeout(logoutTime)
        }
    }, [logout, token, tokenExpiration])

    return (
        <AuthContext.Provider
            value={{ login, logout, isLoggedIn: !!token, userId, token }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };