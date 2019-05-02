export class BolUpdate {
  bolId: Number;
  bolNumner: string;
  externalBol: Boolean;
  // createdDate: Date;
  requesterId: String;
  recipient: String;
  expidate: boolean;
  space: Number;
  submittedDate: Date;
  submitted: Boolean;
  canceled: Boolean;
  canceledDate: Date;
  completed: Boolean;
  // items: object[];
  userComment: string;
  dispatcherComment: string;
  // isCrossDock:Boolean;
  crossDockAddress: string;
  // deliveryLocation: { locationName: string; locationId: number };
  // pickupLocation: { locationName: string; locationId: number };;
  // vehicle: { vehicleId: number; vehicleType: string };
  pickupLocationId: number;
  deliveryLocationId: number;
  vehicleId: number;
  driverId: number;
}
