import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

registerLocaleData(localeDe);

bootstrapApplication(AppComponent, appConfig).catch(function (error) {
	console.error(error);
});
