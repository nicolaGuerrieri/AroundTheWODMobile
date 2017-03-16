import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ViewController} from 'ionic-angular';
import {Global} from '../../services/global'; 
import {SocialSharing} from 'ionic-native'; 
import { Detail } from '../ricerca/detail';
import { FacebookAuth, User, Auth, GoogleAuth } from '@ionic/cloud-angular';
import { Login } from '../ricerca/login';

declare var google: any;
declare var cordova:any;
@Component({
  selector: 'dialogSocial',
  templateUrl: 'dialogSocial.html',
})
export class DialogSocial {
	
	public citta:any;
	
	public cittaLuogo: any;
	public address:any;

	public loader;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
    public url  : string = 'www.aroundTheWOD.com';
    public message  : string = 'hey guys, i share new location on AroundTheWOD app...look here www.aroundTheWOD.com';
	
	
	public from:String;
		
	constructor(public navCtrl: NavController, public global:Global, public viewCtrl:ViewController, public params:NavParams, public user:User, private modalCtrl: ModalController,  public loading: LoadingController, public googleAuth:GoogleAuth, public plt: Platform, public facebookAuth:FacebookAuth, public auth:Auth) {
		this.from = this.params.get("from");
	 
	}
	dismiss() {
		this.viewCtrl.dismiss();
	}
	doInstagram() { 
		alert("passa di qua");
		this.googleAuth.login().then((success) => {
			alert(JSON.stringify(success));
		});
	}
//	https://forum.ionicframework.com/t/ionic-2-ionic-cloud-auth-google-auth-failing-12501/72967/3
		
	doShare() {
		var full_name;
		try{
			console.log('do FB');
			//this.facebookAuth.login().then(() => {
			//this.auth.login('facebook').then(() => {
			//	  this.navCtrl.setRoot(Login);
			
			SocialSharing.share(this.message, null, null, this.url).then((data) => {
				alert(data);
			}).catch(() => {
			  // Error!
			});
			 
			
		}catch (e) {
		   alert("error: " + e);
		}
	}
	doFacebook() {
		var full_name;
		try{
			SocialSharing.shareViaFacebookWithPasteMessageHint(this.message, null, null, this.url).then((result) => {
				alert(result);
			}).catch(() => {
			  alert("Error please contact AroundTheWOD support");
			});
			 
			
		}catch (e) {
		   alert("error: " + e);
		}
	}
	doTwitter() {
		var full_name;
		try{
			SocialSharing.shareViaTwitter(this.message, null, this.url).then((result) => {
				alert(result);
			}).catch(() => {
			  alert("Error please contact AroundTheWOD support");
			});
			 
			
		}catch (e) {
		   alert("error: " + e);
		}
	}
 
		back(){
	    this.navCtrl.pop();
	}
}
