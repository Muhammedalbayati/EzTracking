export class SearchResult {
  bolId: string;
  bolNumber: string;
  externalBol: Boolean;
  requesterId: string;
  recipient: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  vehicleType:string;
  createdDate: Date;
  submittedDate: Date;
  pickedDate: Date;
  deliveredDate: Date;
  receivedBy: string;
  userComment: string;
  dispatcherComment: string;
  partInfo: string;
  completed: Boolean;
}
