import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, Content, ViewController, ToastController } from 'ionic-angular';
import { Global } from '../../services/global';
import { HomePage } from '../home/home';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { DialogSocial } from '../dialog/dialogSocial';

@Component({
	selector: 'footer',
	templateUrl: 'footer.html',
	inputs: ['userLogged']
})
export class Footer {
	
	
	public userLogged: any;
	constructor(private nav: NavController, public cittaLuogoService: CittaLuogoService, public global: Global, private modalCtrl: ModalController) {
	}
		
	info() {
		let modal = this.modalCtrl.create(DialogSocial, { "from": "info" });
		modal.present();
	}

	logOut() {
		/**this.global.userLogged.azione = "logout";
		this.global.userLogged.dataAzione = new Date();
		this.cittaLuogoService.salvaUtente(this.global.userLogged).then(data => { });
		this.global.userLogged = null;**/
		this.nav.setPages([
			{ page: HomePage }
		]);
	}
	
	openTermini() {
		let modal = this.modalCtrl.create(DialogSocial, { "from": "termini" });
		modal.present();
	}

}