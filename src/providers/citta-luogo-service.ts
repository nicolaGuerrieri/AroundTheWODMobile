import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Platform  } from 'ionic-angular';

 
declare var google: any;

@Injectable()
export class CittaLuogoService {
	public data:any;
	public preUrl = "";
	public dataLocalizzazione:any;
	constructor(public http: Http, public platform: Platform) {
		if (this.platform.is('core')) {
			this.preUrl = 'provaV2/';
		}else{
			this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
		}
	}

	load(citta) {
		this.data = null;
		if (this.data) {
			return Promise.resolve(this.data);
		}

		  // don't have the data yet
		  return new Promise(resolve => {
				this.http.get(this.preUrl + 'getListaForCity?citta='+ citta).map(res =>res.json()).subscribe(data => {
				this.data = data.listaLuoghi;
				resolve(this.data);
			  },err => console.error(">>" + err),
				() => console.log('done'));
		  });
		  //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
	}
	getLuogoForId(idLuogo) {
		this.data = null;
		if (this.data) {
			return Promise.resolve(this.data);
		}

		  // don't have the data yet
		return new Promise(resolve => {
			this.http.get(this.preUrl+'getLuogoById?idLuogo='+idLuogo).map(res =>res.json()).subscribe(data => {
				
				this.data = data.luogo;
				resolve(this.data);
			  },err => console.error(">>" + err),
				() => console.log('done'));
		});
	}
	localizza() {
	  if (this.dataLocalizzazione) {
		alert("mica qui");
		return Promise.resolve(this.dataLocalizzazione);
	  }

	  return new Promise(resolve => {
		var geocoder;
		geocoder = new google.maps.Geocoder();
		Geolocation.getCurrentPosition().then((position) => {
			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			geocoder.geocode({'latLng': latLng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						
						this.dataLocalizzazione =results[0];
						resolve(this.dataLocalizzazione);
					}
				}
			});
		
		});
		});
		  
	  //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
	}
}
