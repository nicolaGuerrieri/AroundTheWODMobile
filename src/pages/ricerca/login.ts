import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform   } from 'ionic-angular';
import {Global} from '../../services/global';
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../home/autocomplete';
import { Detail } from '../ricerca/detail';
import { Ricerca } from '../ricerca/Ricerca';
import { FacebookAuth, User, Auth } from '@ionic/cloud-angular';

declare var google: any;

@Component({
  selector: 'login',
  templateUrl: 'ricerca.html',
  providers: [CittaLuogoService]
})
export class Login {
	
	public citta:any;
	public cittaLuogo: any;
	public address:any;
	public loader;
	name:string;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 
	
	constructor(public navCtrl: NavController, public global:Global, public params:NavParams, public user:User, public cittaLuogoService: CittaLuogoService, private modalCtrl: ModalController,  public loading: LoadingController, public plt: Platform, public facebookAuth:FacebookAuth, public auth:Auth) {
			console.log(user);
		 if(user.social && user.social.facebook) {
		  this.name = user.social.facebook.data.full_name;
		} else if(user.social && user.social.twitter) {
		  this.name = user.social.twitter.data.full_name;
		} else {
		  this.name = "Friend";
		}
	}
	

}
