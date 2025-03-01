import React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import useUserStore from "./stores/userStore";
import "./styles/App.css";
import AppRoutes from "./routes";

const App = () => {
  const username = useUserStore((state) => state.username);

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
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <main>
            <AppRoutes />
          </main>
        </Container>
      </div>
    </Router>
  );
};

export default App;
