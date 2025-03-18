import * as React from "react";
import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as g from "../utils/global";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    g.setLoading(true);

    api
      .post("/login", { username: username })
      .then((res) => {
        setUser(res.data.username);
        api.setAuthToken(res.data.token);

        navigate("/evaluate");
      })
      .catch((err) => {
        if (err.code === 1) {
          setError(err.msg);
        }
      })
      .finally(() => {
        g.setLoading(false);
      });
  };

  return (
    <Stack alignItems="center" justifyContent="center" minHeight={"80vh"}>
      <form noValidate autoComplete="off" onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          fullWidth
          required
          error={!!error}
          helperText={error}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth disabled={!username}>
          Login
        </Button>
      </form>
    </Stack>
  );
};

export default Login;
