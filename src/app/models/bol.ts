export class Bol {
  bolId: Number;
  bolNumber: string;
  externalBol: Boolean;
  createdDate: Date;
  requesterId: String;
  recipient: String;
  expidate: boolean;
  space: Number;
  submittedDate: Date;
  submitted: Boolean;
  canceled: Boolean;
  canceledDate: Date;
  cargo: { cargoId: number; cargoType: string }
  deliveryLocation: { locationId: number; locationName: string };
  pickupLocation: { locationId: number; locationName: string };;
  vehicle: { vehicleId: number; vehicleType: string };
  driver:{driverId:number,firstName:string,lastName:string,PhoneNumber:string,shift:string};
  completed: boolean;
  items: object[];
  userComment: string;
  dispatcherComment: string;
  // isCrossDock: Boolean;
  crossDockAddress: string;
  // pickupLocationId: number;
  // deliveryLocationId: number;
  // vehicleId: number;
}
