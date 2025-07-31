import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { BASE_URL } from "../BASE_URL.JSX";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login", // Replace with your actual backend URL
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
      console.log(res.data);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:3000/signup",
        BASE_URL+"/signup", // Replace with your actual backend URL
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
      console.log(res.data);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        width: "100%",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" align="center" fontWeight={600}>
          {isLoginForm ? "Login" : "Sign Up"}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          {!isLoginForm && (
            <>
              <TextField
                label="First Name"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextField
            label="Email ID"
            type="email"
            fullWidth
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={isLoginForm ? handleOnSubmit : handleSignUp}
          >
            {isLoginForm ? "Login" : "Create Account"}
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
          onClick={() => setIsLoginForm((prev) => !prev)}
        >
          {isLoginForm
            ? "New user? Sign up here"
            : "Already registered? Login here"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
