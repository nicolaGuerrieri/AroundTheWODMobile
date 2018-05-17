import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ActionSheetController, Content } from 'ionic-angular';
import { Global } from '../../services/global';
import { CittaLuogoService } from '../../providers/citta-luogo-service';
import { Geolocation, SocialSharing } from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';
import { Detail } from '../ricerca/detail';
import { Organizzazioni } from '../ricerca/organizzazioni';
import { DialogSocial } from '../dialog/dialogSocial';
import { FacebookAuth, User, Auth } from '@ionic/cloud-angular';
import { Footer } from '../ricerca/footer';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

declare var google: any;
declare var cordova: any;
@Component({
	selector: 'ricerca',
	templateUrl: 'ricerca.html',
	providers: [CittaLuogoService]
})
export class Ricerca {

	public citta: any;
	@ViewChild(Content) content: Content;
	public cittaLuogo: any;
	public address: any;
	public cercaOrga;
	public allSearchPlace: any;
	public loader;
	public options: any;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	public url: string = 'www.aroundTheWOD.com';
	public message: string = 'hey guys, i share new location on AroundTheWOD app...look here ' + this.url;


	public listaAttivita: any;


	constructor(public actionSheetCtrl: ActionSheetController, private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public global: Global, public params: NavParams, public user: User, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController, public loading: LoadingController, public plt: Platform, public facebookAuth: FacebookAuth, public auth: Auth) {
		this.options = global.getOptionTransition();
		this.loadAttivita();
		this.cittaLuogo = [];
		this.citta = params.get("citta");
		this.allSearchPlace = params.get("allSearchPlace");
		this.address = {
			citta: this.citta,
			place: this.citta
		};
		this.loadCity(this.citta);



	}


	abuso(id){
		var oggetto = {id_object: id}
		this.cittaLuogoService.salvaUtente(oggetto).then(data => { 
			alert("Grazie, la tua segnalazione è in fase di elaborazione, se più utenti segnalano lo stesso elemento, questo verrà analizzato ed eventualmente rimosso.");
		});
	}
	loadAttivita() {
		this.cittaLuogoService.loadAttivita().then(data => {
			this.listaAttivita = data;
		});
	}
	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Menu',
			buttons: [
				{
					text: 'Change your search',
					icon: 'md-search',
					handler: () => {
						this.showAddressModalR();
					}
				}, {
					text: 'Locate your position',
					role: 'locate',
					icon: 'md-pin',
					handler: () => {
						this.geolocalizza();
					}
				}, {
					text: 'AroundTheWOD Community',
					role: 'Friends',
					icon: 'md-contacts',
					handler: () => {
						this.organizzazioni();
					}
				}
			]
		});
		actionSheet.present();
	}
/**text: 'Share your experience',
					role: 'Share',
					icon: 'md-share',
					handler: () => {
						this.share();
					}
				}, { */
	share() {
		let modal = this.modalCtrl.create(DialogSocial, { "from": "social" });
		modal.present();
	}


	addPlace() {
		this.nativePageTransitions.slide(this.options);

		this.navCtrl.push(Detail, {
			idLuogo: -1
		});
	}

	doShare() {
		try {
			console.log('do FB');
			//this.facebookAuth.login().then(() => {
			//this.auth.login('facebook').then(() => {
			//	  this.navCtrl.setRoot(Login);

			SocialSharing.share(this.message, null, null, this.url).then((data) => {
				alert(data);
			}).catch(() => {
				// Error!
				// Error!
			});


		} catch (e) {
			alert("nic" + e);
		}
	}

	ngAfterViewInit() {
		try {
			if (this.address) {
				//  this.address.place = null;
			}
			//this.loadMapWithPlace(null);
		}
		catch (e) {
			alert("error" + e);
		}

	}
	scrollToBottom() {
		this.content.scrollToBottom();
	}

	//load with position
	loadGeolocalization() {
		var geocoder;
		geocoder = new google.maps.Geocoder();
		Geolocation.getCurrentPosition().then((position) => {
			console.log(position);
			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			geocoder.geocode({ 'latLng': latLng }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
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
		}, (err) => {
			console.log(err);
		});

	}

	getMapElement() {
		return this.mapElement;
	}

	geolocalizza() {
		this.loader = this.loading.create({
			content: 'Please wait...',
		});
		this.loader.present();
		this.cittaLuogoService.localizza(this.loader).then(data => {
			if (data != "error") {
				if (data.formatted_address != null) {
					this.address.place = data.formatted_address;
				} else if (data.address_components[1]) {
					this.address.place = data.address_components[1].long_name;
				} else if (data.address_components[2]) {
					this.address.place = data.address_components[2].long_name;
				}

				console.log(data)
				this.allSearchPlace = data;
				this.ricerca(true);
			}
			if (this.loader) {
				this.loader.dismiss();
			}
		});

	}


	loadMapWithPlace(cittaResult) {
		try {
			var localizzaRicerca;
			let mapOptions;
			let latLng;

			console.log("loadMap " + this.address.place);

			var elem = this.mapElement;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': this.address.place }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

					localizzaRicerca = results[0];

					latLng = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
					mapOptions = {
						center: latLng,
						zoom: 12,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					this.map = new google.maps.Map(elem.nativeElement, mapOptions);

					var marker = new google.maps.Marker({
						position: latLng,
						map: this.map,
						icon: { url : 'assets/images/point.png'
					 },
						title: localizzaRicerca.formatted_address
					});

					var infowindow = new google.maps.InfoWindow({
						content: "<span>" + "Posizione attuale: " + localizzaRicerca.formatted_address + "</span>"
					});
					google.maps.event.addListener(marker, 'click', function () {
						infowindow.open(this.map, marker);
					});
					if (cittaResult != null) {
						cittaResult.forEach((cittaLuogoItem: any) => {
							latLng = new google.maps.LatLng(cittaLuogoItem.latitudine, cittaLuogoItem.longitudine);

							// Creating a marker and putting it on the map
							var marker = new google.maps.Marker({
								position: latLng,
								map: this.map,
								title: cittaLuogoItem.nome
							});
							latLng = null;
							var infowindow = new google.maps.InfoWindow({
								content: "<span>" + cittaLuogoItem.nome + "</span>"
							});
							google.maps.event.addListener(marker, 'click', function () {
								infowindow.open(this.map, marker);
							});
							if (this.loader) {
								this.loader.dismiss();
							}
						});
					}
				}
			});

		} catch (e) {
			if (this.loader) {
				this.loader.dismiss();
			}
			alert("error: " + e);
		}
	}
	ricerca(flagPresent) {
		this.nativePageTransitions.slide(this.options);

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

	showAddressModalR() {
		let modal = this.modalCtrl.create(AutocompletePage);
		modal.onDidDismiss(data => {
			if (data != null) {
				console.log("showAddressModalR " + data);
				this.address.place = data.description;
			} else {
				return;
			}
			this.allSearchPlace = data;
			this.ricerca(false);
		});
		modal.present();

	}
	ricerca2() {
		try {
			if (this.address.place != "") {
				this.navCtrl.push(Ricerca, {
					citta: this.address.place,
					allSearchPlace: this.allSearchPlace
				});
			} else {
				console.log("bloccato");
				return;
			}
		} catch (e) {
			alert("error: " + e);
		}

	}
	organizzazioni() {
		this.nativePageTransitions.slide(this.options);

		try {
			if (this.address.place != "") {
				this.navCtrl.push(Organizzazioni, {
					citta: this.address.citta
				});
			} else {
				console.log("bloccato");
				return;
			}
		} catch (e) {
			alert("error: " + e);
		}

	}

	selectPlace(idPlace) {
		this.nativePageTransitions.slide(this.options);

		try {
			if (this.address.place != "") {
				this.navCtrl.push(Detail, {
					idLuogo: idPlace
				});
			} else {
				console.log("bloccato");
				return;
			}
		} catch (e) {
			alert("error: " + e);
		}
	}

	loadCity(cittaP) {
		try {
			this.loader = this.loading.create({
				content: 'Please wait...',
			});
			this.loader.present();
			console.log(this.allSearchPlace);
			this.address.place = "";
			if (this.allSearchPlace.address_components) {
				this.address.place = "";
				for (var i = 0; i < this.allSearchPlace.address_components.length; i++) {
					if (this.allSearchPlace.address_components[i].types[0] == "street_number") {
						this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";
					}
					if (this.allSearchPlace.address_components[i].types[0] == "route") {
						this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";
					}
					if (this.allSearchPlace.address_components[i].types[0] == "locality") {
						this.address.citta = this.allSearchPlace.address_components[i].long_name;
						this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";

					}
				}

			}


			this.cittaLuogoService.load(this.address.citta).then(data => {
				this.cittaLuogo = data;
				this.loadMapWithPlace(this.cittaLuogo);
				if (this.loader) {
					this.loader.dismiss();
				}
			});
		} catch (e) {
			alert("error: " + e);
		}
	}



	back() {
		if (this.loader) {
			this.loader.dismiss();
		}
		this.navCtrl.popToRoot();
	}
}
