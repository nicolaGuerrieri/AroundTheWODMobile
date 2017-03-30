import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
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
		this.registerBackButtonListener();
		
		
    });

  }
  
	registerBackButtonListener() {
		
			let nav = app.getActiveNav();
			let activeView: ViewController = nav.getActive();

			if(activeView != null){
			  if(nav.canGoBack()) {
				nav.pop();
			  }else if (typeof activeView.instance.backButtonAction === 'function')
				activeView.instance.backButtonAction();
			  else nav.parent.select(0); // goes to the first tab
			}
		
	}
}
