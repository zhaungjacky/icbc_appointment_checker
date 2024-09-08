import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CurrentAppointment } from "../services/model/current_appointment";

export default function MyAppointmentCard({
  appointment: app,
  index,
  dividerNumber,
}: Readonly<{
  appointment: CurrentAppointment;
  index: number;
  dividerNumber: number;
}>) {
  return (
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
