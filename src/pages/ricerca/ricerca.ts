import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html',
  providers: [CittaLuogoService]
})
export class Ricerca {
  public citta:any;
  public cittaLuogo: any;
  constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public cittaLuogoService: CittaLuogoService) {
		this.citta= params.get("citta"); 
		this.loadCity(this.citta.split(",")[0]);
  }
	loadCity(cittaP){
		this.cittaLuogoService.load(cittaP).then(data => {
					console.log(data);

			this.cittaLuogo = data;
		});
	}
	back(){
	    this.navCtrl.pop();
	}
}
