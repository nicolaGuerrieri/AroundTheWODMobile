import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Injectable()
export class Global {
	public title: string = "No matter where";
	public _isAndroid: boolean;
	public _isiOS: boolean;
	public language: any;
	public preUrl: string;
	public userLogged: any;
	public loader;
	textAlert: string;
	titleAlert: string;
	textCosa: string;
	constructor(public platform: Platform, public loading: LoadingController, ) {
		if (navigator.language) {
			if (navigator.language.indexOf("it") > -1) {
				this.language = "it";
					this.titleAlert = 'Ciao...';
					this.textAlert = 'e benvenuto in AroundTheWod App, inserisci la tua città o geolocalizzati per cercare i parchi outdoor più vicini a te. Conosci un parco che non è presente in AroundTheWOD App? inseriscilo !!!';
					this.textCosa="Cerca una città, un indirizzo o un parco attraverso la pratica barra di ricerca con autocompletamento oppure utilizza il tasto geolocalizzazione per trovare facilmente i parchi vicino a te, scegli il tuo parco, visualizza il dettaglio e aprilo in Maps. Conosci un parco che non è presente in AroundTheWOD App, clicca sul pulsante  + per inserirlo, inserisci le attività, l'indirizzo e una tua mail e salva, il tuo parco ora è alla portata di tutti. Sfoglia tra la nostra community, cerca in AroundTheWOD community chi si allena nella tua zona. "
			} else {
				this.textAlert = 'e benvenuto in AroundTheWod App, inserisci la tua città o geolocalizzati per cercare i parchi outdoor più vicini a te. Conosci un parco che non è presente in AroundTheWOD App? inseriscilo !!!';
				this.titleAlert = 'Ciao...';
				this.language = "en";
			}
		}

		//alert(this.language);
		this._isAndroid = platform.is('android');
		this._isiOS = platform.is('ios');

		this.preUrl = 'http://app.aroundthewodapp.com:3000/';
		// this.preUrl = 'http://137.204.22.202:3000/';

	}

	openSocial(social) {
		if (social == 'facebook') {
			window.open('https://www.facebook.com/aroundthewodapp/?ref=aymt_homepage_panel');
		} else {
			window.open('https://www.instagram.com/aroundthewodapp/?hl=it');
		}
	}

	togliOverlay() {
		if (this.loader) {
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
