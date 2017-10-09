import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ActionSheetController, Content } from 'ionic-angular';
import { Global } from '../../services/global';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { Geolocation, SocialSharing } from 'ionic-native';
import { Detail } from '../ricerca/detail';
import { DettaglioOrganizzazioni } from '../ricerca/dettaglioOrganizzazioni';


@Component({
	selector: 'organizzazioni',
	templateUrl: 'organizzazioni.html',
	providers: [CittaLuogoService]
})
export class Organizzazioni {
	@ViewChild(Content) content: Content;
	public citta: any;
	public listaOrganizzazioni: any;
	public listaRaccordo: any = [];
	public loader;
	navOptions = {
		animate: true,
		animation: 'wp-transition'
	};

	constructor(public navCtrl: NavController, public global: Global, public params: NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform) {
		this.citta = params.get("citta");
		this.caricaOrganizzazioni(this.citta);
	}

	caricaOrganizzazioni(citta) {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.loader.present();
		this.cittaLuogoService.loadOrganizzazioni(this.citta).then(data => {

			if (data != "error") {
				console.log(data)
				this.listaOrganizzazioni = data;
			}
			this.loader.dismiss();
		});

	}

	goDetail(org){
		this.navCtrl.push(DettaglioOrganizzazioni,{
			luoghiOrganizzazione: this.listaRaccordo,
			organizzazione: org
		}, this.navOptions);
	}
	selectOrg(org) {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.listaRaccordo = [];
		this.loader.present();
		this.cittaLuogoService.getLuogoForIdOrganizzazione(org._id).then(data => {

			if (data != "error") {  
				data.listaLuoghi.forEach(element => {
					console.log(element);
					this.cittaLuogoService.getLuogoForId(element.luogo_id).then(data => {
						this.listaRaccordo.push(data); 
						this.goDetail(org);
					});	
				
				});
			}
			this.loader.dismiss();
		});
	}
	scrollToBottom() {
		this.content.scrollToBottom();
	}

	back() {
		if (this.loader) {
			this.loader.dismiss();
		}
		this.navCtrl.popToRoot();
	}
}
