import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiURL: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  public getflight(url?: string){
    return this.httpClient.get<Flight[]>(`${this.apiURL}${url}`);
  }
}
