import {throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEmployee} from './employee';
 //import 'rxjs/add/operator/catch';

 /*
 rxjs 6

  rxjs: creation methods, types, schedules and utilites
  import {Observable ,Subject, asapSchedule, pipe, of , from, interval, merge,fromEvent} from
  'rxjs';

  rxjs/operators: All pipeable operators:
  import {map, filter, scan} from 'rxjx/operators';

  -----------operators rename:

   catch() => catchError()
   do() => tap()
   finally() => finalize()
   switch() => switchAll()

   throw() => throwError()
   fromPromise() => from() (this automatically detects the type)

   --Chaining operators has been replaced by piping the result of one operator
   to another.



   --------------Angular 8----------------

   1.Differtial loading
   Automaticallly make you angular apps more performant
   Build an application for production - two bundles are created
   --Modern browers that support ES6
   --Older browsers that only support ES5
   
    The bundle size reduces by 7-20% depending on the amount of modern javascript features

   ng build --prod

   2.Dynamic imports for lazy routes

   Load the code for the routes only when the user navigates to those
   routes for the first time
   {path:'/user', loadChildren: '.user/user.module#UserModule'}
   {path:'/user', loadChildren:() =>
     import(`./user/user.module`).then(m => m.UserModule)}

  3.Ivy
   Rendering engine
   Translating the templates and components into regular HTML and javascript that the broweers can
   understand
   Not yet stable -can opt-in

   ng new demo --enable-ivy
   Genarate considerably smaller bundles make increamental comilation easier
   and is also going to be basic for future invoations

  4.Bazel
  Build tool
  Experimental in version 8

  Breaking changes
  1.Typescript version 3.4
  Node version 12 or later
  Legacy HttpModule and Http service is depricated .Use HttpClientModule and HttpClient service instead

  ViewChild and ContentChild
  @ViewChild('foo') foo:ElementRef;
  @ViewChild('foo', {static:false}) foo:ElementRef;
  
 */

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   private _url: string = "/assets/data/employees.json";

  constructor(private http: HttpClient) { }

  getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url).pipe(
      catchError(this.errorHandler));
     // return [
    //   {"id":1 , "name": "Andrew", "age": 30},
    //   {"id":2 , "name": "Brandon", "age": 25},
    //   {"id":3 , "name": "John", "age": 28}
    // ];
  }

  errorHandler(error: HttpErrorResponse ){
   return observableThrowError(error.message || 'Service Error');
  }

}
