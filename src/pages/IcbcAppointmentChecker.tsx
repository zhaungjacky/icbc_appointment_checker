/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import { CurrentAppointment } from "../services/model/current_appointment";
import {
  IcbcService,
  LocationProp,
  TokenPayloadType,
  appointmentPayload,
} from "../services/icbcService";
import SliderMinSelection from "../components/SliderMinSelection";
import CredentialTextField from "../components/CredentialTextField";
import CredentialPwdTextField from "../components/CredentialPwdTextField";
import LocationCheckbox from "../components/LocationCheckbox";
import MyAppointmentCard from "../components/MyAppointmentCard";
import { Appointment } from "../services/model/appointment";

const locationAndNames: LocationProp[] = [
  { aPosID: 73, locationName: "Port Coquitlam" },
  { aPosID: 274, locationName: "Burnary 4399" },
  { aPosID: 2, locationName: "Burnary 3880" },
  { aPosID: 273, locationName: "Richmond 7200" },
  { aPosID: 93, locationName: "Richmond 5300" },
  { aPosID: 9, locationName: "Point Grey" },
  { aPosID: 275, locationName: "Kingsway" },
  { aPosID: 11, locationName: "Surrey Driving" },
  { aPosID: 271, locationName: "Newton claim" },
  { aPosID: 269, locationName: "Surrey claim" },
  { aPosID: 281, locationName: "Guildford Boardwalk" },
];
/*
          posID: "73"  // Port Coquitlam 
          posID: "274"  // Burnary 4399
          posID: "2"  // Burnary 3880 Lougheed Hwy
          posID: "273"  // Richmond 7200
          posID: "93"  // Richmond 5300
          posID: "9"  // Vancouver (Point Grey)
          posID: "275"  // Vancouver (Kingsway)
          posID: "11"  // Surrey Driving License
          posID: "271"  // Newton claim centre 
          posID: "269"  // Surrey claim centre
          posID: "281"  // Guildford Boardwalk road


      */

export default function IcbcAppointmentChecker() {
  const [locations, setLocations] = React.useState<LocationProp[]>(() =>
    localStorage.getItem(IcbcService.selectedLocations) === null
      ? []
      : JSON.parse(localStorage.getItem(IcbcService.selectedLocations)!)
  );

  const [minuteInterval, setMinuteInterval] = React.useState(() =>
    localStorage.getItem(IcbcService.refreshIntervalMin) === null
      ? 2
      : parseInt(localStorage.getItem(IcbcService.refreshIntervalMin)!)
  );

  const [drvrLastName, setDrvrLastName] = React.useState(() =>
    localStorage.getItem(IcbcService.drvrLastName) === null
      ? ""
      : String(localStorage.getItem(IcbcService.drvrLastName)!)
  );
  const [licenceNumber, setLicenceNumber] = React.useState(() =>
    localStorage.getItem(IcbcService.licenceNumber) === null
      ? ""
      : String(localStorage.getItem(IcbcService.licenceNumber)!)
  );
  const [keyword, setKeyword] = React.useState(() =>
    localStorage.getItem(IcbcService.keyword) === null
      ? ""
      : String(localStorage.getItem(IcbcService.keyword)!)
  );

  const dividerNumber = React.useMemo(() => IcbcService.dividerNumber, []);

  const [token, setToken] = React.useState(() =>
    localStorage.getItem("token") == null
      ? ""
      : JSON.parse(localStorage.getItem("token")!)
  );

  const [myAppointment, setMyAppointment] = React.useState<Appointment>();

  const [currentApps, setCurrentApps] = React.useState<CurrentAppointment[]>(
    [] as CurrentAppointment[]
  );

  const [addToToday, setAddToToday] = React.useState(() =>
    localStorage.getItem(IcbcService.addToTodayKey) === null
      ? IcbcService.dateAddToToday
      : parseInt(JSON.parse(localStorage.getItem(IcbcService.addToTodayKey)!))
  );

  const [showInfo, setShowInfo] = React.useState(() => IcbcService.showInfos);

  const icbcService = React.useMemo(
    () => new IcbcService(setToken, setMyAppointment, setCurrentApps),
    []
  );

  const [open, setOpen] = React.useState(false);//determin wether open card modal

  const tokenPayload: TokenPayloadType = {
    drvrLastName: drvrLastName,
    licenceNumber: licenceNumber,
    keyword: keyword,
  };

  React.useEffect(() => {
    handleGetToken();
  }, []);

  React.useEffect(() => {
    if (drvrLastName === "" || licenceNumber === "" || keyword === "") {
      return;
    }
    getAppointments();
    // icbcService.getAppointment(url,pa)
  }, []);

  // set interval time to get infos
  React.useEffect(() => {
    if (drvrLastName === "" || licenceNumber === "" || keyword === "") {
      return;
    }
    const timer = setInterval(async () => {
      if (token.length > 0) {
        handleGetToken();
        getAppointments();
      }
    }, 60 * 1000 * minuteInterval);

    return () => clearInterval(timer);
  }, [token.length]);

  const getAppointments = React.useCallback(() => {
    if (drvrLastName === "" || licenceNumber === "" || keyword === "") {
      return;
    }
    setCurrentApps([]);

    for (let location of locations) {
      icbcService.getAppointment(
        appointmentPayload(location.aPosID, tokenPayload, addToToday),
        token,
        dividerNumber
      );
    }
  }, [locations, token]);

  const handleToggleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleGetToken = () => {
    if (drvrLastName === "" || licenceNumber === "" || keyword === "") {
      localStorage.removeItem(IcbcService.token);
      return;
    }
    icbcService.getToken(tokenPayload);
  };

  const handleGetAppoints = () => {
    getAppointments();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "12px",
          padding: "32px",
        }}
      >
        {/* info zone */}
        {showInfo ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
            }}
          >
            {/* <Box sx={{ marginBottom: "10px" }}>{myAppointment?.email}</Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <Box sx={{ marginBottom: "10px" }}>
                {String(myAppointment?.webAappointments[0].appointmentDt.date)}
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                {myAppointment?.webAappointments[0].startTm}
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                {myAppointment?.webAappointments[0].appointmentDt.dayOfWeek}
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                {myAppointment?.webAappointments[0].posGeo.address}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <Box sx={{ marginBottom: "10px" }}>
                {myAppointment?.licenseNumber}
              </Box>
              {/* refresh min selection */}
              <Box>
                <Typography>Refresh Interval unit:Min</Typography>
                {/* refresh interval minute */}
                <SliderMinSelection
                  value={minuteInterval}
                  setValue={setMinuteInterval}
                  sliderMaxValue={IcbcService.maxInfoRefreshInterval}
                  localStorageKey={IcbcService.refreshIntervalMin}
                  sliderMinValue={1}
                />
              </Box>
              <Box>
                <Typography>Exam Date From Today</Typography>
                {/* set duration from Today */}

                <SliderMinSelection
                  value={addToToday}
                  setValue={setAddToToday}
                  sliderMaxValue={IcbcService.maxDayAddToToday}
                  localStorageKey={IcbcService.addToTodayKey}
                  sliderMinValue={0}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <Box>
                <CredentialTextField
                  val={drvrLastName}
                  setVal={setDrvrLastName}
                  title={IcbcService.drvrLastName}
                />
              </Box>
              <Box>
                <CredentialTextField
                  val={licenceNumber}
                  setVal={setLicenceNumber}
                  title={IcbcService.licenceNumber}
                />
              </Box>
              <Box>
                <CredentialPwdTextField
                  val={keyword}
                  setVal={setKeyword}
                  title={IcbcService.keyword}
                />
              </Box>
              {/* <Box><CredentialTextField val={keyword} setVal={setKeyword} title={IcbcService.keyword} textType="password"/></Box> */}
            </Box>

            <Button onClick={handleGetToken}>Sign In</Button>
            <Box>
              <LocationCheckbox
                val={locations}
                setVal={setLocations}
                allLocations={locationAndNames}
              />
            </Box>
          </Box>
        ) : null}
        {/* button zone */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "10px",
            gap: "32px",
          }}
        >
          <Box>
            <Button onClick={handleGetAppoints} color="success">
              Get Infos
            </Button>
          </Box>

          <Box>
            <a
              href="https://onlinebusiness.icbc.com/webdeas-ui/home"
              target="blank"
            >
              <Button color="primary">Go To Site</Button>
            </a>
          </Box>
          <Box>
            <Button onClick={() => handleToggleShowInfo()} color="info">
              {showInfo ? "Hide My Info" : "Show My Info"}
            </Button>
          </Box>
        </Box>

        {/* location infomation zone */}
        {/* <Box sx={{ marginBottom: "10px" }}>
          <SelectLocation location={location} setLocation={setLocation} />
        </Box> */}
        {/* <Typography sx={{ color: "red" }}>Location: {locationName}</Typography> */}

        {/* infomation zone */}

        {currentApps.length > 0 ? (
          <Grid2 container spacing={1}>
            {currentApps.map((app, index) => {
              return (
                <Grid2
                  size={12 / (dividerNumber / 2)}
                  key={
                    Math.round(Math.random() * 10000) + app.posId + app.startTm
                  }
                >
                  <Box>
                    {/* <Divider>{locationName(index + 1)}</Divider> */}

                    {index % dividerNumber === 0 ? (
                      <Box sx={{ marginBottom: "10px" }}>
                        <Divider
                          sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "teal",
                          }}
                        >
                          {app.location}
                        </Divider>
                      </Box>
                    ) : (
                      <Divider sx={{ marginBottom: "10px" }}>{"-"}</Divider>
                    )}
                    <MyAppointmentCard
                      appointment={app}
                      index={index}
                      dividerNumber={dividerNumber}
                    />
                    {/* <Box>
                      <Typography
                        sx={{
                          color:
                            index % dividerNumber < dividerNumber / 2
                              ? "red"
                              : "black",
                          fontSize: "16px",
                        }}
                      >
                        {" "}
                        Date: {String(app.appointmentDt.date)}
                      </Typography>
                    </Box>
                    <Box>Day: {app.appointmentDt.dayOfWeek}</Box> */}
                    {/* <Box >
                  <Typography
             
                  >
                    Location: {app.location}
                  </Typography>
                </Box> */}
                    {/* <Box sx={{ marginBottom: "10px" }}>
                      <Typography
                        sx={{
                          color:
                            index % dividerNumber < dividerNumber / 2
                              ? "red"
                              : "black",
                          fontSize: "16px",
                        }}
                      >
                        Start At: {app.startTm}
                      </Typography>
                    </Box> */}
                  </Box>
                </Grid2>
              );
            })}
          </Grid2>
        ) : null}
      </Box>
    </div>
  );
}
