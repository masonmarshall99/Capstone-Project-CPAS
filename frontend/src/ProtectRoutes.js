import { Navigate } from "react-router-dom";
import { useAuth } from "./CheckAuth";

const ProtectRoutes = ({ children, authOnly = false, guestOnly = false }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (authOnly && !user) {
        return <Navigate to="/login" />;
    }

    if (user && guestOnly) {
        return <Navigate to="/dash" />;
    }

    return children;
}

export default ProtectRoutes;