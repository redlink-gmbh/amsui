import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';
export function moduleHttpLoaderFactory(
  http: HttpClient
): ModuleTranslateLoader {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl: baseTranslateUrl + '/amsui' },
      { baseTranslateUrl },
    ],
  };

  return new ModuleTranslateLoader(http, options);
}
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class TranslationSettingsModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
