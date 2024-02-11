import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private url: string = "http://localhost:8080/api/picture"

  private constructor(
    private http: HttpClient
  ) { }

  getPicture(){
    console.log("getting pic");
    return this.http.get(`${this.url}/view`, {responseType: 'blob'})
  }

  uploadPicture(file: File){
    let payload = new FormData();
    payload.append('file', file)
    console.log(payload);
    this.http.post(`${this.url}/upload`, payload)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(ev => console.log(ev))
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) 
      console.error("An error occurred: ", error.error)
    else if(error.status === 406)
      alert("Don't send toxic messages!")
    else
      console.error(`Error code ${error.status}, body: `, error.error);

    return throwError(() => new Error("Error occured"))
  }
}
