import { Injectable } from '@angular/core';
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


@Injectable()
export class LoginServiceService {

  constructor(private http: Http) { 
    
  }
  login(id:string, password:string) {
  return this.http.get('/a')
             .subscribe();
  }
}