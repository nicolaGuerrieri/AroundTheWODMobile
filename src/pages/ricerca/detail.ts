import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, Content, ViewController, ToastController } from 'ionic-angular';
import { Global } from '../../services/global';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { AutocompletePage } from '../home/autocomplete';
import { Ricerca } from '../ricerca/ricerca';
import { DialogSocial } from '../dialog/dialogSocial';
import { Success } from '../dialog/success';
import { FacebookAuth, User, Auth, GoogleAuth } from '@ionic/cloud-angular';
import { DettaglioOrganizzazioni } from '../ricerca/dettaglioOrganizzazioni';
import { Footer } from '../ricerca/footer';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Camera, CameraOptions } from '@ionic-native/camera';


declare var google: any;
declare var cordova: any;
declare var window: any;
@Component({
	selector: 'detail',
	templateUrl: 'detail.html',
	providers: [CittaLuogoService]
})
export class Detail implements OnInit {
	@ViewChild(Content) content: Content;
	public idLuogo;
	public nuovoLuogo = false;
	public loader;
	public luogoSelezionato;
	public nuovoLuogoObject: any;
	private _isAndroid: boolean;
	private _isiOS: boolean;
	public listaRaccordo: any = [];

	public listaAttivita: any;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	constructor(private camera: Camera, public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, private toastCtrl: ToastController, public viewCtrl: ViewController, public global: Global, public params: NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform, public googleAuth: GoogleAuth, public user: User, public facebookAuth: FacebookAuth, public auth: Auth) {

		this._isAndroid = plt.is('android');
		this._isiOS = plt.is('ios');
		this.inizializzaDettaglio();
		this.loadAttivita();


	}


	loadAttivita() {
		this.cittaLuogoService.loadAttivita().then(data => {
			this.listaAttivita = data;
		});

	}

	takePicture() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.nuovoLuogoObject.imageUrl = base64Image;
		}, (err) => {
			alert(err);
		});
	}

	deletePicture(){
		this.nuovoLuogoObject.imageUrl = null;
	}
	scrollToBottom() {
		this.content.scrollToBottom();
	}
	ngOnInit() {

	}
	inizializzaDettaglio() {
		this.idLuogo = this.params.get("idLuogo");
		if (this.idLuogo != -1) {
			this.nuovoLuogo = false;
			this.cercaPerId(this.idLuogo);
			this.cercaOrganizzazioni(this.idLuogo);
		} else {
			this.nuovoLuogo = true;
			this.nuovoLuogoObject = {};
			this.nuovoLuogoObject.ricerca = "";
			this.nuovoLuogoObject.mail = "";
			this.nuovoLuogoObject.citta = "";
			this.nuovoLuogoObject.nazione = "";
			this.nuovoLuogoObject.provincia = "";
			this.nuovoLuogoObject.via = "";
			this.nuovoLuogoObject.descrizione = "";
			this.nuovoLuogoObject.cap = "";
			this.nuovoLuogoObject.ristoro = "";
			this.nuovoLuogoObject.attrezzature = "";
			this.nuovoLuogoObject.orari = "";
			this.nuovoLuogoObject.errore = null;
			this.nuovoLuogoObject.dal = null;
			this.nuovoLuogoObject.al = null;
			this.nuovoLuogoObject.listaAttivita = [];
			this.nuovoLuogoObject.imageUrl= null;
			this.geolocalizza();
		}


	}

	cercaOrganizzazioni(idLuogo) {
		this.listaRaccordo = [];
		this.cittaLuogoService.getLuogoForIdLuogo(idLuogo).then(data => {
			if (data) {
				if (data != "error") {
					data.listaLuoghi.forEach(element => {
						this.cittaLuogoService.getOrgById(element.organizzazione_id).then(data => {
							this.listaRaccordo.push(data);
						});

					});
				}

			}
		});
	}
	goDetail(org) {
		console.log(this.listaRaccordo)
		this.navCtrl.push(DettaglioOrganizzazioni, {
			luoghiOrganizzazione: null,
			organizzazione: org
		});
	}

	removeActivity(post) {
		for (var i = 0; i < this.listaAttivita.length; i++) {
			if (post == this.listaAttivita[i].nome) {
				this.listaAttivita[i].selezionato = false;
			}
		}
	}

	showDescriptionIconSport(description) {
		let toast = this.toastCtrl.create({
			message: description,
			duration: 3000,
			position: 'center'
		});
		toast.present();
	}

	selectActivity(attivita) {
		//this.removeActivityAll(attivita);
		//this.nuovoLuogoObject.listaAttivita.push(attivita);


		for (var i = 0; i < this.listaAttivita.length; i++) {
			if (attivita == this.listaAttivita[i].nome) {
				if (this.listaAttivita[i].selezionato == true) {
					this.listaAttivita[i].selezionato = false;
				} else {
					this.listaAttivita[i].selezionato = true;
					let toast = this.toastCtrl.create({
						message: this.listaAttivita[i].mostra,
						duration: 3000,
						position: 'center'
					});
					toast.present();
				}
			}
		}
	}
	//https://forum.ionicframework.com/t/how-to-speed-up-my-app/94271/19
	cercaPerId(idLuogoParameter) {
		try {
			if (idLuogoParameter == null) {
				alert("errore nessun id");
				return;
			} else {
				this.cittaLuogoService.getLuogoForId(idLuogoParameter).then(data => {

					this.luogoSelezionato = data;
					this.cercaLuogo(this.luogoSelezionato);
				});
			}
		} catch (e) {
			alert("nic" + e);
		}

	}


	openMapsApp() {
		var coords = this.luogoSelezionato.latitudine + "," + this.luogoSelezionato.longitudine;
		if (this._isiOS) {
			window.open("http://maps.apple.com/?q=" + coords, '_system');
			return;
		}
		if (this._isAndroid) {
			window.open("http://maps.google.com/?q=" + coords, '_system');
			return;
		}
		window.open("http://maps.google.com/?q=" + coords, '_system');
		return;
	}
	//- See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-open-native-maps-application-22#sthash.lc4YYgC7.dpuf

	validaDati() {

		this.nuovoLuogoObject.errore = null;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


		console.log(this.nuovoLuogoObject.ricerca.trim());
		if (this.nuovoLuogoObject.ricerca == undefined || this.nuovoLuogoObject.ricerca.trim() == "" || this.nuovoLuogoObject.ricerca.trim() == undefined) {
			this.nuovoLuogoObject.errore = "Insert place";
			return;
		} else if (this.nuovoLuogoObject.citta == undefined || this.nuovoLuogoObject.citta.trim() == "" || this.nuovoLuogoObject.citta.trim() == undefined) {
			this.nuovoLuogoObject.errore = "Insert city";
			return;
		} else if (this.nuovoLuogoObject.nazione == undefined || this.nuovoLuogoObject.nazione.trim() == "" || this.nuovoLuogoObject.nazione.trim() == undefined) {
			this.nuovoLuogoObject.errore = "Insert nation";
			return;
		} else if (this.nuovoLuogoObject.mail == undefined || this.nuovoLuogoObject.mail.trim() == "" || this.nuovoLuogoObject.mail.trim() == undefined) {
			this.nuovoLuogoObject.errore = "Insert your e-mail";
			return;
		} else if (!re.test(String(this.nuovoLuogoObject.mail).toLowerCase())) {
			this.nuovoLuogoObject.errore = "Insert correct e-mail";
			return;
		} else {
			var conta = 0;
			for (var i = 0; i < this.listaAttivita.length; i++) {
				if (this.listaAttivita[i].selezionato) {
					conta++;
				}
			}
			if (conta == 0) {
				this.nuovoLuogoObject.errore = "Select what you can do";
				return;
			}
		}


	}

	//}else if(this.nuovoLuogoObject.descrizione == undefined || this.nuovoLuogoObject.descrizione.trim()== "" || this.nuovoLuogoObject.descrizione.trim() == undefined){
	//	this.nuovoLuogoObject.errore = "Insert description";
	//	return;
	//}else if(this.nuovoLuogoObject.attrezzature == undefined || this.nuovoLuogoObject.attrezzature.trim() == "" || this.nuovoLuogoObject.attrezzature.trim() == undefined){
	//	this.nuovoLuogoObject.errore = "Insert workout equipment ";
	//	return;
	salva() {

		this.validaDati();
		if (this.nuovoLuogoObject.errore) {
			return;
		}

		this.inviaDatiServer(this.global.userLogged, this.loader);
		/**	let modal = this.modalCtrl.create(DialogSocial, { "from": "login" });
			modal.onDidDismiss(data => {
				if (!data) {
					return;
				}**/
		//		this.loginSocial(data);
		//	});
		//modal.present();
	}

	loginSocial(social) {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.loader.present();
		if (!social) {
			this.loader.dismiss();
		}

		this.cittaLuogoService.loginSocial(social).then(socialData => {
			if (!socialData) {
				this.loader.dismiss();
				return;
			}
			let datiSocial = socialData;
			if (datiSocial) {
				this.inviaDatiServer(socialData, this.loader);
			} else {
				this.loader.dismiss();
			}
		});
	}
	riempiOggetto(data) {
		var listaPrec = this.nuovoLuogoObject.listaAttivita;
		this.nuovoLuogoObject = {};
		this.nuovoLuogoObject.listaAttivita = listaPrec;
		if (!data) {
			return;
		}
		if (data.geometry != null) {
			this.nuovoLuogoObject.lat = data.geometry.location.lat();
			this.nuovoLuogoObject.longi = data.geometry.location.lng();
		}
		if (data.formatted_address != null) {
			this.nuovoLuogoObject.ricerca = data.formatted_address;
		} else if (data.address_components[1]) {
			this.nuovoLuogoObject.ricerca = data.address_components[1].long_name;
		} else if (data.address_components[2]) {
			this.nuovoLuogoObject.ricerca = data.address_components[2].long_name;
		}
		console.log(data)

		data.address_components.forEach((datoLuogo: any) => {
			if (datoLuogo.types[0] == 'locality') {
				this.nuovoLuogoObject.citta = datoLuogo.long_name;
			}
			if (datoLuogo.types[0] == 'administrative_area_level_3') {
				this.nuovoLuogoObject.provincia = datoLuogo.long_name;
			}
			if (datoLuogo.types[0] == 'country') {
				this.nuovoLuogoObject.nazione = datoLuogo.long_name;
			}
			if (datoLuogo.types[0] == 'postal_code') {
				this.nuovoLuogoObject.cap = datoLuogo.long_name;
			}
			if (datoLuogo.types[0] == 'route') {
				this.nuovoLuogoObject.via = datoLuogo.long_name;
			}

		});
		if(!this.nuovoLuogoObject.via){
			this.nuovoLuogoObject.via= "";
		}
	

	}
	inviaDatiServer(tokenAuth, loader) {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.loader.present();
		try {
			if (!tokenAuth) {
				tokenAuth = "{prova: \"prova\"}";
			}
			console.log(tokenAuth);
			this.nuovoLuogoObject.utente = tokenAuth;



			this.nuovoLuogoObject.localita = this.nuovoLuogoObject.citta;
			this.nuovoLuogoObject.fisso = 'true';
			this.nuovoLuogoObject.aperto = 'true';
			this.nuovoLuogoObject.cercaPostoNew = this.nuovoLuogoObject.ricerca;
			this.nuovoLuogoObject.nome = this.nuovoLuogoObject.ricerca;
			this.nuovoLuogoObject.listaAttivita = this.listaAttivita;
			this.cittaLuogoService.save(this.nuovoLuogoObject).then(data => {

				if (data.status == 200) {
					//andato bene il salvataggio
					let modal = this.modalCtrl.create(Success, { "from": "detail" });
					modal.onDidDismiss(data => {
						this.ricerca();
					});
					if(this.loader){
						this.loader.dismiss();
					}
					modal.present();
				}else {
					alert(JSON.stringify(data))
				}
				if(this.loader){
					this.loader.dismiss();
				}
			});
		} catch (e) {
			this.loader.dismiss();
			alert("error: " + e);
		}
	}


	ricerca() {
		this.cittaLuogoService.localizzaByNome(this.nuovoLuogoObject.citta).then(data => {
			this.navCtrl.push(Ricerca, {
				citta: this.nuovoLuogoObject.citta,
				allSearchPlace: data
			});
		});
	}


	//search del luogo scritto
	loadMapVed(cittaResult) {
		var localizzaRicerca;
		let mapOptions;
		let latLng;

		//	var elem = this.mapElement;
		this.cittaLuogoService.loadMap(this.nuovoLuogoObject.ricerca).then(data => {

			this.riempiOggetto(data);
			localizzaRicerca = data;
			latLng = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
			mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

			var marker = new google.maps.Marker({
				position: latLng,
				map: this.map,
				title: localizzaRicerca.formatted_address
			});

			var infowindow = new google.maps.InfoWindow({
				content: "<span>" + localizzaRicerca.formatted_address + "</span>"
			});
			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(this.map, marker);
			});

		});
	}



	//search del luogo scritto
	loadMap(cittaResult) {
		this.global.inserisciOverlay();
		if (cittaResult == null) {
			cittaResult = this.nuovoLuogoObject.ricerca;
		}
		try {
			var localizzaRicerca;
			let mapOptions;
			let latLng;

			console.log("loadMap " + cittaResult);

			var elem = this.mapElement;
			let geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': cittaResult }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

					localizzaRicerca = results[0];
					latLng = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
					mapOptions = {
						center: latLng,
						zoom: 15,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					this.map = new google.maps.Map(elem.nativeElement, mapOptions);

					var marker = new google.maps.Marker({
						position: latLng,
						map: this.map,
						title: localizzaRicerca.formatted_address
					});

					var infowindow = new google.maps.InfoWindow({
						content: "<span>" + localizzaRicerca.formatted_address + "</span>"
					});
					google.maps.event.addListener(marker, 'click', function () {
						infowindow.open(this.map, marker);
					});

				}
				this.global.togliOverlay();
			 
			});

		} catch (e) {
			this.global.togliOverlay();
			console.log("ERROR  >>>>>>>>>>>>>>> : " + e);
		}
	}




	//localizzazione posizione
	geolocalizza() {

		this.cittaLuogoService.localizza(null).then(data => {
			if (data != "error") {
				this.riempiOggetto(data);
				this.loadMap(null);
			} else {
				this.geolocalizza();
			}
		});
	}
	//carica la mappa in base al risultato da db
	cercaLuogo(luogo) {
		try {
			var localizzaRicerca;

			var geocoder;
			geocoder = new google.maps.Geocoder();
			let latLng = new google.maps.LatLng(luogo.latitudine, luogo.longitudine);


			geocoder.geocode({ 'latLng': latLng }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var add = results[0].address_components;
						let city = add[3];
					} else {
						alert("address not found");
					}
				} else {
					alert("Geocoder failed due to: " + status);
				}
			});


			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


			var marker = new google.maps.Marker({
				position: latLng,
				map: this.map,
				title: luogo.nome
			});
			latLng = null;
			var infowindow = new google.maps.InfoWindow({
				content: "<span>" + luogo.nome + "</span>"
			});
			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(this.map, marker);
			});
		} catch (e) {
			alert("nic" + e);
		}
	}

	back() {
		if (this.loader) {
			this.loader.dismiss();
		}
		this.navCtrl.pop();
	}

	showAddressModal() {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => {
			if (data != null) {
				this.nuovoLuogoObject.ricerca = data.description;
				this.loadMapVed(this.nuovoLuogoObject.ricerca);
			} else {
				return;
			}
		});
		modal.present();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
//https://www.raymondcamden.com/2016/11/17/a-social-example-of-ionic-auth
