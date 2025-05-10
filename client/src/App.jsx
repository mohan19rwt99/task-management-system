import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminUsers from "./admin/AdminUsers";
import AdminSettings from "./admin/AdminSettings";
import UserDashboard from "./user/UserDashboard";
import CreateTask from "./user/CreateTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="task" element={<CreateTask/>}/>
          </Route>

          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings   />} />
          </Route>

      
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
