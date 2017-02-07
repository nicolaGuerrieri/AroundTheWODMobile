import { Component } from '@angular/core';

import { NavController, ModalController} from 'ionic-angular';
import {Global} from '../../services/global';
import { Ricerca } from '../ricerca/ricerca';
import { AutocompletePage } from './autocomplete';
import { HomePage } from './home';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class Footer {
	  constructor(private nav: NavController) {
    }

    createNew(): void {
        this.nav.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
    }

}
