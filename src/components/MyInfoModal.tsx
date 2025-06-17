import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import { IcbcService, LocationProp } from "../services/icbcService";
import { Appointment } from "../services/model/appointment";
import CredentialPwdTextField from "./CredentialPwdTextField";
import CredentialTextField from "./CredentialTextField";
import LocationCheckbox from "./LocationCheckbox";
import SliderMinSelection from "./SliderMinSelection";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderradius:24,
  boxShadow: 24,
  p: 4,
  borderRadius:6,

};

export interface MyModalInterface{
     showInfo:boolean,
     handleToggleShowInfo: () => void,
  myAppointment: Appointment | undefined,
  minuteInterval: number,
  setMinuteInterval: React.Dispatch<React.SetStateAction<number>>,
  addToToday: number,
  setAddToToday: React.Dispatch<React.SetStateAction<number>>,
  drvrLastName: string,
  setDrvrLastName: React.Dispatch<React.SetStateAction<string>>,
  licenceNumber: string,
  setLicenceNumber: React.Dispatch<React.SetStateAction<string>>,
  keyword: string,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,

  handleGetToken: () => void,
  locations: LocationProp[],
  setLocations: React.Dispatch<React.SetStateAction<LocationProp[]>>,
  locationAndNames: LocationProp[]
}

export default function MyInfoModal({
    showInfo,handleToggleShowInfo,myAppointment,minuteInterval,setMinuteInterval,addToToday,setAddToToday,drvrLastName,setDrvrLastName,licenceNumber,setLicenceNumber,keyword,setKeyword,handleGetToken,locations,setLocations,locationAndNames,
}:Readonly<MyModalInterface>
   
) {

  return (
    <div>
      {/* <Button onClick={handleOpenMyInfoModal}>Open modal</Button> */}
      <Modal
        open={showInfo}
        onClose={handleToggleShowInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Box sx={{ marginBottom: "10px" }}>{myAppointment?.email}</Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Box sx={{ marginBottom: "10px",color:"white" }}>
              {String(myAppointment?.webAappointments[0].appointmentDt.date)}
            </Box>
            <Box sx={{ marginBottom: "10px",color:"white" }}>
              {myAppointment?.webAappointments[0].startTm}
            </Box>
            <Box sx={{ marginBottom: "10px" ,color:"white"}}>
              {myAppointment?.webAappointments[0].appointmentDt.dayOfWeek}
            </Box>
            <Box sx={{ marginBottom: "10px" ,color:"white"}}>
              {myAppointment?.webAappointments[0].posGeo.address}
            </Box>
            <Box><IconButton onClick={()=>handleToggleShowInfo()}><CloseIcon sx={{color:"grey"}} /></IconButton></Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Box sx={{ marginBottom: "10px" ,color:"white"}}>
              {myAppointment?.licenseNumber}
            </Box>
            {/* refresh min selection */}
            <Box sx={{color:"white"}}>
              <Typography>Refresh Interval unit: {minuteInterval} Min</Typography>
              {/* refresh interval minute */}
              <SliderMinSelection
                value={minuteInterval}
                setValue={setMinuteInterval}
                sliderMaxValue={IcbcService.maxInfoRefreshInterval}
                localStorageKey={IcbcService.refreshIntervalMin}
                sliderMinValue={1}
              />
            </Box>
            <Box sx={{color:"white"}}>
              <Typography>Exam Date From Today: {addToToday} Days</Typography>
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
          <Tooltip title="Get User Credential">
            <Button onClick={handleGetToken}>Sign In</Button>
          </Tooltip>
          <Box>
            <LocationCheckbox
              val={locations}
              setVal={setLocations}
              allLocations={locationAndNames}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
