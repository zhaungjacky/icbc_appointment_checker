// To parse this data:
//
//   import { Convert, CurrentAppointment } from "./file";
//
//   const currentAppointment = Convert.toCurrentAppointment(json);

export interface CurrentAppointment {
    appointmentDt: AppointmentDt;
    dlExam:        DLExam;
    endTm:         string;
    lemgMsgId:     number;
    posId:         number;
    resourceId:    number;
    signature:     string;
    startTm:       string;
    location?: string;
}

export interface AppointmentDt {
    date:      Date;
    dayOfWeek: string;
}

export interface DLExam {
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCurrentAppointment(json: string): CurrentAppointment {
        return JSON.parse(json);
    }

    public static currentAppointmentToJson(value: CurrentAppointment): string {
        return JSON.stringify(value);
    }
}
