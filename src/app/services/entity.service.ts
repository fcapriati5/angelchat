import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Entity } from '../models/entity';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
  })
};



@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }


  getEntities(): Observable<any>{
    return this.http.get<any>(environment['angel-api-url'] + 'entities');
  }

  saveEntities(infoForm: any): Observable<any>{
    return this.http.post<any>(environment['angel-api-url'] + 'save/entities', infoForm);
  }

  recognizeEntity(text: any): Observable<any>{
    return this.http.post<any>(environment['angel-api-url'] + 'recognize/entity', text);
  }
  
}
