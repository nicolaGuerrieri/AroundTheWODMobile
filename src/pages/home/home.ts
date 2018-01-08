import { Component } from '@angular/core';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { NavController, ModalController, LoadingController, Platform, ViewController } from 'ionic-angular';
import { Global } from '../../services/global';
import { Ricerca } from '../ricerca/ricerca';
import { Footer } from '../ricerca/footer';
import { AutocompletePage } from './autocomplete';
import { DialogSocial } from '../dialog/dialogSocial';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { Success } from '../dialog/success';
declare var cordova: any;
declare var google: any;
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [CittaLuogoService]
})
export class HomePage {
	splash = true;
	address;
	public allSearchPlace: any;
	plat: any;

	constructor(private facebook: Facebook, public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, public global: Global, public viewCtrl: ViewController, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform) {
		this.address = {
			place: ''
		};

		this.nativePageTransitions.slide(global.getOptionTransition());

	}
	loginWithFB() {
		let loader = this.loading.create({
			content: 'Please wait...',
		});
		try {
			loader.present();
			this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
				this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
					this.global.userLogged = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
					this.global.userLogged.azione = "login";
					this.global.userLogged.dataAzione = new Date();
					this.cittaLuogoService.salvaUtente(this.global.userLogged).then(data => { });
					loader.dismiss();
				});
			});
		} catch (err) {
			loader.dismiss();
		}
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
	ionViewDidLoad() {
		setTimeout(() => this.splash = false, 100);
	}
	showAddressModal() {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => {
			if (data != null) {
				this.allSearchPlace = data;
				this.address.place = data.description;
				this.ricerca(false);
			} else {
				return;
			}
		});
		modal.present();
	}
	showAddressModal2() {
		let modal = this.modalCtrl.create(Success, { "from": "login" });
		modal.onDidDismiss(data => {

		});
		modal.present();
	}
	geolocalizza() {
		try {
			let loader = this.loading.create({
				content: 'Please wait...',
			});
			loader.present();
			this.cittaLuogoService.localizza(loader).then(data => {
				if (data != "error") {
					if (data.address_components[2]) {
						this.address.place = data.address_components[2].long_name;
						this.allSearchPlace = data;
						this.ricerca(true);
					}
				} else {
					alert("No data found");
				}
				loader.dismiss();
			});
		} catch (e) {
			alert("error" + e);
		}
	}


	ricerca(flagPresent) {
		if (flagPresent) {
			this.navCtrl.push(Ricerca, {
				citta: this.address.place,
				allSearchPlace: this.allSearchPlace
			});
		} else {
			if (this.address.place != "") {
				this.cittaLuogoService.localizzaByNome(this.address.place).then(data => {
					this.navCtrl.push(Ricerca, {
						citta: this.address.place,
						allSearchPlace: data
					});
				});
			} else {
				console.log("bloccato");
				return;
			}
		}
	}
}
