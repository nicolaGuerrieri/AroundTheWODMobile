import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, Content } from 'ionic-angular';
import { Global } from '../../services/global';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { DettaglioOrganizzazioni } from '../ricerca/dettaglioOrganizzazioni';
import { Footer } from '../ricerca/footer';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


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

	constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, public global: Global, public params: NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform) {
		//this.nativePageTransitions.slide(global.getOptionTransition());

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

	goDetail(org) {
		this.navCtrl.push(DettaglioOrganizzazioni, {
			luoghiOrganizzazione: this.listaRaccordo,
			organizzazione: org
		});
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
