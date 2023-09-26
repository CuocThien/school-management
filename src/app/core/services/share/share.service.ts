import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { City } from '../../models/share/city.model';
import { Store } from '../../models/share/store.model';
import { District } from '../../models/share/district.model';
import { PaymentMethod } from '../../models/share/payment-method.model';
import { LaundryPackage } from '../../models/share/laundry-package.model';
import { PtPackage } from '../../models/share/pt-package.model';
import { UserProfile } from '../../models/share/user-profile.model';
import { DeliveryMethod } from '../../models/share/delivery-method.model';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
  ) { }

  public getListStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_URL + '/general/stores');
  }
  public getListStoreWithPermission(): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_URL + '/general/stores');
  }

  public getClubDetailById(clubId: number): Observable<Store> {
    return this.http.get<Store>(this.API_URL + `/general/club/${clubId}`);
  }

  public getListLaundryPackage(): Observable<LaundryPackage[]> {
    return this.http.get<LaundryPackage[]>(this.API_URL + '/global/laundry-package');
  }

  public getPtListPackage(): Observable<PtPackage[]> {
    return this.http.get<PtPackage[]>(this.API_URL + '/global/pt-package');
  }

  public getListPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.API_URL + '/general/payment-methods');
  }

  public getListDeliveryMethod(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.API_URL + '/general/delivery-methods');
  }

  public getListPaymentMethodByLaundryPackageId(LaundryPackageId: string): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.API_URL + `/global/laundry-package-promotion-method/${LaundryPackageId}`);
  }

  public getListLaundryPackageByClub(clubId: string): Observable<LaundryPackage[]> {
    return this.http.get<LaundryPackage[]>(this.API_URL + `/global/laundry-package-by-club/${clubId}`);
  }

  public getCityDetailById(cityId: number): Observable<City> {
    return this.http.get<City>(this.API_URL + `/general/city/detail/${cityId}`);
  }

  public getDistrictDetailById(districtId: number): Observable<District> {
    return this.http.get<District>(this.API_URL + `/general/district/detail/${districtId}`);
  }

  public getMemberInfoByAccountId(accountId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.API_URL + `/member/info/${accountId}`);
  }

  public getLaundryPackageDetailById(paymentId: number): Observable<LaundryPackage> {
    return this.http.get<LaundryPackage>(this.API_URL + `/global/laundry-package/${paymentId}`);
  }

  public getListCoupons(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/promotion/coupons');
  }

  public getListCampaign(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/promotion/campaigns');
  }

  public getListPtByClub(clubId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `/user/list-pt/${clubId}`);
  }

  public getListPtPackageByClub(clubId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `/global/pt-package-club/${clubId}`);
  }

  public getListGroupByClub(clubId: number): Observable<[]> {
    return this.http.get<[]>(this.API_URL + `/general/club-pt-group/${clubId}`);
  }

  public getListPTByGroup(groupId: number): Observable<[]> {
    return this.http.get<[]>(this.API_URL + `/pt/list-pt-in-group/${groupId}`);
  }

  public getListPtLeaderByClub(options: any): Observable<[]> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + '/leader/list-leader?' + options);
  }

  public getPtLeaderByGroup(groupId: number): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(this.API_URL + `/leader/leader-in-group/${groupId}`);
  }
  public getListCountry(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/general/countries');
  }

  public getListCityByCountryId(countryId: number): Observable<City> {
    return this.http.get<City>(this.API_URL + '/general/cities?countryId=' + countryId);
  }

  public getListDIstrictByCityId(cityId: number): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/general/districts?cityId=' + cityId);
  }

  public getListWardByDistrictId(districtId: number): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/general/wards?districtId=' + districtId);
  }

  public getListRole(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/auth/roles');
  }

  public getListAccessRule(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/global/access-rule-groups');
  }

  public getListWarehouse(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/inventory/warehouse');
  }

  public getListSupplier(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/inventory/supplier');
  }

  public getListLaundryPackageGroup(): Observable<[]> {
    return this.http.get<[]>(this.API_URL + '/global/laundry-package-groups');
  }

  public sendMail(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/global/send-mail', body);
  }
  public sendMailVer2(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/global/send-mail-ver2', body);
  }

  public listLaundryPackageForMember(options: any): Observable<[]> {
    options = querystring.stringify(options);
    return this.http.get<[]>(this.API_URL + '/global/laundry-packages-for-member?' + options);
  }
}
