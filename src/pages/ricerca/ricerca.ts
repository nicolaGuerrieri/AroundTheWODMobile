import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Global} from '../../services/global';

@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html'
})
export class Ricerca {

  constructor(public navCtrl: NavController, public global:Global) {
    
  }
	back(){
	    this.navCtrl.pop();
	}
}
