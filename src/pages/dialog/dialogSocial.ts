import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Platform, ViewController} from 'ionic-angular';
import {Global} from '../../services/global'; 
import {SocialSharing} from 'ionic-native'; 
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
    public subject  : string = 'AroundTheWOD App';
    public message  : string = 'Hey guys, i share new location on AroundTheWOD app...look on site';
	public image    : string	= 'http://app.nicolaguerrieri.it:3000/images/ket.jpg'; 

	
	public from:String;
		
	constructor(public navCtrl: NavController, public global:Global, public viewCtrl:ViewController, public params:NavParams, public user:User, private modalCtrl: ModalController,  public loading: LoadingController, public googleAuth:GoogleAuth, public platform: Platform, public facebookAuth:FacebookAuth, public auth:Auth) {
		this.from = this.params.get("from");
	 
	}
	
	loginGoogle(){
		this.viewCtrl.dismiss("google");
	}
	
	dismiss() {
		this.viewCtrl.dismiss();
	}
	doInstagram() { 
	   this.platform.ready() .then(() =>		  {
			 SocialSharing.shareViaInstagram(this.message, this.image)
			 .then((data) => {
				console.log('Shared via shareViaInstagram');
			 }) .catch((err) => {
				alert('Was not shared via Instagram' + err);
			 });

		  });
   }
//	https://forum.ionicframework.com/t/ionic-2-ionic-cloud-auth-google-auth-failing-12501/72967/3
	
	doSharePicker(){
      this.platform.ready()
      .then(() =>
      {
         SocialSharing.share(this.message, this.subject, this.image, this.url)
         .then((data) =>
         {
            console.log('Shared via SharePicker');
         })
         .catch((err) =>
         {
            	alert('Not able to be shared via SharePicker ' + err);
         });

      });
   }
   
	doShare() { 
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
			SocialSharing.shareViaFacebookWithPasteMessageHint(this.message, this.image, this.url, this.message).then((data) =>{
			   alert('Shared via Facebook');
			}).catch((err) =>			{
			   alert('Was not shared via Facebook');
			});
		});
	}
	doTwitter() {
		//this.platform.ready()
		//	.then(() =>{
		//		SocialSharing.canShareVia('com.apple.social.twitter', this.message, this.image, this.url).then((data) =>{

			SocialSharing.shareViaTwitter(this.message, this.image, this.url).then((result) => {
					 
			}).catch((err) =>{
				alert('Not able to be shared via twitter ' + err);
			});
			 
			
		//	});
				//		}).catch(() => {
		//		  alert("Error please contact AroundTheWOD support");
		//		});
		
	}
 
		back(){
	    this.navCtrl.pop();
	}
}
