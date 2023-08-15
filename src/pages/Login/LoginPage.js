import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button, FormLabel, Input } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      console.log("success");
      navigate("/homepage");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="main">
      <div className="left-sec">
        <div className="black">
          <p>LILAC</p>
          <p>INFO</p>
          <p>SOLUTIONS</p>
        </div>
        <div className="white">
          <p>LILAC</p>
          <p>INFO</p>
          <p>SOLUTIONS</p>
        </div>
      </div>
      <div className="right-sec">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-div">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-div">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? (
              <CircularProgress size={20} /> 
            ) : (
              "Login"
            )}
          </Button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
