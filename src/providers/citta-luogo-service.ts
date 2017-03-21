import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
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
	save(luogo) {
		if(!luogo){
			alert("errore luogo service");
			return;
		}
		this.data = null;
		if (this.data) {
			return Promise.resolve(this.data);
		}

		  // don't have the data yet
		return new Promise(resolve => {
			let body = JSON.stringify(luogo);
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this.http.post(this.preUrl + 'users/upload', body, options).map(res => res.json()).subscribe(data => {
					resolve(data);
				  },err => console.error(">>" + err),() => console.log('done'));
	    });
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
					}else{
						alert("error");
					}
				}
			});
		
		},(error) => {
			alert("Please enable GPS localization");
			resolve("error");
		});
	});
		  
	  //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
	}
	
	loadMap(cittaResult){
		if (this.dataLocalizzazione) {
			alert("mica qui");
			return Promise.resolve(this.dataLocalizzazione);
		 }
		return new Promise(resolve => {
			try {
	
				console.log("loadMap " +  cittaResult);
				let geocoder =  new google.maps.Geocoder();
				geocoder.geocode({ 'address': cittaResult}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					 
					if (results[0]) {
						
						this.dataLocalizzazione =results[0];
						resolve(this.dataLocalizzazione);
					}else{
						alert("error");
					}
				}
				});


			} catch (e) {
			   alert("error: " + e);
			}
		
		});
	}
}
