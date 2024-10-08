import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";
import Profile from "./Pages/User/Profile";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminLogin from "./Pages/Admin/Login";
import CreateUserPage from "./Pages/Admin/CreateUserPage";
import EditUserPage from "./Pages/Admin/EditUserPage";
import UserPrivatePage from "./Pages/PrivateRoutes/UserPrivatePage";
import NotPrivatePage from "./Pages/PrivateRoutes/NotPrivatePage";
import AdminPrivatePage from "./Pages/PrivateRoutes/AdminPrivatePage";
import AdminNotPrivatePage from "./Pages/PrivateRoutes/AdminNotPrivatePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserPrivatePage/>}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route element={<NotPrivatePage/>}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        </Route>
        <Route element={<AdminNotPrivatePage/>}>
        <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        <Route path="/admin" element={<AdminPrivatePage/>}>
          <Route index element={<Dashboard />} />
          <Route path="create_user" element={<CreateUserPage/>}/>
          <Route path="edit_user/:userId" element={<EditUserPage/>}/>
        </Route>
        <Route path="*" element={<div style={{display:"flex",alignItems:"center",justifyContent:"center", minHeight:'100vh'}}><p>NOT FOUND</p></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
