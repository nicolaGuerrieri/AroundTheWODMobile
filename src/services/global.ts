import { Injectable } from '@angular/core'; 
import { Platform  } from 'ionic-angular';

@Injectable()
export class Global {
  public title:string = "AroundTheWOD App";
   public preUrl:string;
 	constructor(public platform: Platform) {
		if (this.platform.is('core')) {
			this.preUrl = 'provaV2/';
		}else{
			this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
		}
	}
 
 
}