import { Directive, Inject, OnInit, ElementRef, Input } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({ selector: "[modal-trigger]" })
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  //we use modalId as an alias for modal-trigger because the name has a dash "-",
  //if the name dosen't have "-" we could use like this @Input() modalTrigger:string;
  @Input("modal-trigger")
  modalId: string;

  constructor(private ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener("click", e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
