import { Injectable } from '@angular/core'; 
import { Platform  } from 'ionic-angular';

@Injectable()
export class Global {
	public title:string = "AroundTheWOD App";
	private _isAndroid: boolean;
	private _isiOS: boolean; 
   public preUrl:string;
 	constructor(public platform: Platform) {
		this._isAndroid = platform.is('android');
		this._isiOS = platform.is('ios');
		if (this.platform.is('core')) {
			this.preUrl = 'provaV2/';
		}else{
			this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
		}
	}
}