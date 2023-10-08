import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { LanguageConstant } from '../../constants/language.constant';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { User } from '../../models/common/auth.model';
import { UserProfile } from '../../models/share/user-profile.model';
import * as querystring from 'querystring';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: ToastrService,
    private permissionsService: NgxPermissionsService,
    private spinner: NgxSpinnerService
  ) { }

  public login(user: User) {
    this.spinner.show();
    return this.http.post(this.API_URL + '/auth/login', user).subscribe(
      (res: any) => {
        this.setTokenData(res.data);
        this.getDataInfo(res.data.accessToken);
        this.spinner.hide();
      }
    );
  }

  public setTokenData(data: any) {
    localStorage.setItem(SystemConstant.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(SystemConstant.REFRESH_TOKEN, data.refreshToken);
  }

  public getDataInfo(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    this.http.get(this.API_URL + '/auth/profile', httpOptions).subscribe((res: any) => {
      const permissions = res.data.permissions.concat(res.data.systemPermissions);
      this.permissionsService.loadPermissions(permissions); //Load Permission
      const currentLang = localStorage.getItem(SystemConstant.LANGUAGE) || 'vi';
      if (!permissions.includes(SystemConstant.SYSTEM_PERMISSIONS.CRM)) {
        this.spinner.hide();
        this.alert.error(LanguageConstant[currentLang].ERROR.ER_403);
        return;
      }
      this.alert.success(LanguageConstant[currentLang].LOGIN.SUCCESS);
      localStorage.setItem(SystemConstant.USER_PROFILE, JSON.stringify(res.data));
      localStorage.setItem(SystemConstant.ACCOUNT_TYPE, res.data.accountType);
      this.router.navigateByUrl(UrlConstant.ROUTE.MAIN.NEWS);
    });
  }

  public checkSystemPermissions(): boolean {
    const userInfo = this.getUserProfileLocal();
    if (!userInfo.systemPermissions.includes(SystemConstant.SYSTEM_PERMISSIONS.CRM)) {
      this.router.navigateByUrl(UrlConstant.ROUTE.AUTH.LOGIN);
      return false;
    }
    return true;
  }

  public checkAccountTypePermission(): boolean {
    const userInfo = this.getUserProfileLocal();
    if (!userInfo.systemPermissions.includes(SystemConstant.SYSTEM_PERMISSIONS.CRM)) {
      this.router.navigateByUrl(UrlConstant.ROUTE.AUTH.LOGIN);
      return false;
    }
    return true;
  }

  public checkPermissions(permissions: string[]): boolean {
    const auth = this.getUserProfileLocal();
    return auth.permissions.some(item => permissions.includes(item));
  }

  public logout() {
    const lang = localStorage.getItem(SystemConstant.LANGUAGE) || 'vi';
    localStorage.clear();
    localStorage.setItem(SystemConstant.LANGUAGE, lang);
    this.router.navigate([UrlConstant.ROUTE.AUTH.LOGIN]);
  }

  public getAccessToken() {
    return localStorage.getItem(SystemConstant.ACCESS_TOKEN) || null;
  }

  public getAccountType() {
    return localStorage.getItem(SystemConstant.ACCOUNT_TYPE) || null;
  }

  public getRefToken() {
    return localStorage.getItem(SystemConstant.REFRESH_TOKEN) || null;
  }

  public getUserProfileLocal() {
    return JSON.parse(localStorage.getItem(SystemConstant.USER_PROFILE)) || null;
  }

  public getUserProfileServer(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.API_URL + '/auth/profile');
  }

  public forgotPassword(body: any): Observable<Record<string, unknown>> { //body = {username, type: 'OTP'}
    return this.http.post<Record<string, unknown>>(this.API_URL + '/auth/send-code', body);
  }

  public checkOptCode(body: any): Observable<Record<string, unknown>> {   //body = {accountId, code}
    return this.http.put<Record<string, unknown>>(this.API_URL + '/auth/check-code', body);
  }

  public changePassword(body: any): Observable<Record<string, unknown>> { //body = {oldPassword, newPassword}
    return this.http.put<Record<string, unknown>>(this.API_URL + '/auth/change-password', body);
  }

  public setPassword(body: any): Observable<Record<string, unknown>> { //body = {newPassword}
    return this.http.put<Record<string, unknown>>(this.API_URL + '/auth/set-password', body);
  }

  public getListRole(options: any): Observable<[]> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + '/auth/list-roles?' + options);
  }

  public addRole(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/auth/role', body);
  }

  public editRole(id: string, body: any): Observable<any> {
    return this.http.put<any>(this.API_URL + `/auth/role/${id}`, body);
  }

  public deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + `/auth/role/${id}`);
  }

}
