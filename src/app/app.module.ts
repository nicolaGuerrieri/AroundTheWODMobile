import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Ricerca } from '../pages/ricerca/ricerca';

import {Global} from '../services/global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	Ricerca
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	Ricerca
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Global]
})
export class AppModule {}
