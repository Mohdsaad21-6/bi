
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../BASE_URL.JSX";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-400 underline"
      : "hover:text-indigo-400";


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL+"/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
      //redirect to error page
    }
  };
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col justify-between p-4">
      <div>
        <h2 className="text-xl font-semibold mb-6">Panthera Dashboard</h2>

        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-2 px-3 hover:bg-gray-700 rounded"
        >
          Data Analytics
        </button>

        {open && (
          <div className="ml-4 mt-2 flex flex-col space-y-2">
            <NavLink to="/market-view" className={linkClass}>
              Market View
            </NavLink>
            <NavLink to="/acquisition-view" className={linkClass}>
              Acquisition View
            </NavLink>
            <NavLink to="/urls" className={linkClass}>
              URLs
            </NavLink>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800 rounded flex items-center gap-2"
        >
          <span>👤</span> Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
