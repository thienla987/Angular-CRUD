import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:3000/posts";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {

    return this.httpClient.get<Post[]>(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post:Post): Observable<Post> {

    return this.httpClient.post<Post>(this.apiURL , JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id:number) {
    const Url= `${this.apiURL}/${id}`
    return this.httpClient.get<Post>(Url)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, post:Post) {
    const Url= `${this.apiURL}/${id}`
    return this.httpClient.put<Post>(Url,post )

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    const Url= `${this.apiURL}/${id}`
    return this.httpClient.delete(Url, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
