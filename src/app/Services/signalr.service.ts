import { Injectable } from '@angular/core';

import { 
  SignalR, 
  SignalRConnection, 
  IConnectionOptions,
   BroadcastEventListener } from 'ng2-signalr';
import { Bol } from '../models/bol';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  // //1. create connection
  // connection: any  //= this._signalR.createConnection();
  // // 2.create a listener object
  // bolListener: any
  // // typingListener = new BroadcastEventListener<boolean>('Typing');

  // constructor(private _signalR: SignalR, ) {
  //   this.connection = this._signalR.createConnection();
  //   // this.bolListener == new BroadcastEventListener<Bol>('NewBol');
  //   this.connection.start(()=>{
  //     //console.log('signalr connected')
  //   });

  //   // this.signalrBol()

  // }

  

  // signalrBol() {
  //   var _bol: Bol
  //   // // subscribe for incoming messages
  //   this.bolListener.subscribe((b: Bol) => {
  //     _bol = b
  //     //console.log('bol from the signalr', b)
  //   });
  //   return _bol
  //   // // listen for connection errors
  //   // this.connection.errors.subscribe((error: any) => {
  //   //   this.signalrErrMsgs.push(error);
  //   // });
  // }


}
