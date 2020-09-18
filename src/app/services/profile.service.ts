import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from './profile.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
private url = environment.api_url;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http: HttpClient) { }


  getProfiles(): Observable<Profile> {
    return this.http.get<Profile>(this.url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
