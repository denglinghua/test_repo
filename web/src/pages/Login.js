import React, { useState } from "react";
import { Container, TextField, Button, Box } from "@mui/material";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    api.post("/login", { username : username }).then((res) => {
      setUser(res.data.username);
      api.setAuthToken(res.data.token);

      navigate("/evaluate");
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!username}
            style={{ marginTop: "1rem" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
