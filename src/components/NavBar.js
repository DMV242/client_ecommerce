import React, { useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Menu,
  Typography,
  MenuItem,
  IconButton,
  Button,
  InputBase,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileUser, selectUserConnected } from "../redux/slice/UserConnected";

const pages = [""];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "100px",
  backgroundColor: "#F5F5F5",
  "&:hover": {
    backgroundColor: "#e5e5e5",
  },
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showLoginButton, setShowLoginButton] = React.useState(true);
  const user = useSelector(selectUserConnected);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickForLogin = () => {
    navigate("/login");
  };
  const handleClickForProfile = () => {
    if (user) {
      navigate("/profile");
    } else {
      console.log("No user found. Please log in.");
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(profileUser(token));
    }
  }, [dispatch, token, user]);
  useEffect(() => {
    setShowLoginButton(!user);
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F5F5F5",
          height: "36px",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          color: "#111111",
        }}
      >
        <Button sx={{ color: "#111111" }}>
          <Typography
            sx={{
              display: "flex",
              fontFamily:
                "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "18px",
              textTransform: "none",
            }}
          >
            Aide
          </Typography>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        {showLoginButton ? (
          <Button sx={{ color: "#111111" }} onClick={handleClickForLogin}>
            <Typography
              sx={{
                display: "flex",
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "18px",
                textTransform: "none",
                mr: 2,
                ml: 1,
              }}
            >
              S'identifier
            </Typography>
          </Button>
        ) : (
          <Button sx={{ color: "#111111" }} onClick={handleClickForProfile}>
            <Typography
              sx={{
                display: "flex",
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "18px",
                textTransform: "none",
                mr: 2,
                ml: 1,
              }}
            >
              Profile
            </Typography>
          </Button>
        )}
      </Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#111111",
          height: "60px",
          boxShadow: "none",
          width: "100%",
          display: "flex",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily:
                    "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "black",
                  lineHeight: "24px",
                  textTransform: "none",
                  textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Ollosa
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "#111111",
              }}
            >
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  color: "#111111",
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ color: "#111111" }} textAlign="center">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              sx={{
                mr: "12%",
                display: { xs: "flex", md: "none" },
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                color: "#111111",
                lineHeight: "24px",
                textTransform: "none",
              }}
            >
              Ollosa
            </Typography>
            <Box sx={{ marginLeft: "5rem" }}>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        fontFamily:
                          "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111111",
                        lineHeight: "24px",
                        textTransform: "none",
                      }}
                    >
                      {page}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button sx={{ color: "#111111" }} onClick={handleOpen}>
                <SearchIcon />
              </Button>
              <Button sx={{ color: "#111111" }}>
                <FavoriteBorderIcon />
              </Button>
              <Button sx={{ color: "#111111" }}>
                <WorkOutlineIcon />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Rechercher"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavBar;
