import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform   } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { AutocompletePage } from '../home/autocomplete';
import { Ricerca } from '../ricerca/ricerca';
import { DialogSocial } from '../dialog/dialogSocial';
import { Success } from '../dialog/success';
import { FacebookAuth, User, Auth, GoogleAuth } from '@ionic/cloud-angular';

declare var google: any;
declare var cordova:any;

@Component({
  selector: 'detail',
  templateUrl: 'detail.html',
  providers: [CittaLuogoService]
})
export class Detail implements OnInit{
	
	public idLuogo;
	public nuovoLuogo = false;
	public luogoSelezionato;
	public nuovoLuogoObject:any;
	private _isAndroid: boolean;
	private _isiOS: boolean; 
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController,  public loading: LoadingController, public plt: Platform, public googleAuth:GoogleAuth, public user:User, public facebookAuth:FacebookAuth, public auth:Auth) {
		this._isAndroid = plt.is('android');
		this._isiOS = plt.is('ios');
 	}
	
	
	ngOnInit() {
		
		this.idLuogo= this.params.get("idLuogo"); 
		if(this.idLuogo != -1){
			this.nuovoLuogo = false;
			this.cercaPerId(this.idLuogo);
		}else{
			this.nuovoLuogo = true;
			this.nuovoLuogoObject = {};
			this.nuovoLuogoObject.ricerca = "";
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
			this.geolocalizza();
		}
	}
	
	
	cercaPerId(idLuogoParameter){
		try{
			if(idLuogoParameter == null){
				alert("errore nessun id");
				return;
			}else{
				this.cittaLuogoService.getLuogoForId(idLuogoParameter).then(data => {
					this.luogoSelezionato = data;
					this.cercaLuogo(this.luogoSelezionato);
					 

				});
			}
		}catch (e) {
		   alert("nic" + e);
		}
	
	}
	
	loginGoogle(){ 
		if (this.plt.is('core')) {
			this.inviaDatiServer("asdffasdcvasfdcvasdvvvvvvvvvvvvvv");
		}else{
			this.googleAuth.login().then((success) => {
				alert(success.token);
				this.inviaDatiServer(success.token);
			});

		}
	}
	
	openMapsApp(item) {
		
 		var coords = this.luogoSelezionato.latitudine + "," + this.luogoSelezionato.longitudine;
		if(this._isiOS) {
			window.open("http://maps.apple.com/?q=" + coords, '_system');
			return;
		}
		if(this._isAndroid) {
			window.open("http://maps.google.com/?q=" + coords, '_system');
		return;
		}
		window.open("http://maps.google.com/?q=" + coords, '_system');
		return;
	}
	//- See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-open-native-maps-application-22#sthash.lc4YYgC7.dpuf
	
	validaDati(){
		this.nuovoLuogoObject.errore = null;
		console.log(this.nuovoLuogoObject.ricerca.trim());
		if(this.nuovoLuogoObject.ricerca == undefined || this.nuovoLuogoObject.ricerca.trim()== "" || this.nuovoLuogoObject.ricerca.trim() == undefined){
			this.nuovoLuogoObject.errore = "Insert place";
			return;
		}else if(this.nuovoLuogoObject.citta == undefined || this.nuovoLuogoObject.citta.trim()== "" || this.nuovoLuogoObject.citta.trim() == undefined){
			this.nuovoLuogoObject.errore = "Insert city";
			return;
		}else if(this.nuovoLuogoObject.nazione == undefined || this.nuovoLuogoObject.nazione.trim()== "" || this.nuovoLuogoObject.nazione.trim() == undefined){
			this.nuovoLuogoObject.errore = "Insert nation";
			return;
		}else if(this.nuovoLuogoObject.descrizione == undefined || this.nuovoLuogoObject.descrizione.trim()== "" || this.nuovoLuogoObject.descrizione.trim() == undefined){
			this.nuovoLuogoObject.errore = "Insert description"; 
			return;
		}else if(this.nuovoLuogoObject.attrezzature == undefined || this.nuovoLuogoObject.attrezzature.trim() == "" || this.nuovoLuogoObject.attrezzature.trim() == undefined){
			this.nuovoLuogoObject.errore = "Insert workout equipment ";
			return;
		}	
	}
	
	
	salva(){
		this.validaDati();
		if(this.nuovoLuogoObject.errore){
			return;
		}
		let modal = this.modalCtrl.create(DialogSocial, {"from": "login"});
		modal.onDidDismiss(data => {
		    this.loginGoogle();
	    });
		modal.present();
	}
	
	riempiOggetto(data){
		this.nuovoLuogoObject = {};
		if(!data){
			return;
		}
		console.log(data.geometry);
		if(data.geometry != null){
			this.nuovoLuogoObject.lat = data.geometry.location.lat();
			this.nuovoLuogoObject.longi = data.geometry.location.lng();
		}
		if(data.formatted_address != null){
			this.nuovoLuogoObject.ricerca = data.formatted_address;
		}else if(data.address_components[1]){
			this.nuovoLuogoObject.ricerca = data.address_components[1].long_name;
		}else if(data.address_components[2]){
			this.nuovoLuogoObject.ricerca = data.address_components[2].long_name;
		}
		data.address_components.forEach((datoLuogo: any) => {
			if(datoLuogo.types[0] == 'locality'){
				this.nuovoLuogoObject.citta = datoLuogo.long_name;
			} 
			if(datoLuogo.types[0] == 'administrative_area_level_3'){
				this.nuovoLuogoObject.provincia = datoLuogo.long_name;
			} 
			if(datoLuogo.types[0] == 'country'){
				this.nuovoLuogoObject.nazione = datoLuogo.long_name;
			} 
			if(datoLuogo.types[0] == 'postal_code'){
				this.nuovoLuogoObject.cap = datoLuogo.long_name;
			} 
			if(datoLuogo.types[0] == 'route'){
				this.nuovoLuogoObject.via = datoLuogo.long_name;
			} 
			
		});
	}
	inviaDatiServer(tokenAuth){
		try{
			if(!tokenAuth){
				alert("No token");
				return;
			}	
			console.log(tokenAuth);
			this.nuovoLuogoObject.utente = tokenAuth;   
			 
		
			
			this.nuovoLuogoObject.localita = this.nuovoLuogoObject.citta;
			this.nuovoLuogoObject.fisso = 'true'; 
			this.nuovoLuogoObject.aperto = 'true'; 
			this.nuovoLuogoObject.cercaPostoNew =   this.nuovoLuogoObject.ricerca; 
			this.nuovoLuogoObject.nome = this.nuovoLuogoObject.ricerca; 
			this.cittaLuogoService.save(this.nuovoLuogoObject).then(data => {
				if(data.status == 200){
					//andato bene il salvataggio
						let modal = this.modalCtrl.create(Success, {"from": "detail"});
						modal.onDidDismiss(data => {
							 this.ricerca();
						});
						modal.present();
				}
			});
		} catch (e) {
		   alert("error: " + e);
		}
	}
	
	ricerca(){
		var navOptions = {
			animation: 'ios-transition'
		};
		if(this.nuovoLuogoObject.ricerca){
			this.navCtrl.push(Ricerca,{
				citta: this.nuovoLuogoObject.ricerca
			});
		}else{
			console.log("bloccato");
			return;
		}
	}
	
	//search del luogo scritto
	loadMapVed(cittaResult){
		var localizzaRicerca;
		let mapOptions;
		let latLng;
		
		//	var elem = this.mapElement;
		this.cittaLuogoService.loadMap(this.nuovoLuogoObject.ricerca).then(data => {
			 
			this.riempiOggetto(data);
			localizzaRicerca=  data; 
			console.log(localizzaRicerca);
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
			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.open(this.map,marker);
			});
			
		});
	}
	
	
	
	//search del luogo scritto
	loadMap(cittaResult){
	
		if(cittaResult == null){
			cittaResult= this.nuovoLuogoObject.ricerca;
		}
		try {
			var localizzaRicerca;
			let mapOptions;
			let latLng;
			
			console.log("loadMap " +  cittaResult);

				var elem = this.mapElement;
				let geocoder =  new google.maps.Geocoder();
				geocoder.geocode({ 'address': cittaResult}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						
						localizzaRicerca=  results[0]; 
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
						google.maps.event.addListener(marker, 'click', function() {
						  infowindow.open(this.map,marker);
						});
						
					}
				});


     	} catch (e) {
		   alert("error: " + e);
		}
	}
	
	
	
	
	//localizzazione posizione
	geolocalizza(){
		let loader = this.loading.create({
			content: 'Please wait...',
		});
		loader.present();
		this.cittaLuogoService.localizza(loader).then(data => {
			if(data != "error"){
				this.riempiOggetto(data);	
				this.loadMap(null);
			}
			loader.dismiss();
		});
	}
	//carica la mappa in base al risultato da db
	cercaLuogo(luogo){
		try {
			var localizzaRicerca;

			var geocoder;
			geocoder = new google.maps.Geocoder();
			var elem = this.mapElement;
			let latLng = new google.maps.LatLng(luogo.latitudine, luogo.longitudine);
		
		
			geocoder.geocode({'latLng': latLng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var add= results[0].address_components;
						let city=add[3];
					} else  {
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
			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.open(this.map, marker);
			});
		} catch (e) {
		   alert("nic" + e);
		}
	}
	
	back(){
	    this.navCtrl.pop();
	}
}
//https://www.raymondcamden.com/2016/11/17/a-social-example-of-ionic-auth