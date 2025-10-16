import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const response = fetch("/api/get-csrf-token/", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/whoami/", {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    if(data.user) {
                        setUser(data.user);
                        console.log("Current user:", data.user);
                    } else {
                        setUser(null);
                        console.log("No user logged in");
                    }
                } else {
                    setUser(null);
                    console.log(data.message || `HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                    setUser(null);
                    console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/whoami/", {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            const data = await response.json();
            if (response.ok) {
                if(data.user) {
                    setUser(data.user);
                    console.log("Current user:", data.user);
                } else {
                    setUser(null);
                    console.log("No user logged in");
                }
            } else {
                setUser(null);
                console.log(data.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
                setUser(null);
                console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser }} >{children}</AuthContext.Provider>
    );
}

