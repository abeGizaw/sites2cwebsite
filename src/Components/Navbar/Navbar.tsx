import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createSvgIcon } from "@mui/material/utils";
import { userSignout } from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";

const pages = ["All Posts", "My Posts"];
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);

function ResponsiveAppBar() {
  const navigate = useNavigate();

  function handleLogout() {
    userSignout(navigate);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* //Logo Beside Words */}
          <Box>
            <HomeIcon />
          </Box>

          {/* //Sites2C Text */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/homeScreen"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "white",
              fontFamily: "roboto",
              fontWeight: 600,
              letterSpacing: ".2rem",
              textDecoration: "none",
              paddingLeft: 2,
            }}
          >
            Sites2C
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                href="/homeScreen"
                key={page}
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
                {page}
              </Button>
            ))}
          </Box>

          {/* //LOGOUT BUTTON */}
          <button
            style={{
              color: "white",
              fontFamily: "Roboto",
              fontWeight: 450,
              letterSpacing: ".1em",
              fontSize: 14,
              borderColor: "white",
            }}
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
