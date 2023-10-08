import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
  ) { }

  public getScoresByClass(classId: number, subjectId: number, options: any): Observable<any> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + `/scores/${classId}/${subjectId}?` + options);
  }

  public updateScore(id: string, body: any): Observable<any> {
    return this.http.put<[]>(this.API_URL + `/score/${id}`, body);
  }

  public getStudyProcess(studentId: string, options: any): Observable<any> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + `/study-process/${studentId}?` + options);
  }

  public getScoreFinal(studentId: string): Observable<any> {
    return this.http.get<[]>(this.API_URL + `/score-final/${studentId}`);
  }

}
