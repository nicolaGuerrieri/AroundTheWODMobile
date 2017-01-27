import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Global} from '../../services/global';
import { Ricerca } from '../ricerca/ricerca';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public citta:String;
	constructor(public navCtrl: NavController, public global:Global) {
			
	}
  
	ricerca(){
		console.log(this.citta);
	    this.navCtrl.push(Ricerca,{
		
		});
	}
}
