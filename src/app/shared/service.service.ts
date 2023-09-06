
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private Http:HttpClient) { }

  addEmployee(data:any):Observable<any>{
   return this.Http.post("http://localhost:3000/employees",data);
  }

  getAllEmployee():Observable<any>{
    return this.Http.get("http://localhost:3000/employees");
   }

   deleteEmployee(id:any):Observable<any>{
    return this.Http.delete(`http://localhost:3000/employees/${id}`);
   }
   UpdateEmployee(id:number,data:any):Observable<any>{
    return this.Http.put(`http://localhost:3000/employees/${id}`,data);
   }
}

