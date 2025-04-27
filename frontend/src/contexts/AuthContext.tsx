import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { IUser } from "../interfaces";

interface AuthContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    logout: () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = Cookies.get('token');
        if (savedToken) {
            setToken(savedToken);
            const decoded = jwtDecode<IUser>(savedToken);
            setUser(decoded);
        }
    }, []);

    const logout = () => {
        setToken(null);
        setUser(null);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
}
