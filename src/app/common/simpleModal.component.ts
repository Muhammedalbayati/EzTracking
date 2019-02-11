import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "simple-modal",
  template: `
  <div id="{{elementId}}" class="modal  fade" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
  <div class="modal-content" >
  <div class="modal-header">
  <h4 class="modal-title">{{title}}</h4>
    // <button type="button" class="close" data-dismiss="modal">
    //   <span>&times;</span>
    // </button>
    
  </div>
  <div class="modal.body">
    <ng-content></ng-content>
  </div>
</div>
</div>
</div>
   `,
  styles: [
    `
      modal-body {
        height: 250px;
        overflow-y: scroll;
      }
    `
  ]
})
export class SimpleModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  elementId: string;

  constructor() { }

  ngOnInit() { }
}
