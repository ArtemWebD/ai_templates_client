import { Route, Routes } from "react-router-dom"
import MainPage from "../pages/main/MainPage";
import AuthPage from "../pages/auth/AuthPage";
import AdminPage from "../pages/admin/AdminPage";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <MainPage /> } />
            <Route path="/authorization" element={ <AuthPage /> } />
            <Route path="/admin" element={ <AdminPage /> } />
        </Routes>
    );
}

export default PageRouter;