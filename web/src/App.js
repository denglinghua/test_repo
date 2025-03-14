import React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { BrowserRouter as Router } from "react-router-dom";
import useUserStore from "./stores/userStore";
import useLoadingStore from "./stores/loadingStore";
import "./styles/App.css";
import AppRoutes from "./routes";
import Loading from "./components/Loading";
import Notification from "./components/Notification";

const App = () => {
  const username = useUserStore((state) => state.username);
  const clearUser = useUserStore((state) => state.clearUser);
  const loading = useLoadingStore((state) => state.loading);

  const checkAuth = () => {
    const noAuthRoutes = ["/", "/error"];
    const isNoAuthRoute = noAuthRoutes.includes(window.location.pathname);
    if (!isNoAuthRoute && !username) {
      gotoLogin();
    }
  };

  const handleLogout = () => {
    clearUser();
    gotoLogin();
  };

  const gotoLogin = () => {
    window.location.href = "/";
  };

  checkAuth();

  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Radiology Report Evaluation Tool
            </Typography>
            {username && (
              <Box display="flex" alignItems="center">
                <Typography variant="h6">Welcome, {username}</Typography>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  aria-label="logout"
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <main>
            <AppRoutes />
          </main>
        </Container>
        <Loading open={loading} />
        <Notification />
      </div>
    </Router>
  );
};

export default App;
