import { Component } from '@angular/core';
import {CittaLuogoService} from '../../providers/citta-luogo-service';

import { NavController, ModalController, LoadingController, Platform  } from 'ionic-angular';
import {Global} from '../../services/global';
import { Ricerca } from '../ricerca/ricerca';
import { AutocompletePage } from './autocomplete';

declare var cordova:any;
declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CittaLuogoService]
})
export class HomePage {

	address;

	constructor(public navCtrl: NavController, public global:Global, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform) {
	
	//	alert(this.plt.platforms());
		this.address = {
		  place: 'reggio emilia'
		};
	}
	showAddressModal () {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => { 
			if(data != null){
				this.address.place = data.split(",")[0];
				this.ricerca();
			}else{
				return;
			}
		});
		modal.present();
	}
	geolocalizza(){
		let loader = this.loading.create({
			content: 'Please wait...',
		});
		loader.present();
		if (this.plt.is('core')) {
			this.cittaLuogoService.localizza().then(data => {
				if(data.address_components[2]){
					//alert(data.address_components[2].long_name);
					this.address.place = data.address_components[2].long_name;
					this.ricerca();
					loader.dismiss();
				}
			});
		}else{
			cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
				if(enabled){
					this.cittaLuogoService.localizza().then(data => {
						if(data.address_components[2]){
							//alert(data.address_components[2].long_name);
							this.address.place = data.address_components[2].long_name;
							this.ricerca();
							loader.dismiss();
						}
					});
				}else{
					alert("Please enable GPS localization");
				}
			});
		}
	}
	ricerca(){
		if(this.address.place != ""){
			this.navCtrl.push(Ricerca,{
				citta: this.address.place
			},{ animate: true, direction: 'forward' });
		}else{
			console.log("bloccato");
			return;
		}
	}
}