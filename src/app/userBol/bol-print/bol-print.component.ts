import { Component, OnInit, Input } from '@angular/core';
import { Bol } from 'src/app/models/bol';
import { Router, ActivatedRoute } from '@angular/router';
import { BolService } from 'src/app/Services';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'ez-bol-print',
  templateUrl: './bol-print.component.html',
  styleUrls: ['./bol-print.component.css']
})
export class BolPrintComponent implements OnInit {
  bol: any = {}
  errorMsg: ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      if (params.get("bolId") != null) {
        this.getBolToPrint(params.get("bolId"));
        // this.getBolItems(params.get("bolId"));
      }
    });

  }

  getBolToPrint(bolId) {
    this.spinner.show();
    this.bolService.getBolToPrint(bolId).subscribe(
      data => {
        this.spinner.hide();
        this.fillBolObject(data)
      },
      err => {
        // //console.log(err);
        this.errorMsg = err
        this.spinner.hide();
      }
    );
  }

  fillBolObject(bol) {
    //console.log(bol)
    this.bol = {
      assginToDriverDate: bol.assginToDriverDate,
      assginedToDriver: bol.assginToDriver,
      driverFirstName: (bol.driver ? bol.driver.firstName : 'No driver assign yet'),
      driverLastName: (bol.driver ? bol.driver.lastName : ''),
      driverPhoneNumber: (bol.driver ? bol.driver.phoneNumber : ''),
      bolId: bol.bolId,
      bolNumber: bol.bolNumber,
      items: bol.bolItems,
      canceled: bol.canceled,
      canceledDate: bol.canceledDate,
      userComment: bol.userComment,
      dispatcherComment: bol.dispatcherComment,
      completed: bol.completed,
      createdDate: bol.createdDate,
      delivered: bol.delivered,
      deliveredDate: bol.deliveredDate,
      deliveryLocationName: bol.deliveryLocation.locationName,
      deliveryLocationBuilding: bol.deliveryLocation.building,
      deliveryLocationAddress: bol.deliveryLocation.address,
      deliveryLocationCity: bol.deliveryLocation.city,
      deliveryLocationState: bol.deliveryLocation.state,
      deliveryLocationZip: bol.deliveryLocation.zip,
      deliveryLocationPhone: bol.deliveryLocation.phone,
      dispatcherId: bol.dispatcherId,
      driverId: bol.driverId,
      expidate: bol.expidate,
      picked: bol.picked,
      pickedDate: bol.pickedDate,
      pickupLocationName: bol.pickupLocation.locationName,
      pickupLocationBuilding: bol.pickupLocation.building,
      pickupLocationAddress: bol.pickupLocation.address,
      pickupLocationCity: bol.pickupLocation.city,
      pickupLocationZip: bol.pickupLocation.zip,
      pickupLocationPhone: bol.pickupLocation.phone,
      received: bol.received,
      receivedBy: bol.receivedBy,
      recipient: bol.recipient,
      requesterId: bol.requesterId,
      space: bol.space,
      submitted: bol.submitted,
      submittedDate: bol.submittedDate,
      crossDockAddress: bol.crossDockAddress
    }
    //console.log(this.bol)
    // bolId: bol.bolId,
    // requesterId: bol.requesterId,
    // recipient: bol.recipient,
    // expidate: bol.expidate,
    // submitted: bol.submitted,
    // submittedDate: bol.submittedDate,
    // canceled: bol.canceled,
    // canceledDate: bol.canceledDate,
    // completed: bol.completed,
    // space: bol.space,
    // comment: bol.comment,
    // deliveryLocation: bol.deliveryLocation.locationId,
    // pickupLocation: bol.pickupLocation.locationId,
    // vehicle: bol.vehicle.vehicleId
    this.crossDockAddressFormater();
  };

  crossDockAddressFormater() {
    if (this.bol.crossDockAddress == null || this.bol.crossDockAddress == '') return
    var ad = this.bol.crossDockAddress.split(",")
    // //console.log(ad)
    return ad
  }

  print(): void {
    // //console.log(this.bol.getRawValue())
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=1,left=1,height=100%,width=auto');//'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">'
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <title>BOL</title>
          <style type="text/css" >
          @media print {
              @page { size: auto; margin-top: 30px;margin-bottom:30px margin-left: 30px; margin-right: 30px; } //@page { size: landscape; margin: 50px; }
              //  -webkit-print-color-adjust: exact !important;
    
          }
          </style>
        </head>
    <body onload="window.print(); window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }




  //   printComponent(cmpName) {
  //     let printContents = document.getElementById(cmpName).innerHTML;
  //     let originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents;

  //     window.print();

  //     document.body.innerHTML = originalContents;
  // }

  // print() {
  //   var mywindow = window.open('', 'PRINT');
  //   // mywindow.document.write('<title>' + 'Ez-Tracking' + '</title>')
  //   // mywindow.document.write('<html><head><title>' + 'Ez-Tracking' + '</title>');
  //   // mywindow.document.write('</head><body >');
  //   // // mywindow.document.write('<h1>' + document.title  + '</h1>');
  //   // mywindow.document.write(document.getElementById(someId).innerHTML);
  //   // mywindow.document.write('</body></html>');
  //   mywindow.document.write(`
  //   <html>
  //     <head>
  //       <title>Print tab</title>
  //       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">'

  //       <style>
  //       //........Customized style.......
  //       @media screen {
  //         .printsection {
  //             -webkit-print-color-adjust: exact !important;
  //             left:70px;
  //             display:block;
  //             visibility: hidden !important;
  //         }
  //       }
  //       </style>

  //     </head>

  // <body style='left:120px;' onload="window.print();window.close()">${document.getElementById('print-section').innerHTML}</body>

  //   </html>`);
  //   // mywindow.document.close(); // necessary for IE >= 10
  //   // mywindow.focus(); // necessary for IE >= 10*/
  //   // mywindow.print();
  //   // mywindow.close();
  // }






}
