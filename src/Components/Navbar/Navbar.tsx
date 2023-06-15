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

const pages = ["All Posts", "My Posts"];
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);
export interface NavBarProps {
  userId?: string | null;
}
/**
 * The Main Navbar. Deals with all reRouting from MyPosts and AllPosts.
 * @date 6/8/2023 - 10:38:24 PM
 *
 * @param {NavBarProps} { userId }
 * @returns {*}
 */
function ResponsiveAppBar({ userId }: NavBarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    userSignout(navigate);
  }

  const location = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <HomeIcon />
          </Box>
          <Typography
            variant="h6"
            noWrap
            href="/homeScreen"
            component="a"
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
              href={userId ? `/UserScreen/${userId}` : ""}
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
