import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation } from 'ionic-native';
 
declare var google: any;

@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html',
  providers: [CittaLuogoService]
})
export class Ricerca {
	
	public citta:any;
	public cittaLuogo: any;
	
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService) {
		this.citta= params.get("citta"); 
		this.loadCity(this.citta.split(",")[0]);
	}
	
	
	ngAfterViewInit() {
		this.loadMap(null);
	}
	
	//load with position
	loadMap33(){
		Geolocation.getCurrentPosition().then((position) => {
	 
		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
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
	
	loadMap(cittaResult){
		if(cittaResult == null){
			return;
		}
		console.log(cittaResult.size);
		if(cittaResult.length > 0){
			let latLng = new google.maps.LatLng(cittaResult[0].latitudine, cittaResult[0].longitudine);
			let mapOptions = {
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
		}
	}
	
	loadCity(cittaP){
		this.cittaLuogoService.load(cittaP).then(data => {
			this.cittaLuogo = data;
			this.loadMap(this.cittaLuogo);
		});
		
	}
	back(){
	    this.navCtrl.pop();
	}
}
