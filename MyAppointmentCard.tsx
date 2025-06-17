import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CurrentAppointment } from "../services/model/current_appointment";
import React from "react";
import Box from "@mui/material/Box";
import MyAppointmentModelDetail from "./MyAppointmentModelDetail";

export default function MyAppointmentCard({
  appointment: app,
  index,
  dividerNumber,
}: Readonly<{
  appointment: CurrentAppointment;
  index: number;
  dividerNumber: number;
}>) {
  const [open, setOpen] = React.useState(false);//determin wether open card modal

  const handleOpenModal = ()=>setOpen(prev=>!prev);
  return (
    <Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 16 }}>
            Day: {app.appointmentDt.dayOfWeek}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: index % dividerNumber < dividerNumber / 2 ? "red" : "black",
            }}
          >
            {String(app.appointmentDt.date)}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{
              color: index % dividerNumber < dividerNumber / 2 ? "red" : "black",
            }}
          >
            Start At: {app.startTm}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenModal}>Learn More</Button>
        </CardActions>
      </Card>
      <MyAppointmentModelDetail app={app} val={open} setVal={setOpen} />
    </Box>
  );
}
