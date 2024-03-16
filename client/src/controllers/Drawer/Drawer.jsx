import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ProfileImage from "../Profile";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/Context";
import MainLoan from "../Loan/MainLoan";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const { getUserAllData } = React.useContext(AppContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("user logout successfully",{
      autoClose:2000,
    })
  };

  React.useEffect(() => {
    getUserAllData();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ textAlign: "center" }}>
          <ProfileImage />
        </List>
        <Divider />
        <List>
          <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      Dashboard
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            to={"/userProfile"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      Profile
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />

          <Link
            to={"/manageLoanDrawer"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      Loan Status
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />

          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                    Logout
                  </Typography>
                }
                id="user-logout"
                onClick={logout}
              />
            </ListItemButton>
          </ListItem>

          <Divider />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <MainLoan />
      </Main>
    </Box>
  );
}
