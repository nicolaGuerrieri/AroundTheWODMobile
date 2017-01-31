import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Global} from '../../services/global';

@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html'
})
export class Ricerca {
  public citta:any;
  constructor(public navCtrl: NavController, public global:Global, public params:NavParams) {
		this.citta= params.get("citta");
  }
	back(){
	    this.navCtrl.pop();
	}
}
