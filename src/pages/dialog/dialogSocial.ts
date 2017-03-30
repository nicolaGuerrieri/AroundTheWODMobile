import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ViewController} from 'ionic-angular';
import {Global} from '../../services/global'; 
import {SocialSharing} from 'ionic-native'; 
import {CittaLuogoService} from '../../providers/citta-luogo-service';
import {FacebookAuth, User, Auth, GoogleAuth } from '@ionic/cloud-angular';
import { Login } from '../ricerca/login';

declare var google: any;
declare var cordova:any;
@Component({
  selector: 'dialogSocial',
  templateUrl: 'dialogSocial.html',
  providers: [CittaLuogoService]
})
export class DialogSocial {
	
	public citta:any;
	
	public cittaLuogo: any;
	public address:any;

	public loader;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
    public url  : string = 'www.aroundTheWOD.com';
    public subject  : string = 'AroundTheWOD App';
    public message  : string = 'Hey guys, i share new location on AroundTheWOD app...look on site';
	public image    : string	= 'http://app.nicolaguerrieri.it:3000/images/ket.jpg'; 

	
	public from:String;
		
	constructor(public navCtrl: NavController, public global:Global, public viewCtrl:ViewController, public params:NavParams, public user:User, private modalCtrl: ModalController,  public loading: LoadingController, public googleAuth:GoogleAuth, public platform: Platform, public facebookAuth:FacebookAuth, public auth:Auth, public cittaLuogoService: CittaLuogoService,) {
		this.from = this.params.get("from");
	 
	}
	
	loginGoogle(){
		this.viewCtrl.dismiss("google");
	}
	

	loginSocial(data){
		let loader = this.loading.create({
			content: 'Please wait...',
		});
		loader.present();
		this.cittaLuogoService.loginSocial(data).then(data => {
			if(data){
				alert(JSON.stringify(data));	
				loader.dismiss();
			}
		});
	}
	
	//f33b26b8
	dismiss() {
		this.viewCtrl.dismiss();
	}
	doInstagram() { 
	   this.platform.ready().then(() => {
			SocialSharing.shareViaInstagram(this.message, this.image) 
			 .then((data) => {
				console.log('Shared via shareViaInstagram');
			 }) .catch((err) => {
				alert('Was not shared via Instagram' + err);
			 }); 
		});
   }

   loginInstagram(){  
		this.viewCtrl.dismiss("instagram");
   }
   loginFacebook(){
   		this.viewCtrl.dismiss("facebook");  		
   } 
  
//facebook android
//   ionic plugin add cordova-plugin-facebook4 --save --variable APP_ID="1116576615134600" --variable APP_NAME="aroundTheWodMobile"
//google ios
//   cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID="com.googleusercontent.apps.923547097240-eqmutiom8bvb95u9bjv14vg410cpd5gm"

//	https://forum.ionicframework.com/t/ionic-2-ionic-cloud-auth-google-auth-failing-12501/72967/3	
  
	doShare() { 
		alert("do share")
		try{
			SocialSharing.share(this.message, this.subject, this.image, this.url).then((data) => {
				 
			}).catch((err) => {
			  alert('Not able to be shared ' + err);
			});
		}catch (e) {
		   alert("error: " + e);
		}
	}
	doFacebook() {
		this.platform.ready().then(() => {
			SocialSharing.shareViaFacebookWithPasteMessageHint(this.message, null, this.url, 'Prova testo').then((data) =>{
			 
			}).catch((err) =>			{
			   alert('Was not shared via Facebook');
			});
		});
	}
	doTwitter() {
		SocialSharing.shareViaTwitter(this.message, this.image, this.url).then((result) => {
				 
		}).catch((err) =>{
			alert('Not able to be shared via twitter ' + err);
		});
	}
 
		back(){
	    this.navCtrl.pop();
	}
}
