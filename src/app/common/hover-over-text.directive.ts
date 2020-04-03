import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ezHoverOverText]'
})
export class HoverOverTextDirective {

  @Input() config: Config //= { querySelector: 'td' }

  constructor(private el: ElementRef, private renderer: Renderer) {
    // el.nativeElement.style.backgroundColor = "red"
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'red')

  }



  @HostListener('mouseover') onMouseHover() {
    let el = this.el.nativeElement.querySelector(this.config.querySelector)
    //console.log(el)
    if (el != null) {
      this.renderer.setElementStyle(el, 'backgroundColor', 'red')
    }

  }

  @HostListener('mouseout') onMouseOut() {
    let el = this.el.nativeElement.querySelector(this.config.querySelector)
    this.renderer.setElementStyle(el, 'backgroundColor', '#EEEEEE')
  }


}

class Config {
  querySelector: string
}