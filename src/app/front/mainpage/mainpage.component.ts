import { Component, OnInit, Output, EventEmitter} from '@angular/core';;
import { HttpModule, Http } from '@angular/http';
// import observable
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
// Animation
// import {routerTransition} from '../animate'
import { Router } from '@angular/router';
import { SidebarService } from '../../service/sidebar/sidebar.service';



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],

})
export class MainpageComponent implements OnInit {

  public blogs;
  public test;
  @Output () event = new EventEmitter();
  constructor(private http: Http,private router: Router,
  private sidebarservice:SidebarService) { 
    this.http.get("/api/blog").subscribe((data)=>{
      console.log(data.text());
      this.blogs =  data.text();
      // return true;
    }, (error)=>{
      // return false;
      console.log("error cnm");
    });
    // console.log(this.blogs);
    this.test = [1,2,3,4];
  }

  ngOnInit() {
    
  }
  open(e) {
    // this.state = (this.state === 'small' ? 'large' : 'small');
    // setTimeout(this.router.navigateByUrl('/blog'), 1000000);
    this.event.emit(e);
    console.log("eject event");
    let id = 123231;
    this.sidebarservice.success("successful");
    this.router.navigateByUrl('/blog/'+id);
    
   
  }

}
