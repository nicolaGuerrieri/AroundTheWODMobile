import { Component } from '@angular/core';
import { Platform, Alert } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';


declare var  cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
 
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
		StatusBar.styleDefault();
		Splashscreen.hide();
		//this.registerBackButtonListener();
		
		if (!platform.is('core')) {
			cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
				if(!enabled){
					alert("Please enable GPS location");
				    cordova.plugins.diagnostic.switchToLocationSettings();
				}
			});			 
		}
    });
  }
  
	registerBackButtonListener() {
		document.addEventListener('backbutton', () => {
			navigator['app'].exitApp();   
		});
	}
}
