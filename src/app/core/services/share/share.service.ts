import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
  ) { }

  public getListRole(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/auth/roles');
  }

}
