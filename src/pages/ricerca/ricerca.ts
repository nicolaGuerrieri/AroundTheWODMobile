import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform   } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';
import { Detail } from '../ricerca/detail';

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
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController,  public loading: LoadingController, public plt: Platform) {
		this.citta= params.get("citta"); 
		this.loadCity(this.citta);
		this.address = {
			place: this.citta
		};
		console.log(this.citta);
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
		}
		);
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
		   alert("nic" + e);
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
		   alert("nic" + e);
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
		   alert("nic" + e);
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
		   alert("nic" + e);
		}
	}
	back(){
	    this.navCtrl.pop();
	}
}
