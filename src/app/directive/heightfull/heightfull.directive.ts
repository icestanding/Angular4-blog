import { Directive, Injectable,ElementRef, Input, Renderer2 } from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser'
@Directive({
  selector: '[heightmax]'
})

@Injectable ()
export class HeightfullDirective {
 
  @Input('heightmax') offset: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {
        let windowsize = window.innerHeight;
    let maxheight  = windowsize - parseInt(this.offset);
    if(this.el.nativeElement.offsetHeight < maxheight ) {
       this.renderer.setStyle(this.el.nativeElement, "height", maxheight + "px");
      
    }
  }


  ngOnInit() {
    let windowsize = window.innerHeight;
    let maxheight  = windowsize - parseInt(this.offset) + 2;
    if(this.el.nativeElement.offsetHeight < maxheight ) {
       this.renderer.setStyle(this.el.nativeElement, "height", maxheight + "px");
      
    }
  }

}
