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

  public createNotification(body: any): Observable<[]> {
    return this.http.post<[]>(this.API_URL + '/notification', body);
  }

  public updateNotification(id: string, body): Observable<[]> {
    return this.http.put<[]>(this.API_URL + `/notification/${id}`, body);
  }

  public deleteNotification(id: string): Observable<[]> {
    return this.http.delete<[]>(this.API_URL + `/notification/${id}`);
  }

}
