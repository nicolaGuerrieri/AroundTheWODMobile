import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class CittaLuogoService {
	public data:any;
  constructor(public http: Http) {
    console.log('Hello CittaLuogoService Provider');
  }

  load(citta) {
  if (this.data) {
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // this.http.get('http://app.nicolaguerrieri.it:3000/getListaForCity?citta='+citta).map(res =>res.json()).subscribe(data => {
   this.http.get('provaV2/getListaForCity?citta='+ citta).map(res =>res.json()).subscribe(data => {
		
        this.data = data.listaLuoghi;
        resolve(this.data);
      },err => console.error(">>" + err),
        () => console.log('done'));
  });
  
  //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
}
}
