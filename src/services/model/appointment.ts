export interface Appointment {
    drvrId:               number;
    email:                string;
    firstName:            string;
    lastName:             string;
    licenseNumber:        string;
    optInFlags:           OptInFlags;
    phoneNum:             string;
    actFinePaid:          string;
    blockedEligibleExams: any[];
    cancellationFeeTotal: number;
    eligibleExams:        EligibleExam[];
    expandedStatus:       ExpandedStatus[];
    maxofMaxBookingDays:  number;
    webAappointments:     WebAappointment[];
    webMaxSlots:          number;
}

export interface EligibleExam {
    code:        string;
    description: string;
    eed:         Eed;
}

export interface Eed {
    date:      Date;
    dayOfWeek: string;
}

export interface ExpandedStatus {
    description: string;
    master:      string;
    masterDesc:  string;
    section:     string;
    status:      string;
    xscdMsg?:    XscdMsg;
}

export interface XscdMsg {
    bookCtlCd: string;
}

export interface OptInFlags {
    email: string;
    sms:   string;
}

export interface WebAappointment {
    appointmentDt:   Eed;
    endTm:           string;
    lemgMsgId:       number;
    posId:           number;
    resourceId:      number;
    startTm:         string;
    bookedIndicator: string;
    bookedTs:        Date;
    drscDrvSchl:     DrscDrvSchl;
    drvrDriver:      DrvrDriver;
    officeNum:       number;
    posName:         string;
    statusCode:      string;
    checkTm:         string;
    dlExam:          DLExam;
    posGeo:          PosGeo;
}

export interface DLExam {
    code:        string;
    description: string;
}

export interface DrscDrvSchl {
}

export interface DrvrDriver {
    drvrId:        number;
    email:         string;
    firstName:     string;
    lastName:      string;
    licenseNumber: string;
    optInFlags:    OptInFlags;
    phoneNum:      string;
}

export interface PosGeo {
    address:  string;
    address1: string;
    agency:   string;
    city:     string;
    lat:      number;
    lng:      number;
    posId:    number;
    postcode: string;
    province: string;
    url:      string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAppointment(json: string): Appointment {
        return JSON.parse(json);
    }

    public static appointmentToJson(value: Appointment): string {
        return JSON.stringify(value);
    }
}