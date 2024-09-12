import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { MyValueInterface } from "./SelectComponent";
import { CurrentAppointment } from "../services/model/current_appointment";
import Grid2 from "@mui/material/Grid2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

interface AppointmentModalProp extends MyValueInterface<boolean> {
  app: CurrentAppointment;
}

export default function MyAppointmentModelDetail({
  val: open,
  setVal: setOpen,
  app,
}: Readonly<AppointmentModalProp>) {
  const handleClose = () => setOpen(false);
    const color: "red" | "green" | "blue" | "teal" | "pink" | "orange"= "green";
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid2 container>
              <Grid2 size={6}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Date:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  color={color}
                >
                  {String(app.appointmentDt.date)}
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Day Of Week:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }} color={color}>
                  {app.appointmentDt.dayOfWeek}
                </Typography>
              </Grid2>
         
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-1" sx={{ mt: 2 }}>
                  Start Time:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-1" sx={{ mt: 2 }} color={color}>
                  {app.startTm}
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-2" sx={{ mt: 2 }}>
                  End Time:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-2" sx={{ mt: 2 }} color={color}>
                  {app.endTm}
                </Typography>
              </Grid2>

              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-4" sx={{ mt: 2 }}>
                  Location:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-4" sx={{ mt: 2 }} color={color}>
                  {app.location}
                </Typography>
              </Grid2>

              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-5" sx={{ mt: 2 }}>
                  Location ID:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-5" sx={{ mt: 2 }}>
                  {app.posId}
                </Typography>
              </Grid2>

              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-1" sx={{ mt: 2 }}>
                  Exam Code:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                {" "}
                <Typography id="transition-modal-description-1" sx={{ mt: 2 }}>
                  {app.dlExam.code} / {app.dlExam.description}
                </Typography>
              </Grid2>
            </Grid2>

            {/* <Typography id="transition-modal-description-3" sx={{ mt: 2 }}>
              {app.lemgMsgId}
            </Typography> */}

            {/* <Typography id="transition-modal-description-6" sx={{ mt: 2 }}>
              {app.resourceId}
            </Typography> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
