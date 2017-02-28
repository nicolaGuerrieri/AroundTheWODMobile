import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutocompletePage } from '../pages/home/autocomplete';
import { Ricerca } from '../pages/ricerca/ricerca';
import { Detail } from '../pages/ricerca/detail';

import {Global} from '../services/global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
	Detail
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
	Detail
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Global]
})
export class AppModule {}
