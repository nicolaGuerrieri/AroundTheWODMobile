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
		  place: 'reggio emilia'
		};
	}
	showAddressModal () {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => {
		  this.address.place = data;
		  this.ricerca();
		});
		modal.present();
	}
	
	ricerca(){
		console.log(">>"+ this.address.place+ "<<<");
		
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
