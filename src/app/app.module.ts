import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutocompletePage } from '../pages/home/autocomplete';
import { Ricerca } from '../pages/ricerca/ricerca';
import { Detail } from '../pages/ricerca/detail';
import { DialogSocial } from '../pages/dialog/dialogSocial';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {Global} from '../services/global';
const cloudSettings: CloudSettings = {
    'core': {
    'app_id': 'f33b26b8'
  },
  'auth': {
    'google': {
      'webClientId': '923547097240-vj2comu32e960c7rr6h9sccrpsiihhef.apps.googleusercontent.com',
      'scope': []
    }
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
	Detail,
	DialogSocial
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	 CloudModule.forRoot(cloudSettings) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	Ricerca,
	AutocompletePage,
	Detail,
	DialogSocial
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Global]
})
export class AppModule {}
