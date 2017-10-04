import {trigger, state, animate, style, transition,group, query} from '@angular/animations';

export function routerTransition() {
  return slideToLeft();
}



function slideToLeft() {
  return trigger('routerTransition', [
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'}))
    ]),
    transition('main=>achieve', [
      group([
         query('.content', [style({top: 0,position:'absolute'}),animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'}))]),
    
         query('.cnm', [style({transform: 'translateX(100%)'}),animate('0.3s ease-in-out', style({transform: 'translateX(0)'}))])
     
       ] )
       
    ]),
    transition('achieve=>main', [
      group([
         query('.cnm', [style({top: 0,position:'absolute'}),animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'}))]),
    
         query('.content', [style({transform: 'translateX(100%)'}),animate('0.3s ease-in-out', style({transform: 'translateX(0)'}))])
     
       ] )
    ])
  ])
}

