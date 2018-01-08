import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Injectable()
export class Global {
	public title: string = "AroundTheWOD App";
	private _isAndroid: boolean;
	private _isiOS: boolean;
	public language: any;
	public preUrl: string;
	public userLogged: any;
	
	constructor(public platform: Platform, private nativePageTransitions: NativePageTransitions) {
		if (navigator.language) {
			if (navigator.language.indexOf("it") > -1) {
				this.language = "it";
			} else {
				this.language = "en";
			}
		}

		//alert(this.language);
		this._isAndroid = platform.is('android');
		this._isiOS = platform.is('ios');
		if (this.platform.is('core')) {
			this.preUrl = 'http://app.nicolaguerrieri.it:3000/';

			//this.preUrl = 'provaV2/';
		} else {
			this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
		}
	}

	openSocial(social) {
		if (social == 'facebook') {
			window.open('https://www.facebook.com/aroundthewodapp/?ref=aymt_homepage_panel');
		} else {
			window.open('https://www.instagram.com/aroundthewodapp/?hl=it');
		}
	}

	getOptionTransition(){
		let options: NativeTransitionOptions = {
			direction: 'left',
			duration: 200,
			slowdownfactor: -1,
			iosdelay: 50
		};
		return options;
	}
}
