import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ActionSheetController, Content } from 'ionic-angular';
import { Global } from '../../services/global';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { Geolocation, SocialSharing } from 'ionic-native';
import { Detail } from '../ricerca/detail';


@Component({
	selector: 'dettaglioOrganizzazioni',
	templateUrl: 'dettaglioOrganizzazioni.html',
	providers: [CittaLuogoService]
})
export class DettaglioOrganizzazioni {
	@ViewChild(Content) content: Content;
	public luoghiOrganizzazione: any = [];
	public item: any;
	public loader;
	navOptions = {
		animate: true,
		animation: 'wp-transition'
	};

	constructor(public navCtrl: NavController, public global: Global, public params: NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform) {
		this.luoghiOrganizzazione = params.get("luoghiOrganizzazione");
		this.item = params.get("organizzazione");
		if (this.luoghiOrganizzazione == null) {
			this.caricaLuoghiPerOrg(this.item);
		}
	}

	caricaLuoghiPerOrg(organizzazione) {
		this.cittaLuogoService.getLuogoForIdOrganizzazione(organizzazione._id).then(data => {
			if (data != "error") {
				data.listaLuoghi.forEach(element => {
					console.log(element);
					this.cittaLuogoService.getLuogoForId(element.luogo_id).then(data => {
						this.luoghiOrganizzazione.push(data);
					});

				});
			}
			this.loader.dismiss();
		});
	}
	selectPlace(idPlace) {
		this.navCtrl.push(Detail, {
			idLuogo: idPlace
		}, this.navOptions);
	}

	back() {
		if (this.loader) {
			this.loader.dismiss();
		}
		this.navCtrl.popToRoot();
	}
}
