import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform   } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation, SocialSharing} from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';
import { Detail } from '../ricerca/detail';
import { DialogSocial } from '../dialog/dialogSocial';
import { FacebookAuth, User, Auth } from '@ionic/cloud-angular';
import { Login } from '../ricerca/login';

declare var google: any;
declare var cordova:any;
@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html',
  providers: [CittaLuogoService]
})
export class Ricerca {
	
	public citta:any;
	
	public cittaLuogo: any;
	public address:any;

	public loader;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
    public url  : string = 'www.aroundTheWOD.com';
    public message  : string = 'hey guys, i share new location on AroundTheWOD app...look here ' + this.url;

	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public user:User, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController,  public loading: LoadingController, public plt: Platform, public facebookAuth:FacebookAuth, public auth:Auth) {
		this.citta= params.get("citta"); 
		this.loadCity(this.citta);
		this.address = {
			place: this.citta
		};
	 
	}
 
	doInstagram() {
		var full_name;
		try{
			console.log('do FB');
			//this.facebookAuth.login().then(() => {
			//this.auth.login('facebook').then(() => {
			//	  this.navCtrl.setRoot(Login);
			
			SocialSharing.shareViaInstagram(this.message, this.url).then((data) => {
				alert(data);
			}).catch(() => {
			  // Error!
			});
			 
			
		}catch (e) {
		   alert("nic" + e);
		}
	}
	
	addPlace(){
		this.navCtrl.push(Detail,{
			idLuogo: -1
		});
	} 
	
	doShare() {
		var full_name;
		try{
			console.log('do FB');
			//this.facebookAuth.login().then(() => {
			//this.auth.login('facebook').then(() => {
			//	  this.navCtrl.setRoot(Login);
			
			SocialSharing.share(this.message, null, null, this.url).then((data) => {
				alert(data);
			}).catch(() => {
			  // Error!
			});
			 
			
		}catch (e) {
		   alert("nic" + e);
		}
	}
	doFacebook() {
		var full_name;
		try{
			SocialSharing.shareViaFacebookWithPasteMessageHint(this.message, null, null, this.url).then((result) => {
				alert(result);
			}).catch(() => {
			  alert("Error please contact AroundTheWOD support");
			});
			 
			
		}catch (e) {
		   alert("nic" + e);
		}
	}
	doTwitter() {
		var full_name;
		try{
			SocialSharing.shareViaTwitter(this.message, null, this.url).then((result) => {
				alert(result);
			}).catch(() => {
			  alert("Error please contact AroundTheWOD support");
			});
			 
			
		}catch (e) {
		   alert("nic" + e);
		}
	}
 
	ngAfterViewInit() {
		try {
		   this.loadMap(null);
		}
		catch (e) {
		  alert("error" + e);
		}
		
	}
	
	//load with position
	loadGeolocalization(){
		var geocoder;
		geocoder = new google.maps.Geocoder();
		Geolocation.getCurrentPosition().then((position) => {
		console.log(position);
		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		
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
		}, (err) => {
		  console.log(err);
		});
	 
	} 
	
	getMapElement(){
		return this.mapElement;
	}

	geolocalizza(){
		let loader = this.loading.create({
			content: 'Please wait...',
		});
		loader.present();
		if (this.plt.is('core')) {
			this.cittaLuogoService.localizza().then(data => {
				if(data.address_components[2]){
					this.address.place = data.address_components[2].long_name;
					this.ricerca(); 
					loader.dismiss();
				}
			});
		}else{
			cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
				if(!enabled){
					alert("Please enable GPS localization");
					loader.dismiss();
					return;
				}
			});
				
			this.cittaLuogoService.localizza().then(data => {
				if(data.address_components[2]){
					this.address.place = data.address_components[2].long_name;
					this.ricerca(); 
					loader.dismiss();
				}
			});
		} 
	}
	

	loadMap(cittaResult){
		try {
			var localizzaRicerca;
			let mapOptions;
			let latLng;
			
			console.log("loadMap " + this.address.place);
			
			var elem = this.mapElement;
			var geocoder =  new google.maps.Geocoder();
			geocoder.geocode( { 'address': this.address.place}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				
					localizzaRicerca=  results[0];
					
					latLng = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
					mapOptions = {
					  center: latLng,
					  zoom: 10,
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
					if(cittaResult != null){
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
							google.maps.event.addListener(marker, 'click', function() {
							  infowindow.open(this.map, marker);
							});
							
						});
					}
					
				
				}
			});
		} catch (e) {
		   alert("error: " + e);
		}
	}
	
	
	showAddressModalR () {
		let modal = this.modalCtrl.create(AutocompletePage);
		let me = this;
		modal.onDidDismiss(data => {
			if(data != null){
				console.log(data);
				this.address.place = data.split(",")[0];
			}else{
				return;
			}
		  
			this.ricerca();
		});
		modal.present();
	}
	ricerca(){
		try{
			if(this.address.place != ""){
				this.navCtrl.push(Ricerca,{
					citta: this.address.place
				});
			}else{
				console.log("bloccato");
				return;
			}
		}catch (e) {
		   alert("error: " + e);
		}
			
	}
	
	selectPlace(idPlace){
		try{
			if(this.address.place != ""){
				this.navCtrl.push(Detail,{
					idLuogo: idPlace
				});
			}else{
				console.log("bloccato");
				return;
			}
		}catch (e) {
		   alert("error: " + e);
		}
	}
	
	loadCity(cittaP){
		 
		try{
			if(cittaP == null){
				
				cittaP = this.loadGeolocalization();
			}else{
				this.cittaLuogoService.load(cittaP).then(data => {
					
					this.cittaLuogo = data;
					this.loadMap(this.cittaLuogo);
				});
			}
		}catch (e) {
		   alert("error: " + e);
		}
	}
	back(){
	    this.navCtrl.pop();
	}
}
