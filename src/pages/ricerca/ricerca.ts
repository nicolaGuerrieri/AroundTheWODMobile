import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';

declare var google: any;

@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html',
  providers: [CittaLuogoService]
})
export class Ricerca {
	
	public citta:any;
	public cittaLuogo: any;
	public address:any;
	
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController) {
		this.citta= params.get("citta"); 
		
		this.loadCity((this.citta) ? this.citta.split(",")[0] : null);
		this.address = {
		  place: this.citta
		};
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
	loadMap33(){
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
					alert("city name is: " + city.long_name);
					//.loadCity(city.long_name);
					console.log(this);
				} else  {
					alert("address not found");
				}
			} else {
				alert("Geocoder failed due to: " + status);
			}
		}
		);
		let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
 
		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
		//this.addMarker();
	}, (err) => {
	  console.log(err);
	});
	 
	} 
	
	getMapElement(){
		return this.mapElement;
	}

	loadMap(cittaResult){
	try {
		var localizzaRicerca;
		let mapOptions;
		let latLng;
		
		
		if(cittaResult == null){
			return;
		}
		if(cittaResult.length > 0){
			latLng = new google.maps.LatLng(cittaResult[0].latitudine, cittaResult[0].longitudine);
			mapOptions = {
			  center: latLng,
			  zoom: 10,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			cittaResult.forEach((cittaLuogoItem: any) => {
			 
			
				latLng = new google.maps.LatLng(cittaLuogoItem.latitudine, cittaLuogoItem.longitudine); 

				// Creating a marker and putting it on the map
				var marker = new google.maps.Marker({
					position: latLng,
					map: this.map,
					title: cittaLuogoItem.nome
				});
				latLng = null;	
				
			
			});
		}else{
			var elem = this.mapElement;
			if(this.address.place){
				var geocoder =  new google.maps.Geocoder();
				geocoder.geocode( { 'address': this.address.place}, function(results, status) {
				  if (status == google.maps.GeocoderStatus.OK) {
					localizzaRicerca=  results[0];
					console.log(localizzaRicerca);
					//rifaccio dato che ci mette un pò
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
					latLng = null;	
					
				  } else {
					alert("Something got wrong " + status);
				  }
			});
			
		}		
		
		}
	}
    catch (e) {
       alert("nic" + e);
    }
		
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
		   alert("nic" + e);
		}
			
	}
	
	selectPlace(idPlace){
		alert(idPlace);
	}
	
	loadCity(cittaP){
		try{
			if(cittaP == null){
				cittaP = this.loadMap33();
			}else{
				alert("loadCity" + cittaP);
				this.cittaLuogoService.load(cittaP).then(data => {
					
					this.cittaLuogo = data;
					this.loadMap(this.cittaLuogo);
				});
			}
		}catch (e) {
		   alert("nic" + e);
		}
	}
	back(){
	    this.navCtrl.pop();
	}
}
