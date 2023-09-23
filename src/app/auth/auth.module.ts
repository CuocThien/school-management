import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthRoutingModule } from './auth-routing';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

export const pluginModules = [
  TranslateModule,
  NgOtpInputModule
];
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyCodeComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    AuthRoutingModule,
    pluginModules
  ]
})
export class AuthModule { }
