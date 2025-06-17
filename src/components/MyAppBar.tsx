import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import MyInfoModal, { MyModalInterface } from "./MyInfoModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

interface MyAppBarInterface extends MyModalInterface {
  handleGetAppoints: () => void;
  isGetInfosBtnDisabled: boolean;
}

function MyAppBar({
  handleGetAppoints,
  isGetInfosBtnDisabled,
  handleToggleShowInfo,

  showInfo,
  myAppointment,
  minuteInterval,
  setMinuteInterval,
  addToToday,
  setAddToToday,
  drvrLastName,
  setDrvrLastName,
  licenceNumber,
  setLicenceNumber,
  keyword,
  setKeyword,
  handleGetToken,
  locations,
  setLocations,
  locationAndNames,
}: Readonly<MyAppBarInterface>) {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: "10px",
                gap: "32px",
              }}
            >
              <Tooltip title="Get Available Appointments">
                <Box>
                  <Button
                    onClick={handleGetAppoints}
                    sx={{color:"lightBlue"}}
                    disabled={isGetInfosBtnDisabled}
                  >
                    Get Infos
                  </Button>
                </Box>
              </Tooltip>

              <Tooltip title="Goto Offical ICBC Website">
                <Box>
                  <a
                    href="https://onlinebusiness.icbc.com/webdeas-ui/home"
                    target="blank"
                  >
                    <Button sx={{color:"lightBlue"}}>Go To Site</Button>
                  </a>
                </Box>
              </Tooltip>

              <Tooltip title="Show Or Hide User Info">
                <Box>
                  <Button onClick={() => handleToggleShowInfo()} sx={{color:"lightBlue"}}>
                    {showInfo ? "Hide My Info" : "Show My Info"}
                  </Button>
                </Box>
              </Tooltip>
            </Box>

            {/* info zone */}

            <MyInfoModal
              showInfo={showInfo}
              myAppointment={myAppointment}
              minuteInterval={minuteInterval}
              setMinuteInterval={setMinuteInterval}
              addToToday={addToToday}
              setAddToToday={setAddToToday}
              drvrLastName={drvrLastName}
              setDrvrLastName={setDrvrLastName}
              licenceNumber={licenceNumber}
              setLicenceNumber={setLicenceNumber}
              keyword={keyword}
              setKeyword={setKeyword}
              handleGetToken={handleGetToken}
              locations={locations}
              setLocations={setLocations}
              locationAndNames={locationAndNames}
              handleToggleShowInfo={handleToggleShowInfo}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                marginLeft: "140px",
                marginBottom: "10px",
                gap: "8px",
              }}
            >
              {locations?.map((location) => (
                <Typography key={location.aPosID}>
                  {location.locationName}
                </Typography>
              ))}{" "}
              <Typography>Selected</Typography>
            </Box>

            {/* button zone */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default MyAppBar;
