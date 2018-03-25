import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, Device } from 'ionic-native';



import { HomePage } from '../pages/home/home';


declare var cordova: any;

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  constructor(platform: Platform) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
 


      StatusBar.styleDefault();
      Splashscreen.hide();

      this.hideSplashScreen();
    });
  }
  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 1000);
    }
  }

  registerBackButtonListener() {


  }
}
