import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function HeaderApp() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Dashboard</Button>
            </Link>
          </Typography>
          <Typography><Link
              to="/websites"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Websites</Button>
            </Link></Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderApp;
