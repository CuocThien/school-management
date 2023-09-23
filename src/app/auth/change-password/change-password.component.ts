import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';
import { LanguageService } from 'src/app/core/services/common/language.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  URL = UrlConstant.ROUTE.MAIN;
  username = '';
  password = '';
  isShowCurrentPass = false;
  isShowPass = false;
  isShowPassConfirm = false;
  accountId: string;
  code: string;
  isPassRequire1 = false;
  isPassRequire2 = false;
  isPassRequire3 = false;
  // Language
  currentLang = localStorage.getItem(SystemConstant.LANGUAGE) || 'en';
  isForgotPassword = false
  constructor(
    public languageSvc: LanguageService,
    private formBuilder: FormBuilder,
    private authSvc: AuthenticationService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('EmailPhoneForgotPass')) {
      this.isForgotPassword = true;
    }
    this.createForm();
  }

  private _containsUppercase(str: string) {
    return /[A-Z]/.test(str);
  }

  private _containsSpecialCharacter(str: string) {
    return /[*.!@$%^&(){}#~_-]/.test(str);
  }

  public createForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword'),
    });
    if (!this.isForgotPassword) {
      this.form.addControl('oldPassword', new FormControl('', Validators.required));
    }
  }

  public onSubmit() {
    if (!this.isPassRequire1 || !this.isPassRequire2 || !this.isPassRequire3 || this.form.invalid) {
      return this.alert.error(LanguageConstant[this.currentLang].ERROR.PASSWORD_INVALID);
    }
    if (!this.isForgotPassword && this.form.get('oldPassword').value == this.form.get('newPassword').value) {
      return this.alert.error(LanguageConstant[this.currentLang].ERROR.CHANGE_PASSWORD_INVALID);
    }
    const body = !this.isForgotPassword ? {
      oldPass: this.form.get('oldPassword').value,
      newPass: this.form.get('newPassword').value,
    } : {
      password: this.form.get('newPassword').value
    };
    if (!this.isForgotPassword) {
      this.authSvc.changePassword(body).subscribe(() => {
        localStorage.clear();
        this.alert.success(LanguageConstant[this.currentLang].LOGIN.CHANGE_PASS_SUCCESS);
        this.router.navigate([UrlConstant.ROUTE.AUTH.LOGIN]);
        this.spinner.hide();
        return;
      }, () => { this.spinner.hide(); return; });
    } else {
      this.authSvc.setPassword(body).subscribe(() => {
        sessionStorage.removeItem('EmailPhoneForgotPass');
        this.alert.success(LanguageConstant[this.currentLang].LOGIN.CHANGE_PASS_SUCCESS);
        this.authSvc.getDataInfo(localStorage.getItem('ACCESS_TOKEN'));
        this.router.navigate([UrlConstant.ROUTE.MAIN.DASHBOARD]);
        this.spinner.hide();
        return;
      }, () => { this.spinner.hide(); return; });
    }
  }

  public showPassword(type: string) {
    if (type === 'oldPassword') {
      return this.isShowCurrentPass = !this.isShowCurrentPass;
    }
    type === 'newPassword'
      ? (this.isShowPass = !this.isShowPass)
      : (this.isShowPassConfirm = !this.isShowPassConfirm);
  }

  public onChangeNewPass(event: any) {
    this.isPassRequire1 = event.length >= 6;
    this.isPassRequire2 = this._containsUppercase(event);
    this.isPassRequire3 = this._containsSpecialCharacter(event);
  }
}
