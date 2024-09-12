import { Appointment } from "./model/appointment";
import { CurrentAppointment } from "./model/current_appointment";

export interface TokenPayloadType {
  drvrLastName: string,
  licenceNumber: string,
  keyword: string,
}


export class IcbcService {

  setToken: (value: any) => void;
  setMyAppointment: (value: React.SetStateAction<Appointment | undefined>) => void; setCurrentApps: (value: React.SetStateAction<CurrentAppointment[]>) => void;


  constructor(setToken: (value: any) => void, setMyAppointment: (value: React.SetStateAction<Appointment | undefined>) => void, setCurrentApps: (value: React.SetStateAction<CurrentAppointment[]>) => void,) {
    this.setToken = setToken;
    this.setMyAppointment = setMyAppointment;
    this.setCurrentApps = setCurrentApps;

  }

  static readonly refreshIntervalMin: string = "refreshIntervalMin";

  static readonly addToTodayKey: string = "addToTodayKey";
  static readonly drvrLastName: string = "drvrLastName";
  static readonly licenceNumber: string = "licenceNumber";
  static readonly keyword: string = "keyword";
  static readonly dividerNumber: number = 8; // show how many records of the appointment
  static readonly dateAddToToday: number = 0 // show Date add to today e.g today 2024-1-1, if dateAddToday = 10,start from 2024-1-11
  static readonly showInfos: boolean = true; //init wether show infos zone
  static readonly token: string = "token";
  static readonly selectedLocations: string = 'selectedLocations';
  static readonly maxInfoRefreshInterval: number = 60;
  static readonly maxDayAddToToday: number = 60;


  static readonly loginUrl: string =
    "https://onlinebusiness.icbc.com/deas-api/v1/webLogin/webLogin";

  static readonly appointmentUrl: string =
    "https://onlinebusiness.icbc.com/deas-api/v1/web/getAvailableAppointments";

  async getToken(payload: TokenPayloadType) {
    fetch(IcbcService.loginUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        const myToken = res.headers.get("Authorization");
        if (myToken) {
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(myToken));
          this.setToken(myToken);
        }
        return res.json();
      })
      .then((data: Appointment) => {
        this.setMyAppointment(data);
      })
      .catch((err) => console.log(err));
  };

  getAppointment(obj: AppointmentPayloadTypes, token: string, dividerNumber: number,) {
    fetch(IcbcService.appointmentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data: CurrentAppointment[]) => {
        let newData = data.slice(0, dividerNumber);
        for (let app of newData) {
          app.location = getLocationName(obj["aPosID"]);
        }

        this.setCurrentApps((prev) => [...prev, ...newData]);
      })
      .catch((err) => console.log(err));
  }

}

export interface AppointmentPayloadTypes {
  aPosID: number;
  examType: string;
  examDate: string;
  ignoreReserveTime: string;
  prfDaysOfWeek: string;
  prfPartsOfDay: string;
  lastName: string;
  licenseNumber: string;
}

export const getLocationName = (aPosID: number): string => {


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
  switch (aPosID) {
    case 9:
      return "Vancouver (Point Grey)";
    case 269:
      return "Surrey claim centre";
    case 281:
      return "Guildford Boardwalk road";
    case 11:
      return "Surrey Driving License";
    case 271:
      return "Newton claim centre";
    case 275:
      return "Vancouver (Kingsway)";
    case 2:
      return "Burnaby 3880";
    case 73:
      return "Port Coquitlam";
    case 274:
      return "Burnaby 4399";
    case 273:
      return "Richmond 7200";
    case 93:
      return "Richmond 5300";

    default:
      return "AnyWhere";
  }
};

export const appointmentPayload = (location: number, token: TokenPayloadType,addToToday: number): AppointmentPayloadTypes => {
 
  return {
    aPosID: location,
    examType: "5-R-1",
    examDate:getDateString(addToToday),
    ignoreReserveTime: "false",
    prfDaysOfWeek: "[0,1,2,3,4,5,6]",
    prfPartsOfDay: "[0,1]",
    lastName: token.drvrLastName,
    licenseNumber: token.licenceNumber,
  };
};

export interface LocationProp {
  aPosID: number
  locationName: string
}

function getDateString(daysToAdd: number = 0): string {
  const currentDate = new Date() ;
  currentDate.setDate(currentDate.getDate() + daysToAdd);

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add   
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  
  // console.log(formattedDate); // Output: 2024-09-10
  return formattedDate;
}





