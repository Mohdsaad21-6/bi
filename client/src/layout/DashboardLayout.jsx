import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Login from "../components/login";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../BASE_URL.JSX";

const DashboardLayout = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL+"/profile", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.user));
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-gray-600">
        <div className="text-lg font-medium animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <Login />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
