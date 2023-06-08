import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createSvgIcon } from "@mui/material/utils";
import { userSignout } from "../../utilities/utilities";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { User } from "firebase/auth";

const pages = ["All Posts", "My Posts"];
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);
export interface NavBarProps {
  user?: User | null;
}
function ResponsiveAppBar({ user }: NavBarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    userSignout(navigate);
  }

  console.log(user);

  const location = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* //Logo Beside Words */}
          <Box>
            <HomeIcon />
          </Box>

          {/* //Sites2C*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href={location.pathname === "/homeScreen" ? "" : "/homeScreen"}
            id="titleText"
          >
            Sites2C
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              href={location.pathname === "/homeScreen" ? "" : "/homeScreen"}
              key={pages[0]}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                gap: 2,
              }}
            >
              {pages[0]}
            </Button>

            <Button
              href={user ? `/UserScreen/${user!.uid}` : ""}
              key={pages[1]}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                gap: 2,
              }}
            >
              {pages[1]}
            </Button>
          </Box>

          {/* //LOGOUT BUTTON */}
          <button
            id="logoutButton"
            type="button"
            className="btn PRIMARY"
            onClick={handleLogout}
          >
            {" "}
            Logout
          </button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
