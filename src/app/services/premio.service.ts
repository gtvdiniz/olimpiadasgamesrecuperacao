import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Premio } from '../interfaces/premio';

@Injectable({
  providedIn: 'root'
})
export class PremioService {

  private apiURL = "http://academico3.rj.senac.br/olimpiada/api/premio";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Premio[]>{
    return this.httpClient.get<Premio[]>(`${this.apiURL}`, this.httpOptions)
  }

  criar(partrocinador : Premio): Observable<Premio>{
    return this.httpClient.post<Premio>(this.apiURL, partrocinador, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  buscar(idPremio: number): Observable<Premio>{
    return this.httpClient.get<Premio>(this.apiURL+ '/' + idPremio, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  atualizar(idPremio:number, Premio: Premio): Observable<Premio>{
    return this.httpClient.put<Premio>(this.apiURL +'/'+ idPremio, Premio, this.httpOptions ).pipe(
      catchError(this.errorHandler)
    );
  }

  apagar(idPremio: number): Observable<any>{
    return this.httpClient.delete(this.apiURL + '/'+ idPremio).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
