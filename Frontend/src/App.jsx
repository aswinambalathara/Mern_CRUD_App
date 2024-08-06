import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";
import Profile from "./Pages/User/Profile";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminLogin from "./Pages/Admin/Login";
import UserManagement from "./Pages/Admin/UserManagement";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin">
          <Route index element={<Dashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="user_management" element={<UserManagement />} />
        </Route>
        <Route path="*" element={<div style={{display:"flex",alignItems:"center",justifyContent:"center", minHeight:'100vh'}}><p>NOT FOUND</p></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
