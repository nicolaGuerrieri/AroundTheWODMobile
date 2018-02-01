import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Injectable()
export class Global {
	public title: string = "AroundTheWOD App";
	private _isAndroid: boolean;
	private _isiOS: boolean;
	public language: any;
	public preUrl: string;
	public userLogged: any;
	public loader;

	constructor(public platform: Platform, private nativePageTransitions: NativePageTransitions, public loading: LoadingController, ) {
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
	
			this.preUrl = 'http://45.62.253.187:3000/';
		}

	openSocial(social) {
		if (social == 'facebook') {
			window.open('https://www.facebook.com/aroundthewodapp/?ref=aymt_homepage_panel');
		} else {
			window.open('https://www.instagram.com/aroundthewodapp/?hl=it');
		}
	}

	togliOverlay() {
		if(this.loader){
			this.loader.dismiss();

		}
	}
	inserisciOverlay() {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.loader.present();
	}
	getOptionTransition() {
		let options: NativeTransitionOptions = {
			direction: 'left',
			duration: 200,
			slowdownfactor: -1,
			iosdelay: 50
		};
		return options;
	}
}
