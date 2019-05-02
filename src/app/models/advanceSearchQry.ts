export class AdvanceSearchQry {

    bolId: Number;
    bolNumber: string;
    externalBol: Boolean;
    from_createdDate: Date;
    to_createdDate: Date;
    requesterId: String;
    recipient: String;
    expidate: boolean;
    space: Number;
    submittedDate: Date;
    submitted: Boolean;
    canceled: Boolean;
    canceledDate: Date;
    completed: boolean;
    // items: object[];
    
    userComment: string;
    dispatcherComment: string;
    // isCrossDock: Boolean;
    crossDockAddress: string;
    // deliveryLocation: { locationName: string; locationId: number };
    // pickupLocation: { locationName: string; locationId: number };;
    // vehicle: { vehicleId: number; vehicleType: string };
    pickupLocationId: number;
    deliveryLocationId: number;
    vehicleId: number;
    cargoId: number;
    driverId:number;

}