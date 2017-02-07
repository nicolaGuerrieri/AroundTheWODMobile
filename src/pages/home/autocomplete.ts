import { Component, NgZone, ViewChild } from '@angular/core';

import { ViewController, Searchbar } from 'ionic-angular';
declare var google: any;

@Component({
  templateUrl: 'autocomplete.html'
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();

  @ViewChild('citta') searchbar:Searchbar;
  
  constructor (public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
	
  dismiss() {
    this.viewCtrl.dismiss();
  }

   ngOnInit() {
	this.searchbar.setFocus();
  }
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query}, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
		if(predictions){
			predictions.forEach(function (prediction) {
			  me.autocompleteItems.push(prediction.description);
			});
		}
      });
    });
  }
}
