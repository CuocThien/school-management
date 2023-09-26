import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
  ) { }

  public getListNotification(options: any): Observable<any> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + '/notifications?' + options);
  }

}