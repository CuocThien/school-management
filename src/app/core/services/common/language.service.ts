import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemConstant } from '../../constants/system.constant';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'vi'];
  constructor(
    public translate: TranslateService
  ) {
    this.translate.addLangs(this.languages);
    const browserLang = localStorage.getItem(SystemConstant.LANGUAGE) || 'vi';
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem(SystemConstant.LANGUAGE, lang);
  }
}
