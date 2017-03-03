import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform   } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';
import { Ricerca } from '../ricerca/ricerca';

declare var google: any;

@Component({
  selector: 'detail',
  templateUrl: 'detail.html',
  providers: [CittaLuogoService]
})
export class Detail implements OnInit{
	
	public idLuogo;
	public luogoSelezionato;
	
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController,  public loading: LoadingController, public plt: Platform) {
		
	}
	ngOnInit() {
		this.idLuogo= this.params.get("idLuogo"); 
		this.cercaPerId(this.idLuogo);
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