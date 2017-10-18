webpackJsonp([0],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutocompletePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AutocompletePage = (function () {
    function AutocompletePage(viewCtrl, zone, platform) {
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.platform = platform;
        this.service = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
        this._isAndroid = platform.is('android');
        this._isiOS = platform.is('ios');
    }
    AutocompletePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AutocompletePage.prototype.ngOnInit = function () {
        this.searchbar.setFocus();
    };
    AutocompletePage.prototype.chooseItem = function (item) {
        this.viewCtrl.dismiss(item);
    };
    AutocompletePage.prototype.updateSearch = function () {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                if (predictions) {
                    predictions.forEach(function (prediction) {
                        me.autocompleteItems.push(prediction);
                    });
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('citta'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Searchbar */])
    ], AutocompletePage.prototype, "searchbar", void 0);
    AutocompletePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/home/autocomplete.html"*/'\n\n<ion-header  class="colorPersonal">\n  <ion-toolbar>\n    <ion-title *ngIf="!_isiOS">Enter address</ion-title> \n    <ion-searchbar [(ngModel)]="autocomplete.query" #citta [showCancelButton]="true" autofocus (ionInput)="updateSearch()" (ionCancel)="dismiss()"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n  \n    <ion-item *ngFor="let item of autocompleteItems" tappable (click)="chooseItem(item)">\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n</ion-content> '/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/home/autocomplete.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], AutocompletePage);
    return AutocompletePage;
}());
//# sourceMappingURL=autocomplete.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogSocial; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(260);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DialogSocial = (function () {
    function DialogSocial(navCtrl, global, viewCtrl, params, user, modalCtrl, loading, googleAuth, platform, facebookAuth, auth, cittaLuogoService, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.global = global;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.googleAuth = googleAuth;
        this.platform = platform;
        this.facebookAuth = facebookAuth;
        this.auth = auth;
        this.cittaLuogoService = cittaLuogoService;
        this.storage = storage;
        this.url = 'www.aroundTheWOD.com';
        this.subject = 'AroundTheWOD App';
        this.message = 'Hey guys, i use AroundTheWOD app...Share and find new location for your WOD... look on site';
        this.image = 'http://app.nicolaguerrieri.it:3000/images/ket.jpg';
        this.from = this.params.get("from");
        this._isAndroid = platform.is('android');
        this._isiOS = platform.is('ios');
        this.androidVersion = 5;
        if (this._isAndroid) {
            this.storage.get('versionAndroid').then(function (va) {
                _this.androidVersion = parseInt(va, 10);
            });
        }
    }
    DialogSocial.prototype.loginGoogle = function () {
        this.viewCtrl.dismiss("google");
    };
    DialogSocial.prototype.loginSocial = function (data) {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        this.cittaLuogoService.loginSocial(data).then(function (data) {
            if (data) {
                //alert(JSON.stringify(data));
                _this.loader.dismiss();
            }
        });
    };
    //f33b26b8
    DialogSocial.prototype.dismiss = function () {
        this.viewCtrl.dismiss("");
    };
    DialogSocial.prototype.doInstagram = function () {
        var _this = this;
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* SocialSharing */].shareViaInstagram(_this.message, _this.image)
                .then(function (data) {
                console.log('Shared via shareViaInstagram');
            }).catch(function (err) {
                alert('Was not shared via Instagram' + err);
            });
        });
    };
    DialogSocial.prototype.loginInstagram = function () {
        this.viewCtrl.dismiss("instagram");
    };
    DialogSocial.prototype.loginFacebook = function () {
        this.viewCtrl.dismiss("facebook");
    };
    //facebook android
    //   ionic plugin add cordova-plugin-facebook4 --save --variable APP_ID="1116576615134600" --variable APP_NAME="aroundTheWodMobile"
    //google ios
    //   cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID="com.googleusercontent.apps.923547097240-eqmutiom8bvb95u9bjv14vg410cpd5gm"
    //	https://forum.ionicframework.com/t/ionic-2-ionic-cloud-auth-google-auth-failing-12501/72967/3
    DialogSocial.prototype.doShare = function () {
        try {
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* SocialSharing */].share(this.message, this.subject, this.image, this.url).then(function (data) {
            }).catch(function (err) {
                alert('Not able to be shared ' + err);
            });
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    DialogSocial.prototype.doFacebook = function () {
        var _this = this;
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* SocialSharing */].shareViaFacebookWithPasteMessageHint(_this.message, null, _this.url, 'AroundTheWOD app').then(function (data) {
            }).catch(function (err) {
                alert('Was not shared via Facebook');
            });
        });
    };
    DialogSocial.prototype.doTwitter = function () {
        __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* SocialSharing */].shareViaTwitter(this.message, this.image, this.url).then(function (result) {
        }).catch(function (err) {
            alert('Not able to be shared via twitter ' + err);
        });
    };
    DialogSocial.prototype.back = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('map'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ElementRef */])
    ], DialogSocial.prototype, "mapElement", void 0);
    DialogSocial = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'dialogSocial',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/dialog/dialogSocial.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title  *ngIf="from == \'social\'">\n      Social share\n    </ion-title>\n	<ion-title  *ngIf="from == \'login\'">\n      Social login\n    </ion-title>\n	<ion-title  *ngIf="from == \'info\'">\n      Who we are?\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n <ion-content>\n	<div class="row"  *ngIf="from == \'social\'">\n		<div class="col" style="text-align: center;">\n			<br />\n			<span  style="text-align: center; font-size: 30px;" color="personal3">\n				Share with your friends AroundTheWOD App...<br />\n				Choose your favorite social\n			</span>\n\n			<br />\n			<br />\n			<button ion-button class="buttonNavSenzaFont" round icon-only (click)="doFacebook()">\n				<ion-icon name="logo-facebook"></ion-icon>\n			</button>\n			<button ion-button class="buttonNavSenzaFont" round icon-only (click)="doInstagram()">\n				<ion-icon name="logo-instagram"></ion-icon>\n			</button>\n			<button ion-button class="buttonNavSenzaFont" round icon-only (click)="doTwitter()">\n				<ion-icon name="logo-twitter"></ion-icon>\n			</button>\n\n			<button ion-button class="buttonNavSenzaFont" round icon-only (click)="doShare()">\n				<ion-icon name="share"></ion-icon>\n			</button>\n\n			<br />\n			<br />\n			* To share on Instagram or Facebook you can paste a message manually\n		<!--	<button ion-button color="primary" full (click)="doFacebook()">\n				<ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;\n				Share on Facebook\n			</button>\n			<button ion-button color="primary" full (click)="doInstagram()">\n				<ion-icon name="logo-instagram"></ion-icon>&nbsp;&nbsp;\n					Share on Instagram\n			</button>\n			<button ion-button color="primary" full (click)="doTwitter()">\n				<ion-icon name="logo-twitter"></ion-icon>&nbsp;&nbsp;\n				Share on Twitter\n			</button>\n			<button ion-button color="primary" full (click)="doShare()">\n				<ion-icon name="logo-share"></ion-icon>&nbsp;&nbsp;\n				Or choose another... loginGoogle1\n			</button>-->\n		</div>\n	</div>\n	<div class="row"  *ngIf="from == \'login\'">\n		<div class="col" style="text-align: center;"  *ngIf="!_isiOS && androidVersion >= 6">\n			<button (click)="loginGoogle()" class="buttonNavSenzaFont" ion-button icon-left>\n			  <ion-icon name="logo-google"></ion-icon>&nbsp;&nbsp;\n				Login with google\n			</button>\n		</div>\n		<div class="col" style="text-align: center;" *ngIf="!_isiOS && androidVersion >= 6">\n			<button (click)="loginFacebook()" class="buttonNavSenzaFont" ion-button icon-left>\n			  <ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;\n				Login with facebook\n			</button>\n		</div>\n		<div class="col" style="text-align: center;">\n			<button (click)="loginInstagram()" class="buttonNavSenzaFont" ion-button icon-left>\n			  <ion-icon name="logo-instagram"></ion-icon>&nbsp;&nbsp;\n				Login with instagram\n			</button>\n		</div>\n	</div>\n	<br />\n	<div  *ngIf="from == \'info\'" class="centraTutto"  style="text-align: center; color: black; padding: 10px;">\n		<img src="assets/images/ket.jpg" class="img-circular centraTutto" style="border-radius: 100px; border: 1px solid #2cb5e8;" >\n		<br />\n		<br />\n		<span style="text-align: center; font-size: 30px; color: #2cb5e8;" >\n			AroundTheWod App...<br /> </span><br />\n		<span *ngIf="global.language != \'it\'" style="text-align: center; font-size: 15px; color: #2cb5e8;" >\n			was born from the idea of bringing to all outdoor athletes, competitors or not, knowledge about the many sports locations that each municipality makes available for citizens. From fitness trails to parks equipped with facilities for bodyweight training, from trail-run paths to real open-air gyms. From today, all this is traceable and reachable with one click. Sport is a source of incitement, well-being, but overall sharing. Get off your comfort zone and be part of Around The Wod Community.\n			<br /></span>\n		<span *ngIf="global.language != \'it\'"  style="text-align: center; font-size: 20px; color: #2cb5e8;" >\n			The discovery starts now!<br /> </span>\n		<span *ngIf="global.language == \'it\'"  style="text-align: center; font-size: 15px; color: #2cb5e8;" >\n			 nasce dall\'idea di portare tutti gli sportivi outdoor, agonisti e non, a conoscenza delle varie location a sfondo sportivo che ogni comune mette a disposizione  dei propri cittadini. Dai percorsi vita ai parchi attrezzati con strutture per praticare allenamento a corpo libero,dai tracciati dedicati al trail run alle vere e proprie palestre a cielo aperto... Da oggi ,tutte rintracciabili e raggiungibili con un solo click. Lo sport è  fonte di stimolo, benessere, ma soprattutto condivisione. Uscite dalla vostra zona di comfort ed entrate a far parte della ArounTheWod  Community.\n			<br /></span>\n		<span *ngIf="global.language == \'it\'"  style="text-align: center; font-size: 20px; color: #2cb5e8;" >\n			La scoperta inizia ora...<br /> </span>\n	</div>\n\n	<br />\n	<div *ngIf="from == \'fast\' && androidVersion >= 6" class="col" style="text-align: center;">\n		<button (click)="loginSocial(\'google\')" class="buttonNavSenzaFont" ion-button icon-left>\n		  <ion-icon name="logo-google"></ion-icon>&nbsp;&nbsp;\n			Login with google\n		</button>\n	</div>\n\n	<div  *ngIf="from == \'fast\' && androidVersion >= 6"  class="col" style="text-align: center;">\n		<button (click)="loginSocial(\'facebook\')" class="buttonNavSenzaFont" ion-button icon-left>\n		  <ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;\n			Login with facebook\n		</button>\n	</div>\n	<div *ngIf="from == \'fast\'"  class="col" style="text-align: center;">\n		<button (click)="loginSocial(\'instagram\')" class="buttonNavSenzaFont" ion-button icon-left>\n		  <ion-icon name="logo-instagram"></ion-icon>&nbsp;&nbsp;\n			Login with instagram\n		</button>\n	</div>\n	<br />\n	<div class="centraTutto"  style="text-align: center;">\n		<button (click)="dismiss()" ion-button class="buttonNavSenzaFont" icon-left>\n			<ion-icon name="back" showWhen="android,windows,ios"></ion-icon>\n			Close\n		</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/dialog/dialogSocial.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["e" /* User */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["d" /* GoogleAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["c" /* FacebookAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_4__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* Storage */]])
    ], DialogSocial);
    return DialogSocial;
}());
//# sourceMappingURL=dialogSocial.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ricerca; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_native__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_autocomplete__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ricerca_detail__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ricerca_organizzazioni__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog_dialogSocial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Ricerca = (function () {
    function Ricerca(actionSheetCtrl, navCtrl, global, params, user, cittaLuogoService, modalCtrl, loading, plt, facebookAuth, auth) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.global = global;
        this.params = params;
        this.user = user;
        this.cittaLuogoService = cittaLuogoService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.plt = plt;
        this.facebookAuth = facebookAuth;
        this.auth = auth;
        this.url = 'www.aroundTheWOD.com';
        this.message = 'hey guys, i share new location on AroundTheWOD app...look here ' + this.url;
        this.navOptions = {
            animate: true,
            animation: 'wp-transition'
        };
        this.loadAttivita();
        this.cittaLuogo = [];
        this.citta = params.get("citta");
        this.allSearchPlace = params.get("allSearchPlace");
        this.address = {
            citta: this.citta,
            place: this.citta
        };
        this.loadCity(this.citta);
    }
    Ricerca.prototype.loadAttivita = function () {
        var _this = this;
        this.cittaLuogoService.loadAttivita().then(function (data) {
            _this.listaAttivita = data;
        });
    };
    Ricerca.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Menu',
            buttons: [
                //{			  text: 'Add your new place',			  role: 'addPlace',			  handler: () => {				this.addPlace();			  }			},
                {
                    text: 'Change your search',
                    handler: function () {
                        _this.showAddressModalR();
                    }
                }, {
                    text: 'Locate your position',
                    role: 'locate',
                    handler: function () {
                        _this.geolocalizza();
                    }
                }, {
                    text: 'Share your experience',
                    role: 'Share',
                    handler: function () {
                        _this.share();
                    }
                }, {
                    text: 'AroundTheWOD Community',
                    role: 'Friends',
                    handler: function () {
                        _this.organizzazioni();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    Ricerca.prototype.share = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__dialog_dialogSocial__["a" /* DialogSocial */], { "from": "social" });
        modal.present();
    };
    Ricerca.prototype.addPlace = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__ricerca_detail__["a" /* Detail */], {
            idLuogo: -1
        }, this.navOptions);
    };
    Ricerca.prototype.doShare = function () {
        var full_name;
        try {
            console.log('do FB');
            //this.facebookAuth.login().then(() => {
            //this.auth.login('facebook').then(() => {
            //	  this.navCtrl.setRoot(Login);
            __WEBPACK_IMPORTED_MODULE_4_ionic_native__["e" /* SocialSharing */].share(this.message, null, null, this.url).then(function (data) {
                alert(data);
            }).catch(function () {
                // Error!
            });
        }
        catch (e) {
            alert("nic" + e);
        }
    };
    Ricerca.prototype.ngAfterViewInit = function () {
        try {
            if (this.address) {
            }
        }
        catch (e) {
            alert("error" + e);
        }
    };
    Ricerca.prototype.scrollToBottom = function () {
        this.content.scrollToBottom();
    };
    //load with position
    Ricerca.prototype.loadGeolocalization = function () {
        var _this = this;
        var geocoder;
        geocoder = new google.maps.Geocoder();
        __WEBPACK_IMPORTED_MODULE_4_ionic_native__["c" /* Geolocation */].getCurrentPosition().then(function (position) {
            console.log(position);
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].address_components;
                        var city = add[3];
                    }
                    else {
                        alert("address not found");
                    }
                }
                else {
                    alert("Geocoder failed due to: " + status);
                }
            });
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
        }, function (err) {
            console.log(err);
        });
    };
    Ricerca.prototype.getMapElement = function () {
        return this.mapElement;
    };
    Ricerca.prototype.geolocalizza = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        this.cittaLuogoService.localizza(this.loader).then(function (data) {
            if (data != "error") {
                if (data.formatted_address != null) {
                    _this.address.place = data.formatted_address;
                }
                else if (data.address_components[1]) {
                    _this.address.place = data.address_components[1].long_name;
                }
                else if (data.address_components[2]) {
                    _this.address.place = data.address_components[2].long_name;
                }
                console.log(data);
                _this.allSearchPlace = data;
                _this.ricerca(true);
            }
            if (_this.loader) {
                _this.loader.dismiss();
            }
        });
    };
    Ricerca.prototype.loadMapWithPlace = function (cittaResult) {
        try {
            var localizzaRicerca;
            var mapOptions_1;
            var latLng_1;
            console.log("loadMap " + this.address.place);
            var elem = this.mapElement;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': this.address.place }, function (results, status) {
                var _this = this;
                if (status == google.maps.GeocoderStatus.OK) {
                    localizzaRicerca = results[0];
                    latLng_1 = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
                    mapOptions_1 = {
                        center: latLng_1,
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    this.map = new google.maps.Map(elem.nativeElement, mapOptions_1);
                    var marker = new google.maps.Marker({
                        position: latLng_1,
                        map: this.map,
                        title: localizzaRicerca.formatted_address
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: "<span>" + localizzaRicerca.formatted_address + "</span>"
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(this.map, marker);
                    });
                    if (cittaResult != null) {
                        cittaResult.forEach(function (cittaLuogoItem) {
                            latLng_1 = new google.maps.LatLng(cittaLuogoItem.latitudine, cittaLuogoItem.longitudine);
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                                position: latLng_1,
                                map: _this.map,
                                title: cittaLuogoItem.nome
                            });
                            latLng_1 = null;
                            var infowindow = new google.maps.InfoWindow({
                                content: "<span>" + cittaLuogoItem.nome + "</span>"
                            });
                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.open(this.map, marker);
                            });
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                        });
                    }
                }
            });
        }
        catch (e) {
            if (this.loader) {
                this.loader.dismiss();
            }
            alert("error: " + e);
        }
    };
    Ricerca.prototype.ricerca = function (flagPresent) {
        var _this = this;
        if (flagPresent) {
            this.navCtrl.push(Ricerca, {
                citta: this.address.place,
                allSearchPlace: this.allSearchPlace
            }, this.navOptions);
        }
        else {
            if (this.address.place != "") {
                this.cittaLuogoService.localizzaByNome(this.address.place).then(function (data) {
                    _this.navCtrl.push(Ricerca, {
                        citta: _this.address.place,
                        allSearchPlace: data
                    }, _this.navOptions);
                });
            }
            else {
                console.log("bloccato");
                return;
            }
        }
    };
    Ricerca.prototype.showAddressModalR = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__home_autocomplete__["a" /* AutocompletePage */]);
        var me = this;
        modal.onDidDismiss(function (data) {
            if (data != null) {
                console.log("showAddressModalR " + data);
                _this.address.place = data.description;
            }
            else {
                return;
            }
            _this.allSearchPlace = data;
            _this.ricerca(false);
        });
        modal.present();
    };
    Ricerca.prototype.ricerca2 = function () {
        try {
            if (this.address.place != "") {
                this.navCtrl.push(Ricerca, {
                    citta: this.address.place,
                    allSearchPlace: this.allSearchPlace
                }, this.navOptions);
            }
            else {
                console.log("bloccato");
                return;
            }
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    Ricerca.prototype.organizzazioni = function () {
        try {
            if (this.address.place != "") {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__ricerca_organizzazioni__["a" /* Organizzazioni */], {
                    citta: this.address.citta
                }, this.navOptions);
            }
            else {
                console.log("bloccato");
                return;
            }
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    Ricerca.prototype.selectPlace = function (idPlace) {
        try {
            if (this.address.place != "") {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__ricerca_detail__["a" /* Detail */], {
                    idLuogo: idPlace
                }, this.navOptions);
            }
            else {
                console.log("bloccato");
                return;
            }
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    Ricerca.prototype.loadCity = function (cittaP) {
        var _this = this;
        try {
            this.loader = this.loading.create({
                content: 'Please wait...',
            });
            this.loader.present();
            console.log(this.allSearchPlace);
            this.address.place = "";
            if (this.allSearchPlace.address_components) {
                this.address.place = "";
                for (var i = 0; i < this.allSearchPlace.address_components.length; i++) {
                    if (this.allSearchPlace.address_components[i].types[0] == "street_number") {
                        this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";
                    }
                    if (this.allSearchPlace.address_components[i].types[0] == "route") {
                        this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";
                    }
                    if (this.allSearchPlace.address_components[i].types[0] == "locality") {
                        this.address.citta = this.allSearchPlace.address_components[i].long_name;
                        this.address.place += this.allSearchPlace.address_components[i].long_name + ", ";
                    }
                }
            }
            this.cittaLuogoService.load(this.address.citta).then(function (data) {
                _this.cittaLuogo = data;
                _this.loadMapWithPlace(_this.cittaLuogo);
                if (_this.loader) {
                    _this.loader.dismiss();
                }
            });
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    Ricerca.prototype.back = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
        this.navCtrl.popToRoot();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Ricerca.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('map'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ElementRef */])
    ], Ricerca.prototype, "mapElement", void 0);
    Ricerca = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'ricerca',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/ricerca.html"*/'<ion-header class="colorPersonal">\n  <ion-navbar>\n    <ion-title>\n		Search places in <span style="text-transform: capitalize">{{citta}}</span>\n    </ion-title>\n \n	<ion-buttons end>\n\n		<button style="font-size: 30px;"(click)="presentActionSheet()" class="buttonClass" ion-button>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="">\n\n	<div #map id="map"></div>  \n	<br />\n	<br />\n	<!--Places in:  	<ion-chip>	  <ion-label style="text-transform: capitalize;">{{citta}}</ion-label>	</ion-chip>	<hr class="hrS">	<br />	<br />-->\n	 <ion-fab  right bottom>\n		<button mini (click)="addPlace()" ion-fab color="personal3"><ion-icon name="md-add"></ion-icon></button>\n	</ion-fab>\n	\n	<ion-card *ngFor="let item of cittaLuogo" tappable style="" class="cardR" (click)="selectPlace(item._id)">\n	 <!-- <img class="imgDetailLittle" *ngIf="item.foto != null" src="{{global.preUrl}}users/leggi/{{item.foto}}"/>-->\n \n	  <ion-card-content >\n \n		<ion-card-title>\n		  {{ item.nome }} {{ item.citta }}\n		</ion-card-title>\n		<h2><b>{{ item.provincia }} {{ item.nazione }}</b></h2>  \n		<p>\n			{{ item.descrizione }} <br />\n			{{ item.orario }} {{ item.punto_risotro }}\n			{{ item.via }}{{ item.sempreAperto }} {{ item.ricerca }} \n		</p>\n		<div class="row" >\n			<span *ngFor="let itemm of item.listaAttivita">\n				<button *ngIf="itemm.selezionato" class="buttonNavSenzaFontRound" style="font-size:10px" ion-button icon-only>\n					<ion-icon *ngIf="!itemm.img"  name="{{ itemm.nome }}"></ion-icon> \n					<img *ngIf="itemm.img" src="{{global.preUrl}}/images/{{itemm.img}}"  style="" alt="" class="imgDetail altreIconaLittle">\n				</button>\n			</span>\n		</div><br />\n	  </ion-card-content>\n	  <ion-row no-padding>\n		  <ion-col>\n	 \n		  </ion-col>\n		  <ion-col text-center>\n	 \n		  </ion-col>\n		  <ion-col text-right>\n			<button ion-button style="background-color: white; font-size:17px; font-weight: bold;" clear small color="personal3" icon-left>\n			  <ion-icon name=\'share-alt\'></ion-icon>\n			  Detail\n			</button>\n		  </ion-col>\n      </ion-row>\n	</ion-card> \n	 <div class="textNoResults" *ngIf="cittaLuogo.length == 0" >  \n		<ion-icon  ios="ios-sad" md="md-sad"></ion-icon>\n		No results found for this place...\n	</div>\n	\n	\n	\n	\n</ion-content>\n <ion-footer class="centraTutto">\n  <ion-toolbar style="color: white; font-size: 35px;"  >\n	<ion-title class="centraTutto">Follow us</ion-title>\n	<div class="centraTutto" style="padding-left: 15px;">\n		<a (click)="global.openSocial(\'facebook\')" >\n			<ion-icon name="logo-facebook"></ion-icon>\n		</a> \n		<a (click)="global.openSocial(\'instagram\')" >		\n			<ion-icon data-href="https://www.instagram.com/aroundthewodapp/?hl=it" name="logo-instagram"></ion-icon> \n		</a> \n	</div>\n	<!--<span style="font-size: 10px; color: white;">{{global.preUrl}}</span>-->\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/ricerca.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__["e" /* User */], __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__["c" /* FacebookAuth */], __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__["a" /* Auth */]])
    ], Ricerca);
    return Ricerca;
}());
//# sourceMappingURL=ricerca.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Detail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_autocomplete__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ricerca_ricerca__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialog_dialogSocial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_success__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_cloud_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ricerca_dettaglioOrganizzazioni__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Detail = (function () {
    function Detail(navCtrl, toastCtrl, viewCtrl, global, params, cittaLuogoService, modalCtrl, loading, plt, googleAuth, user, facebookAuth, auth) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.global = global;
        this.params = params;
        this.cittaLuogoService = cittaLuogoService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.plt = plt;
        this.googleAuth = googleAuth;
        this.user = user;
        this.facebookAuth = facebookAuth;
        this.auth = auth;
        this.nuovoLuogo = false;
        this.listaRaccordo = [];
        this.navOptions = {
            animate: true,
            animation: 'wp-transition'
        };
        this._isAndroid = plt.is('android');
        this._isiOS = plt.is('ios');
        this.loadAttivita();
    }
    Detail.prototype.loadAttivita = function () {
        var _this = this;
        this.cittaLuogoService.loadAttivita().then(function (data) {
            _this.listaAttivita = data;
        });
    };
    Detail.prototype.scrollToBottom = function () {
        this.content.scrollToBottom();
    };
    Detail.prototype.ngOnInit = function () {
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        this.idLuogo = this.params.get("idLuogo");
        if (this.idLuogo != -1) {
            this.nuovoLuogo = false;
            this.cercaPerId(this.idLuogo);
            this.cercaOrganizzazioni(this.idLuogo);
        }
        else {
            this.nuovoLuogo = true;
            this.nuovoLuogoObject = {};
            this.nuovoLuogoObject.ricerca = "";
            this.nuovoLuogoObject.citta = "";
            this.nuovoLuogoObject.nazione = "";
            this.nuovoLuogoObject.provincia = "";
            this.nuovoLuogoObject.via = "";
            this.nuovoLuogoObject.descrizione = "";
            this.nuovoLuogoObject.cap = "";
            this.nuovoLuogoObject.ristoro = "";
            this.nuovoLuogoObject.attrezzature = "";
            this.nuovoLuogoObject.orari = "";
            this.nuovoLuogoObject.errore = null;
            this.nuovoLuogoObject.dal = null;
            this.nuovoLuogoObject.al = null;
            this.nuovoLuogoObject.listaAttivita = [];
            this.geolocalizza();
        }
    };
    Detail.prototype.cercaOrganizzazioni = function (idLuogo) {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.listaRaccordo = [];
        this.loader.present();
        this.cittaLuogoService.getLuogoForIdLuogo(idLuogo).then(function (data) {
            console.log(data);
            if (data) {
                if (data != "error") {
                    data.listaLuoghi.forEach(function (element) {
                        console.log(element);
                        _this.cittaLuogoService.getOrgById(element.organizzazione_id).then(function (data) {
                            _this.listaRaccordo.push(data);
                        });
                    });
                }
            }
            _this.loader.dismiss();
        });
    };
    Detail.prototype.goDetail = function (org) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__ricerca_dettaglioOrganizzazioni__["a" /* DettaglioOrganizzazioni */], {
            luoghiOrganizzazione: this.listaRaccordo,
            organizzazione: org
        }, this.navOptions);
    };
    Detail.prototype.removeActivity = function (post) {
        for (var i = 0; i < this.listaAttivita.length; i++) {
            if (post == this.listaAttivita[i].nome) {
                this.listaAttivita[i].selezionato = false;
            }
        }
    };
    Detail.prototype.showDescriptionIconSport = function (description) {
        var toast = this.toastCtrl.create({
            message: description,
            duration: 3000,
            position: 'center'
        });
        toast.present();
    };
    Detail.prototype.selectActivity = function (attivita) {
        //this.removeActivityAll(attivita);
        //this.nuovoLuogoObject.listaAttivita.push(attivita);
        for (var i = 0; i < this.listaAttivita.length; i++) {
            if (attivita == this.listaAttivita[i].nome) {
                if (this.listaAttivita[i].selezionato == true) {
                    this.listaAttivita[i].selezionato = false;
                }
                else {
                    this.listaAttivita[i].selezionato = true;
                    var toast = this.toastCtrl.create({
                        message: this.listaAttivita[i].mostra,
                        duration: 3000,
                        position: 'center'
                    });
                    toast.present();
                }
            }
        }
    };
    //https://forum.ionicframework.com/t/how-to-speed-up-my-app/94271/19
    Detail.prototype.cercaPerId = function (idLuogoParameter) {
        var _this = this;
        try {
            if (idLuogoParameter == null) {
                alert("errore nessun id");
                return;
            }
            else {
                this.cittaLuogoService.getLuogoForId(idLuogoParameter).then(function (data) {
                    _this.luogoSelezionato = data;
                    _this.cercaLuogo(_this.luogoSelezionato);
                });
            }
        }
        catch (e) {
            alert("nic" + e);
        }
    };
    Detail.prototype.openMapsApp = function (item) {
        var coords = this.luogoSelezionato.latitudine + "," + this.luogoSelezionato.longitudine;
        if (this._isiOS) {
            window.open("http://maps.apple.com/?q=" + coords, '_system');
            return;
        }
        if (this._isAndroid) {
            window.open("http://maps.google.com/?q=" + coords, '_system');
            return;
        }
        window.open("http://maps.google.com/?q=" + coords, '_system');
        return;
    };
    //- See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-open-native-maps-application-22#sthash.lc4YYgC7.dpuf
    Detail.prototype.validaDati = function () {
        this.nuovoLuogoObject.errore = null;
        console.log(this.nuovoLuogoObject.ricerca.trim());
        if (this.nuovoLuogoObject.ricerca == undefined || this.nuovoLuogoObject.ricerca.trim() == "" || this.nuovoLuogoObject.ricerca.trim() == undefined) {
            this.nuovoLuogoObject.errore = "Insert place";
            return;
        }
        else if (this.nuovoLuogoObject.citta == undefined || this.nuovoLuogoObject.citta.trim() == "" || this.nuovoLuogoObject.citta.trim() == undefined) {
            this.nuovoLuogoObject.errore = "Insert city";
            return;
        }
        else if (this.nuovoLuogoObject.nazione == undefined || this.nuovoLuogoObject.nazione.trim() == "" || this.nuovoLuogoObject.nazione.trim() == undefined) {
            this.nuovoLuogoObject.errore = "Insert nation";
            return;
        }
        else {
            var conta = 0;
            for (var i = 0; i < this.listaAttivita.length; i++) {
                if (this.listaAttivita[i].selezionato) {
                    conta++;
                }
            }
            if (conta == 0) {
                this.nuovoLuogoObject.errore = "Select an activity";
                return;
            }
        }
    };
    //}else if(this.nuovoLuogoObject.descrizione == undefined || this.nuovoLuogoObject.descrizione.trim()== "" || this.nuovoLuogoObject.descrizione.trim() == undefined){
    //	this.nuovoLuogoObject.errore = "Insert description";
    //	return;
    //}else if(this.nuovoLuogoObject.attrezzature == undefined || this.nuovoLuogoObject.attrezzature.trim() == "" || this.nuovoLuogoObject.attrezzature.trim() == undefined){
    //	this.nuovoLuogoObject.errore = "Insert workout equipment ";
    //	return;
    Detail.prototype.salva = function () {
        var _this = this;
        this.validaDati();
        if (this.nuovoLuogoObject.errore) {
            return;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__dialog_dialogSocial__["a" /* DialogSocial */], { "from": "login" });
        modal.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            _this.loginSocial(data);
        });
        modal.present();
    };
    Detail.prototype.loginSocial = function (social) {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        if (!social) {
            this.loader.dismiss();
        }
        this.cittaLuogoService.loginSocial(social).then(function (socialData) {
            if (!socialData) {
                _this.loader.dismiss();
                return;
            }
            var datiSocial = socialData;
            if (datiSocial) {
                _this.inviaDatiServer(socialData, _this.loader);
            }
            else {
                _this.loader.dismiss();
            }
        });
    };
    Detail.prototype.riempiOggetto = function (data) {
        var _this = this;
        var listaPrec = this.nuovoLuogoObject.listaAttivita;
        this.nuovoLuogoObject = {};
        this.nuovoLuogoObject.listaAttivita = listaPrec;
        if (!data) {
            return;
        }
        console.log(data.geometry);
        if (data.geometry != null) {
            this.nuovoLuogoObject.lat = data.geometry.location.lat();
            this.nuovoLuogoObject.longi = data.geometry.location.lng();
        }
        if (data.formatted_address != null) {
            this.nuovoLuogoObject.ricerca = data.formatted_address;
        }
        else if (data.address_components[1]) {
            this.nuovoLuogoObject.ricerca = data.address_components[1].long_name;
        }
        else if (data.address_components[2]) {
            this.nuovoLuogoObject.ricerca = data.address_components[2].long_name;
        }
        data.address_components.forEach(function (datoLuogo) {
            if (datoLuogo.types[0] == 'locality') {
                _this.nuovoLuogoObject.citta = datoLuogo.long_name;
            }
            if (datoLuogo.types[0] == 'administrative_area_level_3') {
                _this.nuovoLuogoObject.provincia = datoLuogo.long_name;
            }
            if (datoLuogo.types[0] == 'country') {
                _this.nuovoLuogoObject.nazione = datoLuogo.long_name;
            }
            if (datoLuogo.types[0] == 'postal_code') {
                _this.nuovoLuogoObject.cap = datoLuogo.long_name;
            }
            if (datoLuogo.types[0] == 'route') {
                _this.nuovoLuogoObject.via = datoLuogo.long_name;
            }
        });
    };
    Detail.prototype.inviaDatiServer = function (tokenAuth, loader) {
        var _this = this;
        try {
            if (!tokenAuth) {
                alert("No token");
                return;
            }
            console.log(tokenAuth);
            this.nuovoLuogoObject.utente = tokenAuth;
            this.nuovoLuogoObject.localita = this.nuovoLuogoObject.citta;
            this.nuovoLuogoObject.fisso = 'true';
            this.nuovoLuogoObject.aperto = 'true';
            this.nuovoLuogoObject.cercaPostoNew = this.nuovoLuogoObject.ricerca;
            this.nuovoLuogoObject.nome = this.nuovoLuogoObject.ricerca;
            this.nuovoLuogoObject.listaAttivita = this.listaAttivita;
            this.cittaLuogoService.save(this.nuovoLuogoObject).then(function (data) {
                if (data.status == 200) {
                    //andato bene il salvataggio
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__dialog_success__["a" /* Success */], { "from": "detail" });
                    modal.onDidDismiss(function (data) {
                        _this.ricerca();
                    });
                    modal.present();
                }
                _this.loader.dismiss();
            });
        }
        catch (e) {
            this.loader.dismiss();
            alert("error: " + e);
        }
    };
    Detail.prototype.ricerca = function () {
        var _this = this;
        this.cittaLuogoService.localizzaByNome(this.nuovoLuogoObject.citta).then(function (data) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__ricerca_ricerca__["a" /* Ricerca */], {
                citta: _this.nuovoLuogoObject.citta,
                allSearchPlace: data
            }, _this.navOptions);
        });
    };
    //search del luogo scritto
    Detail.prototype.loadMapVed = function (cittaResult) {
        var _this = this;
        var localizzaRicerca;
        var mapOptions;
        var latLng;
        //	var elem = this.mapElement;
        this.cittaLuogoService.loadMap(this.nuovoLuogoObject.ricerca).then(function (data) {
            _this.riempiOggetto(data);
            localizzaRicerca = data;
            latLng = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
            mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                position: latLng,
                map: _this.map,
                title: localizzaRicerca.formatted_address
            });
            var infowindow = new google.maps.InfoWindow({
                content: "<span>" + localizzaRicerca.formatted_address + "</span>"
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(this.map, marker);
            });
        });
    };
    //search del luogo scritto
    Detail.prototype.loadMap = function (cittaResult) {
        if (cittaResult == null) {
            cittaResult = this.nuovoLuogoObject.ricerca;
        }
        try {
            var localizzaRicerca;
            var mapOptions_1;
            var latLng_1;
            console.log("loadMap " + cittaResult);
            var elem = this.mapElement;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': cittaResult }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    localizzaRicerca = results[0];
                    latLng_1 = new google.maps.LatLng(localizzaRicerca.geometry.location.lat(), localizzaRicerca.geometry.location.lng());
                    mapOptions_1 = {
                        center: latLng_1,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    this.map = new google.maps.Map(elem.nativeElement, mapOptions_1);
                    var marker = new google.maps.Marker({
                        position: latLng_1,
                        map: this.map,
                        title: localizzaRicerca.formatted_address
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: "<span>" + localizzaRicerca.formatted_address + "</span>"
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(this.map, marker);
                    });
                }
            });
            if (this.loader != null) {
                this.loader.dismiss();
            }
        }
        catch (e) {
            alert("error: " + e);
        }
    };
    //localizzazione posizione
    Detail.prototype.geolocalizza = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        this.cittaLuogoService.localizza(this.loader).then(function (data) {
            if (data != "error") {
                _this.riempiOggetto(data);
                _this.loadMap(null);
                if (_this.loader != null) {
                    _this.loader.dismiss();
                }
            }
            else {
                _this.geolocalizza();
            }
        });
    };
    //carica la mappa in base al risultato da db
    Detail.prototype.cercaLuogo = function (luogo) {
        try {
            var localizzaRicerca;
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var elem = this.mapElement;
            var latLng = new google.maps.LatLng(luogo.latitudine, luogo.longitudine);
            geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].address_components;
                        var city = add[3];
                    }
                    else {
                        alert("address not found");
                    }
                }
                else {
                    alert("Geocoder failed due to: " + status);
                }
            });
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            if (this.loader) {
                this.loader.dismiss();
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: luogo.nome
            });
            latLng = null;
            var infowindow = new google.maps.InfoWindow({
                content: "<span>" + luogo.nome + "</span>"
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(this.map, marker);
            });
        }
        catch (e) {
            alert("nic" + e);
        }
    };
    Detail.prototype.back = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
        this.navCtrl.pop();
    };
    Detail.prototype.showAddressModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__home_autocomplete__["a" /* AutocompletePage */]);
        var me = this;
        modal.onDidDismiss(function (data) {
            if (data != null) {
                _this.nuovoLuogoObject.ricerca = data.description;
                _this.loadMapVed(_this.nuovoLuogoObject.ricerca);
            }
            else {
                return;
            }
        });
        modal.present();
    };
    Detail.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Detail.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('map'), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ElementRef */])
    ], Detail.prototype, "mapElement", void 0);
    Detail = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'detail',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/detail.html"*/'<ion-header class="colorPersonal">\n  <ion-navbar>\n    <ion-title>\n      <span *ngIf="luogoSelezionato && !nuovoLuogo">Detail</span><span *ngIf="nuovoLuogo">Insert new place</span>\n    </ion-title>\n\n	<ion-buttons end>\n\n<!--		<button *ngIf="!nuovoLuogo" (click)="openMapsApp()"  ion-button>\n 			<img  src="assets/images/g.png"  style="width: 30px; height: 30px; border-radius: 0px;" alt="" class="imgDetail">\n 		</button>-->\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\nciao\n<ion-content padding style="text-align: center">\n	<ion-chip *ngIf="luogoSelezionato && !nuovoLuogo">\n	  <ion-label style="width: 90%;" *ngIf="luogoSelezionato && !nuovoLuogo">{{luogoSelezionato.ricerca}}</ion-label>\n	</ion-chip>\n	<br />\n	<br />\n	<div #map id="map"></div>\n\n	 <ion-fab right bottom>\n		<button mini *ngIf="nuovoLuogo" (click)="scrollToBottom()" ion-fab color="personal3"><ion-icon name="arrow-dropdown"></ion-icon></button>\n		<button *ngIf="luogoSelezionato && !nuovoLuogo" (click)="scrollToBottom()" ion-fab color="personal3"><img  src="{{global.preUrl}}/images/g.png"  style="width: 30px; height: 30px; border-radius: 0px;" alt="" class="imgDetail"></button>\n\n	</ion-fab>\n	<div class="row text-center" *ngIf="luogoSelezionato && false">\n		<img *ngIf="luogoSelezionato.foto" src="{{global.preUrl}}users/leggi/{{luogoSelezionato.foto}}" alt="" class="imgDetail">\n	</div>\n	<br />\n	<div class="row" *ngIf="false">\n		<div class="col" style="text-align: center;">\n			<button *ngIf="!nuovoLuogo" class="buttonNavSenzaFont" (click)="openMapsApp()" ion-button icon-left>\n				Take me there\n			</button>\n		</div>\n	</div><br />\n	<div class="row" *ngIf="nuovoLuogo">\n		<span class="genericText">Select what can I do: </span><br />\n\n		<button *ngFor="let item of listaAttivita" (click)="selectActivity(item.nome)"  [ngClass]="{ \'disabilita\': item.selezionato, \'buttonNavSenzaFontRound\': !item.selezionato}" ion-button icon-only>\n			<ion-icon *ngIf="!item.img"  name="{{ item.nome }}"></ion-icon>\n			<img *ngIf="item.img" src="{{global.preUrl}}/images/{{item.img}}"  style="" alt="" class="imgDetail altreIcona">\n		</button>\n	</div><br />\n 	<div class="row"  *ngIf="luogoSelezionato && !nuovoLuogo">\n		<span class="genericText">What i can do: </span><br />\n		<span  *ngFor="let item of luogoSelezionato.listaAttivita">\n			<button class="disabilitaBlue" ion-button icon-only *ngIf="item.selezionato" (click)="showDescriptionIconSport(item.mostra)">\n\n				<ion-icon *ngIf="!item.img && item.selezionato" name="{{ item.nome }}"></ion-icon>\n				<img *ngIf="item.img && item.selezionato" src="{{global.preUrl}}/images/{{item.img}}"  style="" alt="" class="imgDetail altreIcona">\n			</button>\n		</span>\n	</div><br />\n\n\n	<!-- se selezionato scorro la lista e prendo solo i nomi e mostro disabilitati, se nuovo faccio vedere tutti, faccio selezionare-->\n	<div class="row">\n		<div class="col" style="text-align: center; font-size: 20px; color: red;" *ngIf="nuovoLuogoObject" >\n			<div class="row text-center" *ngIf="nuovoLuogoObject.errore" >\n				{{nuovoLuogoObject.errore}}\n			</div>\n		</div>\n	</div>\n	<ion-list *ngIf="nuovoLuogo">\n		<ion-item>\n   <ion-input  color="personal3"  style="" class="centraTutto" *ngIf="nuovoLuogo" (press)="showAddressModal()" [(ngModel)]="nuovoLuogoObject.ricerca" type="text" placeholder="Pick a place"></ion-input>\n\n				  <!-- 	<ion-input type="text" placeholder="Place" floating  [(ngModel)]="nuovoLuogoObject.ricerca" *ngIf="nuovoLuogo"></ion-input>\n	<ion-input readonly type="text" placeholder="ricerca" floating [(ngModel)]="luogoSelezionato.ricerca" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>-->\n	 		<button *ngIf="nuovoLuogo" (click)="loadMapVed()" clear ion-button item-right class="buttonNavSenzaFont" style="color: white; font-size:15px"><ion-icon name="search"></ion-icon></button>\n	 		<button *ngIf="nuovoLuogo" (click)="geolocalizza()" clear ion-button item-right class="buttonNavSenzaFont" style="color: white; font-size:15px">\n				<ion-icon style="font-size: 20px" name="ios-navigate-outline"></ion-icon>\n			</button>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n			<ion-input type="text" placeholder="City" [(ngModel)]="nuovoLuogoObject.citta" *ngIf="nuovoLuogo"></ion-input>\n			<ion-input readonly type="text" placeholder="City"   [(ngModel)]="luogoSelezionato.citta" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		 <ion-item>\n			<ion-input type="text" placeholder="District" [(ngModel)]="nuovoLuogoObject.provincia"    *ngIf="nuovoLuogo"></ion-input>\n			<ion-input type="text" readonly placeholder="District"     [(ngModel)]="luogoSelezionato.provincia" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item class="nowrap">\n			<ion-input type="text" [(ngModel)]="nuovoLuogoObject.nazione"  placeholder="Nation"   *ngIf="nuovoLuogo"></ion-input>\n			<ion-input type="text" readonly placeholder="Nation"    [(ngModel)]="luogoSelezionato.nazione" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n			<ion-input type="text" placeholder="Street" [(ngModel)]="nuovoLuogoObject.via"   *ngIf="nuovoLuogo"></ion-input>\n		<ion-input type="text" readonly placeholder="Street"    [(ngModel)]="luogoSelezionato.via" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n		<ion-input type="text"  [(ngModel)]="nuovoLuogoObject.cap"  placeholder="Cap"   *ngIf="nuovoLuogo"></ion-input>\n		<ion-input type="text" readonly placeholder="Cap"   [(ngModel)]="luogoSelezionato.cap" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n		<ion-input type="text"  [(ngModel)]="nuovoLuogoObject.descrizione"   placeholder="Info"     *ngIf="nuovoLuogo"></ion-input>\n		<ion-input type="text" readonly placeholder="Info"   [(ngModel)]="luogoSelezionato.descrizione" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n			<ion-input type="text"  [(ngModel)]="nuovoLuogoObject.attrezzature"   placeholder="Workout equipment"    *ngIf="nuovoLuogo"></ion-input>\n			<ion-input type="text" readonly placeholder="Workout equipment"   [(ngModel)]="luogoSelezionato.attrezzature" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>\n<!--	<br />\n	<br />\n	<ion-list>\n		<ion-item>\n		<ion-input type="text" placeholder="Time"    [(ngModel)]="nuovoLuogoObject.orari"  *ngIf="nuovoLuogo"></ion-input>\n		<ion-input type="text" readonly placeholder="time"   [(ngModel)]="luogoSelezionato.orari" *ngIf="luogoSelezionato && !nuovoLuogo"></ion-input>\n		</ion-item>\n	</ion-list>-->\n	<br />\n	<div class="row">\n		<div class="col" style="text-align: center; font-size: 20px; color: red;" *ngIf="nuovoLuogoObject" >\n			<div class="row text-center" *ngIf="nuovoLuogoObject.errore" >\n				{{nuovoLuogoObject.errore}}\n			</div>\n		</div>\n	</div>\n	<br />\n	<ion-card *ngFor="let item of listaRaccordo" (click)="goDetail(item.organizzazione)" tappable style="width: 100%; margin-left: 0; margin-bottom: 10px; text-align: left;">\n		<ion-card-content>\n			<ion-card-title>\n				{{ item.organizzazione.nome }}, {{ item.organizzazione.citta }} <br /> {{ item.organizzazione.tipo }}\n			</ion-card-title>\n			<p>\n				{{ item.organizzazione.descrizione }} <br /> Where: {{ item.organizzazione.dove }} <br /> {{ item.organizzazione.telefono }}<br />\n				<a *ngIf="item.organizzazione.url_social" href="{{ item.organizzazione.url_social }}">\n					<ion-icon name="logo-facebook" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n				<a *ngIf="item.organizzazione.url_social_instagram" href="{{ item.organizzazione.url_social_instagram }}">\n					<ion-icon name="logo-instagram" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n			</p>\n		</ion-card-content>\n	</ion-card>\n	<br />\n\n\n	<div class="row">\n		<div class="col" style="text-align: center;">\n			<button (click)="back()" class="buttonNavSenzaFont" ion-button icon-left>\n				Back\n			</button>\n			<button *ngIf="nuovoLuogo" class="buttonNavSenzaFont" (click)="salva()" ion-button icon-left>\n				Save\n			</button>\n		</div>\n	</div>\n</ion-content>\n <ion-footer class="centraTutto">\n  <ion-toolbar style="color: white; font-size: 35px;">\n	<ion-title class="centraTutto">Follow us</ion-title>\n	<div class="centraTutto" style="padding-left: 15px;">\n		<a (click)="global.openSocial(\'facebook\')" >\n			<ion-icon name="logo-facebook"></ion-icon>\n		</a>\n		<a (click)="global.openSocial(\'instagram\')" >\n			<ion-icon data-href="https://www.instagram.com/aroundthewodapp/?hl=it" name="logo-instagram"></ion-icon>\n		</a>\n	</div>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/detail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__ionic_cloud_angular__["d" /* GoogleAuth */], __WEBPACK_IMPORTED_MODULE_8__ionic_cloud_angular__["e" /* User */], __WEBPACK_IMPORTED_MODULE_8__ionic_cloud_angular__["c" /* FacebookAuth */], __WEBPACK_IMPORTED_MODULE_8__ionic_cloud_angular__["a" /* Auth */]])
    ], Detail);
    return Detail;
}());
//https://www.raymondcamden.com/2016/11/17/a-social-example-of-ionic-auth
//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Success; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_cloud_angular__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Success = (function () {
    function Success(navCtrl, global, viewCtrl, params, user, modalCtrl, plt) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.plt = plt;
        this.from = this.params.get("from");
    }
    Success.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Success.prototype.back = function () {
        this.navCtrl.pop();
    };
    Success = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'success',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/dialog/success.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n		Oh yes...\n    </ion-title> \n  </ion-toolbar>\n</ion-header>\n<ion-content>\n	<br />\n	<div class="centraTutto"  style="text-align: center; color: #2cb5e8;">\n		<br />\n		<button *ngIf="!global._isiOS" style="font-size: 150px; color: #2cb5e8; background-color: white;">\n			<ion-icon   ios="ios-happy" md="md-happy"></ion-icon>\n		</button><br />\n		<button  *ngIf="global._isiOS" style="font-size: 70px; color: #2cb5e8; background-color: white;">\n			<ion-icon   ios="ios-happy" md="md-happy"></ion-icon>\n		</button><br />\n		<span  style="text-align: center; font-size: 40px; color: #2cb5e8;" >That\'s great! Your place has been insert!</span><br />\n		<span  style="text-align: center; font-size: 20px; color: #2cb5e8;" >thank you for your contribution, other users will find it useful...</span>\n	</div>\n	\n	<br />\n	<div class="centraTutto"  style="text-align: center;">\n		<ion-buttons start>\n		  <button ion-button (click)="dismiss()" class="buttonNavSenzaFont">\n			<span ion-text color="white">Cancel  </span>\n			<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n		  </button>\n		</ion-buttons>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/dialog/success.html"*/,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_cloud_angular__["e" /* User */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], Success);
    return Success;
}());
//# sourceMappingURL=success.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DettaglioOrganizzazioni; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ricerca_detail__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DettaglioOrganizzazioni = (function () {
    function DettaglioOrganizzazioni(navCtrl, global, params, cittaLuogoService, modalCtrl, loading, plt) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.params = params;
        this.cittaLuogoService = cittaLuogoService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.plt = plt;
        this.luoghiOrganizzazione = [];
        this.navOptions = {
            animate: true,
            animation: 'wp-transition'
        };
        this.luoghiOrganizzazione = params.get("luoghiOrganizzazione");
        this.item = params.get("organizzazione");
        alert(this.luoghiOrganizzazione);
        console.log(this.luoghiOrganizzazione);
        console.log(">>>>>>>>>>>");
        if (this.luoghiOrganizzazione == null) {
            this.caricaLuoghiPerOrg(this.item);
        }
    }
    DettaglioOrganizzazioni.prototype.caricaLuoghiPerOrg = function (organizzazione) {
        var _this = this;
        this.cittaLuogoService.getLuogoForIdOrganizzazione(organizzazione._id).then(function (data) {
            if (data != "error") {
                data.listaLuoghi.forEach(function (element) {
                    console.log(element);
                    _this.cittaLuogoService.getLuogoForId(element.luogo_id).then(function (data) {
                        _this.luoghiOrganizzazione.push(data);
                    });
                });
            }
            _this.loader.dismiss();
        });
    };
    DettaglioOrganizzazioni.prototype.selectPlace = function (idPlace) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__ricerca_detail__["a" /* Detail */], {
            idLuogo: idPlace
        }, this.navOptions);
    };
    DettaglioOrganizzazioni.prototype.back = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
        this.navCtrl.popToRoot();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], DettaglioOrganizzazioni.prototype, "content", void 0);
    DettaglioOrganizzazioni = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'dettaglioOrganizzazioni',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/dettaglioOrganizzazioni.html"*/'<ion-header class="colorPersonal">\n	<ion-navbar>\n		<ion-title>\n			{{global.title}}\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding style="text-align: center;">\n\n	<ion-fab right bottom>\n		<button mini (click)="scrollToBottom()" ion-fab color="personal3"><ion-icon name="arrow-dropdown"></ion-icon></button>\n	</ion-fab>\n\n	Member friends: <br />\n	<ion-card tappable style="width: 100%; margin-left: 0; margin-bottom: 10px; text-align: left;">\n		<ion-card-content>\n			<ion-card-title>\n				{{ item.nome }}, {{ item.citta }} <br /> {{ item.tipo }}\n			</ion-card-title>\n			<p>\n				{{ item.descrizione }} <br /> Where: {{ item.dove }} <br /> {{ item.telefono }}<br />\n				<a *ngIf="item.url_social" href="{{ item.url_social }}">\n					<ion-icon name="logo-facebook" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n				<a *ngIf="item.url_social_instagram" href="{{ item.url_social_instagram }}">\n					<ion-icon name="logo-instagram" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n			</p>\n		</ion-card-content>\n	</ion-card>\n	<br />\n	<br /> Where:\n	<br />\n	<ion-card *ngFor="let item of luoghiOrganizzazione" tappable style="" class="cardR" (click)="selectPlace(item._id)">\n		<!-- <img class="imgDetailLittle" *ngIf="item.foto != null" src="{{global.preUrl}}users/leggi/{{item.foto}}"/>-->\n\n		<ion-card-content>\n\n			<ion-card-title>\n				{{ item.nome }} {{ item.citta }}\n			</ion-card-title>\n			<h2><b>{{ item.provincia }} {{ item.nazione }}</b></h2>\n			<p>\n				{{ item.descrizione }} <br /> {{ item.orario }} {{ item.punto_risotro }} {{ item.via }}{{ item.sempreAperto }} {{ item.ricerca\n				}}\n			</p>\n			<div class="row">\n				<span *ngFor="let itemm of item.listaAttivita">\n				 <button *ngIf="itemm.selezionato" class="buttonNavSenzaFontRound" style="font-size:10px" ion-button icon-only>\n					 <ion-icon *ngIf="!itemm.img"  name="{{ itemm.nome }}"></ion-icon> \n					 <img *ngIf="itemm.img" src="{{global.preUrl}}/images/{{itemm.img}}"  style="" alt="" class="imgDetail altreIconaLittle">\n				 </button>\n			 </span>\n			</div><br />\n		</ion-card-content>\n		<ion-row no-padding>\n			<ion-col>\n\n			</ion-col>\n			<ion-col text-center>\n\n			</ion-col>\n			<ion-col text-right>\n				<button ion-button style="background-color: white; font-size:17px; font-weight: bold;" clear small color="personal3" icon-left>\n				 <ion-icon name=\'share-alt\'></ion-icon>\n				 Detail\n			 </button>\n			</ion-col>\n		</ion-row>\n	</ion-card>\n\n</ion-content>\n<ion-footer class="centraTutto">\n	<ion-toolbar style="color: white; font-size: 35px;">\n		<ion-title class="centraTutto">Follow us</ion-title>\n		<div class="centraTutto" style="padding-left: 15px;">\n			<a (click)="global.openSocial(\'facebook\')">\n				<ion-icon name="logo-facebook"></ion-icon>\n			</a>\n			<a (click)="global.openSocial(\'instagram\')">\n				<ion-icon data-href="https://www.instagram.com/aroundthewodapp/?hl=it" name="logo-instagram"></ion-icon>\n			</a>\n		</div>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/dettaglioOrganizzazioni.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], DettaglioOrganizzazioni);
    return DettaglioOrganizzazioni;
}());
//# sourceMappingURL=dettaglioOrganizzazioni.js.map

/***/ }),

/***/ 307:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 307;

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ricerca_ricerca__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autocomplete__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialog_dialogSocial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_success__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, global, viewCtrl, cittaLuogoService, modalCtrl, loading, plt) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.viewCtrl = viewCtrl;
        this.cittaLuogoService = cittaLuogoService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.plt = plt;
        this.splash = true;
        this.navOptions = {
            animate: true,
            animation: 'wp-transition'
        };
        this.address = {
            place: ''
        };
    }
    HomePage.prototype.info = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__dialog_dialogSocial__["a" /* DialogSocial */], { "from": "info" });
        modal.present();
    };
    HomePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () { return _this.splash = false; }, 4000);
    };
    HomePage.prototype.showAddressModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__autocomplete__["a" /* AutocompletePage */]);
        var me = this;
        modal.onDidDismiss(function (data) {
            if (data != null) {
                _this.allSearchPlace = data;
                _this.address.place = data.description;
                _this.ricerca(false);
            }
            else {
                return;
            }
        });
        modal.present();
    };
    HomePage.prototype.showAddressModal2 = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__dialog_success__["a" /* Success */], { "from": "login" });
        modal.onDidDismiss(function (data) {
        });
        modal.present();
    };
    HomePage.prototype.geolocalizza = function () {
        var _this = this;
        try {
            var loader_1 = this.loading.create({
                content: 'Please wait...',
            });
            loader_1.present();
            this.cittaLuogoService.localizza(loader_1).then(function (data) {
                if (data != "error") {
                    if (data.address_components[2]) {
                        _this.address.place = data.address_components[2].long_name;
                        _this.allSearchPlace = data;
                        _this.ricerca(true);
                    }
                }
                else {
                    alert("No data found");
                }
                loader_1.dismiss();
            });
        }
        catch (e) {
            alert("error" + e);
        }
    };
    HomePage.prototype.ricerca = function (flagPresent) {
        var _this = this;
        if (flagPresent) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__ricerca_ricerca__["a" /* Ricerca */], {
                citta: this.address.place,
                allSearchPlace: this.allSearchPlace
            }, this.navOptions);
        }
        else {
            if (this.address.place != "") {
                this.cittaLuogoService.localizzaByNome(this.address.place).then(function (data) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__ricerca_ricerca__["a" /* Ricerca */], {
                        citta: _this.address.place,
                        allSearchPlace: data
                    }, _this.navOptions);
                });
            }
            else {
                console.log("bloccato");
                return;
            }
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/home/home.html"*/'<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n  <div class="flb">\n    <div class="Aligner-item Aligner-item--top"></div>\n		<img src="assets/images/kedtwhite.png">\n    <div class="Aligner-item Aligner-item--bottom"></div>\n  </div>\n</div>\n\n<ion-header class="colorPersonal"  >\n  <ion-navbar>\n    <ion-title>\n      {{global.title}} sssss\n    </ion-title>\n	<ion-buttons end>\n		<button style="font-size: 30px;" (click)="info()" class="" ion-button>\n			<ion-icon name="md-information-circle"></ion-icon>\n		</button>\n	</ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<br /><br />\n	<div class="row">\n		<img src="assets/images/ket.jpg" class="img-circular centraTutto" style="border-radius: 100px; border: 1px solid #2cb5e8;" >\n		<br /><br />\n\n		<div class="centraTutto">\n		<div style="text-align: center; font-size: 18px;">Cerca una città o usa la tua posizione GPS</div><br />\n\n    <ion-input  color="personal3"  style="" class="centraTutto inputSearch" (click)="showAddressModal()" [(ngModel)]="address.place" type="text" placeholder="Pick a city"></ion-input>\n		</div>\n		<br />\n		<div style="text-align: center;">\n			<button (click)="ricerca()" ion-button icon-left class="buttonClass">\n			  <ion-icon name="search"></ion-icon>\n				Let\'s workout\n			</button> <button (click)="geolocalizza()"  ion-button class="buttonClass"><ion-icon class="colorPersonal buttonNav" style="color: white !important;" name="pin"></ion-icon></button>\n		</div>\n		<!-- <button (click)="showAddressModal2()"  ion-button class="centraTutto"><ion-icon name="locate"></ion-icon></button> -->\n	</div>\n\n</ion-content>\n <ion-footer class="centraTutto">\n  <ion-toolbar style="color: white; font-size: 35px;"  >\n	<ion-title class="centraTutto">Follow us</ion-title>\n	<div class="centraTutto" style="padding-left: 15px;">\n		<a (click)="global.openSocial(\'facebook\')" >\n			<ion-icon name="logo-facebook"></ion-icon>\n		</a>\n		<a (click)="global.openSocial(\'instagram\')" >\n			<ion-icon data-href="https://www.instagram.com/aroundthewodapp/?hl=it" name="logo-instagram"></ion-icon>\n		</a>\n	</div>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */]])
    ], HomePage);
    return HomePage;
}());
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Global = (function () {
    function Global(platform) {
        this.platform = platform;
        this.title = "AroundTheWOD App";
        if (navigator.language) {
            if (navigator.language.indexOf("it") > -1) {
                this.language = "it";
            }
            else {
                this.language = "en";
            }
        }
        //alert(this.language);
        this._isAndroid = platform.is('android');
        this._isiOS = platform.is('ios');
        if (this.platform.is('core')) {
            this.preUrl = 'provaV2/';
        }
        else {
            this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
        }
    }
    Global.prototype.openSocial = function (social) {
        if (social == 'facebook') {
            window.open('https://www.facebook.com/aroundthewodapp/?ref=aymt_homepage_panel');
        }
        else {
            window.open('https://www.instagram.com/aroundthewodapp/?hl=it');
        }
    };
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], Global);
    return Global;
}());
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Organizzazioni; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ricerca_dettaglioOrganizzazioni__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Organizzazioni = (function () {
    function Organizzazioni(navCtrl, global, params, cittaLuogoService, modalCtrl, loading, plt) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.params = params;
        this.cittaLuogoService = cittaLuogoService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.plt = plt;
        this.listaRaccordo = [];
        this.navOptions = {
            animate: true,
            animation: 'wp-transition'
        };
        this.citta = params.get("citta");
        this.caricaOrganizzazioni(this.citta);
    }
    Organizzazioni.prototype.caricaOrganizzazioni = function (citta) {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.loader.present();
        this.cittaLuogoService.loadOrganizzazioni(this.citta).then(function (data) {
            if (data != "error") {
                console.log(data);
                _this.listaOrganizzazioni = data;
            }
            _this.loader.dismiss();
        });
    };
    Organizzazioni.prototype.goDetail = function (org) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__ricerca_dettaglioOrganizzazioni__["a" /* DettaglioOrganizzazioni */], {
            luoghiOrganizzazione: this.listaRaccordo,
            organizzazione: org
        }, this.navOptions);
    };
    Organizzazioni.prototype.selectOrg = function (org) {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.listaRaccordo = [];
        this.loader.present();
        this.cittaLuogoService.getLuogoForIdOrganizzazione(org._id).then(function (data) {
            if (data != "error") {
                data.listaLuoghi.forEach(function (element) {
                    console.log(element);
                    _this.cittaLuogoService.getLuogoForId(element.luogo_id).then(function (data) {
                        _this.listaRaccordo.push(data);
                        _this.goDetail(org);
                    });
                });
            }
            _this.loader.dismiss();
        });
    };
    Organizzazioni.prototype.scrollToBottom = function () {
        this.content.scrollToBottom();
    };
    Organizzazioni.prototype.back = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
        this.navCtrl.popToRoot();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Organizzazioni.prototype, "content", void 0);
    Organizzazioni = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'organizzazioni',template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/organizzazioni.html"*/'<ion-header class="colorPersonal">\n	<ion-navbar>\n		<ion-title>\n			{{global.title}}\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding style="text-align: center;">\n\n	<ion-fab right bottom>\n		<button mini (click)="scrollToBottom()" ion-fab color="personal3"><ion-icon name="arrow-dropdown"></ion-icon></button>\n	</ion-fab>\n	Your search: <br />\n	<ion-chip>\n		<ion-label>{{citta}}</ion-label>\n	</ion-chip>\n	<br />\n	<br /> Our friends: <br />\n	<ion-card *ngFor="let item of listaOrganizzazioni" (click)="selectOrg(item)" tappable style="width: 100%; margin-left: 0; margin-bottom: 10px; text-align: left;">\n		<ion-card-content>\n			<ion-card-title>\n				{{ item.nome }}, {{ item.citta }} <br /> {{ item.tipo }}\n			</ion-card-title>\n			<p>\n				{{ item.descrizione }} <br /> Where: {{ item.dove }} <br /> {{ item.telefono }}<br />\n				<a *ngIf="item.url_social" href="{{ item.url_social }}">\n					<ion-icon name="logo-facebook" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n				<a *ngIf="item.url_social_instagram" href="{{ item.url_social_instagram }}">\n					<ion-icon name="logo-instagram" color="personal3" style="font-size: 50px;"></ion-icon>\n				</a>\n			</p>\n		</ion-card-content>\n	</ion-card>\n\n	<div class="textNoResults" *ngIf="!listaOrganizzazioni">\n		<ion-icon ios="ios-sad" md="md-sad"></ion-icon>\n		No results found for this place...\n	</div>\n</ion-content>\n<ion-footer class="centraTutto">\n	<ion-toolbar style="color: white; font-size: 35px;">\n		<ion-title class="centraTutto">Follow us</ion-title>\n		<div class="centraTutto" style="padding-left: 15px;">\n			<a (click)="global.openSocial(\'facebook\')">\n				<ion-icon name="logo-facebook"></ion-icon>\n			</a>\n			<a (click)="global.openSocial(\'instagram\')">\n				<ion-icon data-href="https://www.instagram.com/aroundthewodapp/?hl=it" name="logo-instagram"></ion-icon>\n			</a>\n		</div>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/pages/ricerca/organizzazioni.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_citta_luogo_service__["a" /* CittaLuogoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], Organizzazioni);
    return Organizzazioni;
}());
//# sourceMappingURL=organizzazioni.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(729);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_autocomplete__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_ricerca_ricerca__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ricerca_organizzazioni__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ricerca_detail__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dialog_dialogSocial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_ricerca_dettaglioOrganizzazioni__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dialog_success__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_cloud_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_global__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_native__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var cloudSettings = {
    'core': {
        'app_id': 'f33b26b8'
    },
    'auth': {
        'google': {
            'webClientId': '923547097240-vj2comu32e960c7rr6h9sccrpsiihhef.apps.googleusercontent.com',
            'scope': ['profile']
        },
        'facebook': {
            'scope': ['public_profile']
        }
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_ricerca_ricerca__["a" /* Ricerca */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_autocomplete__["a" /* AutocompletePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_ricerca_organizzazioni__["a" /* Organizzazioni */],
                __WEBPACK_IMPORTED_MODULE_9__pages_ricerca_dettaglioOrganizzazioni__["a" /* DettaglioOrganizzazioni */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ricerca_detail__["a" /* Detail */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dialog_dialogSocial__["a" /* DialogSocial */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dialog_success__["a" /* Success */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_11__ionic_cloud_angular__["b" /* CloudModule */].forRoot(cloudSettings)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_ricerca_ricerca__["a" /* Ricerca */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_autocomplete__["a" /* AutocompletePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ricerca_detail__["a" /* Detail */],
                __WEBPACK_IMPORTED_MODULE_9__pages_ricerca_dettaglioOrganizzazioni__["a" /* DettaglioOrganizzazioni */],
                __WEBPACK_IMPORTED_MODULE_6__pages_ricerca_organizzazioni__["a" /* Organizzazioni */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dialog_dialogSocial__["a" /* DialogSocial */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dialog_success__["a" /* Success */]
            ],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_12__services_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* Storage */], __WEBPACK_IMPORTED_MODULE_14_ionic_native__["h" /* Toast */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(556);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, storage) {
        var _this = this;
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.storage.set('versionAndroid', __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Device */].version).then(function () {
                console.log('Name has been set');
            });
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* StatusBar */].styleDefault();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["f" /* Splashscreen */].hide();
        });
    }
    MyApp.prototype.registerBackButtonListener = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({template:/*ion-inline-start:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/nicolaguerrieri/Desktop/applicazioni JavaScript/aroundNew/AroundTheWODMobile/src/app/app.html"*/,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* Storage */]])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CittaLuogoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CittaLuogoService = (function () {
    function CittaLuogoService(http, platform, loading, googleAuth, facebookAuth, auth) {
        this.http = http;
        this.platform = platform;
        this.loading = loading;
        this.googleAuth = googleAuth;
        this.facebookAuth = facebookAuth;
        this.auth = auth;
        this.preUrl = "";
        if (this.platform.is('core')) {
            this.preUrl = 'provaV2/';
        }
        else {
            this.preUrl = 'http://app.nicolaguerrieri.it:3000/';
        }
    }
    //https://apps.ionic.io/login
    CittaLuogoService.prototype.load = function (citta) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getListaForCity?citta=' + citta).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data.listaLuoghi;
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
        //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
    };
    CittaLuogoService.prototype.loadOrganizzazioni = function (citta) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getOrganizzazioni?citta=' + citta).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data.listaLuoghi;
                console.log(data);
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
        //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
    };
    CittaLuogoService.prototype.loadAttivita = function () {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'attivita').map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data.listaAttivita;
                console.log(data);
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
        //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
    };
    CittaLuogoService.prototype.save = function (luogo) {
        var _this = this;
        if (!luogo) {
            alert("errore luogo service");
            return;
        }
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            var body = JSON.stringify(luogo);
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post(_this.preUrl + 'users/upload', body, options).subscribe(function (data) {
                resolve(data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
    };
    CittaLuogoService.prototype.getLuogoForId = function (idLuogo) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getLuogoById?idLuogo=' + idLuogo).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data.luogo;
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
    };
    CittaLuogoService.prototype.getLuogoForIdOrganizzazione = function (idOrganizzazione) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getRaccordo?idOrganizzazione=' + idOrganizzazione).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
    };
    CittaLuogoService.prototype.getOrgById = function (idOrganizzazione) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getOrganizzazione?idOrganizzazione=' + idOrganizzazione).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
    };
    CittaLuogoService.prototype.getLuogoForIdLuogo = function (idLuogo) {
        var _this = this;
        this.data = null;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.preUrl + 'getRaccordoByLuogo?idLuogo=' + idLuogo).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (err) { return console.error(">>" + err); }, function () { return console.log('done'); });
        });
    };
    CittaLuogoService.prototype.localizzaByNome = function (ricerca) {
        return new Promise(function (resolve) {
            var geocoder = new google.maps.Geocoder();
            if (ricerca != "") {
                geocoder.geocode({ 'address': ricerca }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.dataLocalizzazione = results[0];
                        resolve(this.dataLocalizzazione);
                    }
                }, function (error) {
                    alert("Error localization");
                    resolve("error");
                });
            }
        });
        //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
    };
    CittaLuogoService.prototype.localizza = function (loader) {
        var _this = this;
        if (this.dataLocalizzazione) {
            alert("mica qui");
            return Promise.resolve(this.dataLocalizzazione);
        }
        return new Promise(function (resolve) {
            if (_this.platform.is('android')) {
                cordova.plugins.diagnostic.isGpsLocationEnabled(function (enabled) {
                    if (!enabled) {
                        alert("Please enable GPS localization");
                        cordova.plugins.diagnostic.switchToLocationSettings();
                        return;
                    }
                });
            }
            var geocoder;
            geocoder = new google.maps.Geocoder();
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["c" /* Geolocation */].getCurrentPosition().then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            this.dataLocalizzazione = results[0];
                            resolve(this.dataLocalizzazione);
                        }
                        else {
                            alert("error");
                        }
                    }
                });
            }, function (error) {
                alert("Please enable GPS localization");
                resolve("error");
            });
        });
        //http://pointdeveloper.com/how-to-bypass-cors-errors-on-chrome-and-firefox-for-testing/
    };
    CittaLuogoService.prototype.loginSocial = function (social) {
        var _this = this;
        return new Promise(function (resolve) {
            try {
                if (!_this.platform.is('core')) {
                    if (social == 'google') {
                        _this.googleAuth.login().then(function (dataSocial) {
                            _this.dataLocalizzazione = dataSocial;
                            resolve(_this.dataLocalizzazione);
                        }, function (error) {
                            alert(error);
                        });
                    }
                    else if (social == 'instagram') {
                        _this.auth.login('instagram').then(function (dataSocial) {
                            _this.dataLocalizzazione = dataSocial;
                            resolve(_this.dataLocalizzazione);
                        }, function (error) {
                            alert(error);
                        });
                    }
                    else if (social == 'facebook') {
                        _this.facebookAuth.login().then(function (dataSocial) {
                            _this.dataLocalizzazione = dataSocial;
                            resolve(_this.dataLocalizzazione);
                        }, function (error) {
                            alert(error);
                        });
                    }
                }
                else {
                    _this.dataLocalizzazione = "daBrowser";
                    resolve(_this.dataLocalizzazione);
                }
            }
            catch (e) {
                alert("error: " + e);
            }
        });
    };
    CittaLuogoService.prototype.loadMap = function (cittaResult) {
        if (this.dataLocalizzazione) {
            alert("mica qui");
            return Promise.resolve(this.dataLocalizzazione);
        }
        return new Promise(function (resolve) {
            try {
                console.log("loadMap " + cittaResult);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': cittaResult }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            this.dataLocalizzazione = results[0];
                            resolve(this.dataLocalizzazione);
                        }
                        else {
                            alert("error");
                        }
                    }
                });
            }
            catch (e) {
                alert("error: " + e);
            }
        });
    };
    CittaLuogoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["d" /* GoogleAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["c" /* FacebookAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["a" /* Auth */]])
    ], CittaLuogoService);
    return CittaLuogoService;
}());
//# sourceMappingURL=citta-luogo-service.js.map

/***/ })

},[635]);
//# sourceMappingURL=main.js.map