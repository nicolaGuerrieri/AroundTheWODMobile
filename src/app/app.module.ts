import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutocompletePage } from '../pages/home/autocomplete';
import { Ricerca } from '../pages/ricerca/ricerca';
import { Organizzazioni } from '../pages/ricerca/organizzazioni';
import { Detail } from '../pages/ricerca/detail';
import { Footer } from '../pages/ricerca/footer';
import { DialogSocial } from '../pages/dialog/dialogSocial';
import { DettaglioOrganizzazioni } from '../pages/ricerca/dettaglioOrganizzazioni';
import { Success } from '../pages/dialog/success';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {Global} from '../services/global';
import { Storage } from '@ionic/storage';
import { Toast }   from 'ionic-native';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Facebook } from '@ionic-native/facebook';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
const cloudSettings: CloudSettings = {
    'core': {
    'app_id': 'f33b26b8'
  },
  'auth': {
    'google': {
      'webClientId': '923547097240-vj2comu32e960c7rr6h9sccrpsiihhef.apps.googleusercontent.com',
      'scope': ['profile']
    },
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
  Organizzazioni,
  DettaglioOrganizzazioni,
	Detail,
  DialogSocial,
  Footer,
	Success
  ],
  imports: [
    IonicModule.forRoot(MyApp, { animate: false }), BrowserModule, HttpModule,
   CloudModule.forRoot(cloudSettings)
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
  Detail,
  DettaglioOrganizzazioni,
	Organizzazioni,
	DialogSocial,
  Footer,
	Success
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Global, Storage, Toast, Facebook, NativePageTransitions]
  
})
export class AppModule {}
