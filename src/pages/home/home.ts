import { Component } from '@angular/core';

import { NavController, ModalController} from 'ionic-angular';
import {Global} from '../../services/global';
import { Ricerca } from '../ricerca/ricerca';
import { AutocompletePage } from './autocomplete';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	address;

	constructor(public navCtrl: NavController, public global:Global, private modalCtrl: ModalController) {
		this.address = {
		  place: ''
		};
	}
	showAddressModal () {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => {
		  this.address.place = data;
		});
		modal.present();
	}
	
	ricerca(){
		console.log(">>"+ this.address.place+ "<<<");
		
		if(this.address.place != ""){
			this.navCtrl.push(Ricerca,{
				citta: this.address.place
			});
		}else{
			console.log("bloccato");
			return;
		}
	}
}
