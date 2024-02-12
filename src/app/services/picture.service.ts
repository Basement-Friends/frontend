import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, catchError, first, map, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private url: string = "http://localhost:8080/api/picture"

  img = new BehaviorSubject<Blob>(new Blob())

  private constructor(
    private http: HttpClient
  ) { }

  getPicture(){
    return this.http.get(`${this.url}/view`, {responseType: 'blob'}).pipe(map(res => {
      this.img.next(res);
      return res
      }))
  }

  getUserPicture(username: string){
    return this.http.get(`${this.url}/${username}`, {responseType: 'blob'})
  }

  updatePicture(){
    this.http.get(`${this.url}/view`, {responseType: 'blob'}).pipe(
      first()
      ).subscribe(res => this.img.next(res))
  }

  uploadPicture(file: File){
    let payload = new FormData();
    payload.append('file', file)
    this.http.post(`${this.url}/upload`, payload)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe(() => this.getPicture())
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) 
      console.error("An error occurred: ", error.error)
    if(error.status === 404)
        this.updatePicture()
    else if(error.status === 406)
      alert("Don't send toxic messages!")
    else
      console.error(`Error code ${error.status}, body: `, error.error);
    return throwError(() => new Error("Error occured"))
  }
}
