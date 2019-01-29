import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Inject } from '@angular/core';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MaterialModule } from './material';
import * as JQuery from 'jquery';
import {
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

// Angular Material Modules
// import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components
import { AffordableResultsComponent } from './affordable-results/affordable-results.component';
import { FilterSearchComponent } from './filter-search/filter-search.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { ClientOffersComponent } from './client-offers/client-offers.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { HeaderComponent } from './header/header.component';
import { CarimagesComponent } from './carimages/carimages.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SuitableComponent } from './suitable/suitable.component';
import {HomeComponent} from './home/home.component';
// Services
import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/web-socket.service';
import { SearchService } from './services/search.service';
import { LoginService } from './services/login.service';
import { UtilService } from './services/util.service';
import { ApiMethodsService } from './services/api-methods.service';
import { AuthService } from './services/auth.service';

// import third-party module
import { MDBBootstrapModule, ButtonsModule, WavesModule } from 'angular-bootstrap-md';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgProgressModule } from '@ngx-progressbar/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NouisliderModule } from 'ng2-nouislider';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { LoadingModule } from 'ngx-loading';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ImageZoomModule } from 'angular2-image-zoom';
import { InlineSVGModule } from 'ng-inline-svg';
import { EmailsComponent } from './emails/emails.component';
import { AffordabilityComponent } from './affordability/affordability.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// Add an icon to the library for convenient access in other components
// library.add(faCoffee, faInfoCircle);
// import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Pipes
import { SortByPipe } from './pipes/sort-by.pipe';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { ConstantsService } from './services/constants.service';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { CarResultComponent } from './car-result/car-result.component';
import { SelectCarComponent } from './select-car/select-car.component';
import { SuitabilitySearchComponent } from './suitability-search/suitability-search.component';
import { AffordabilitySearchComponent } from './affordability-search/affordability-search.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { CarCarouselComponent } from './car-carousel/car-carousel.component';
import { BookATestDriveComponent } from './book-a-test-drive/book-a-test-drive.component';
import { ThreadsComponent } from './threads/threads.component';
import { ChatsComponent } from './chats/chats.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { MessageFeedComponent } from './message-feed/message-feed.component';
import { ShowroomCarsComponent } from './showroom-cars/showroom-cars.component';
import { PasswordComponent } from './password/password.component';
import { LangingComponent } from './langing/langing.component';
import { LandingComponent } from './landing/landing.component';
import { FourrandomcarsComponent } from './fourrandomcars/fourrandomcars.component';
import { BannerAdComponent } from './banner-ad/banner-ad.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { SearchOptionsComponent } from './search-options/search-options.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FilterSearchComponent,
    ResultsListComponent,
    ClientOffersComponent,
    ClientProfileComponent,
    SuitableComponent,
    AffordableResultsComponent,
    HeaderComponent,
    EmailsComponent,
    SortByPipe,
    CarimagesComponent,
    CarouselComponent,
    ChatFormComponent,
    ChatwindowComponent,
    FeedComponent,
    MessageComponent,
    CarInformationComponent,
    CarResultComponent,
    SelectCarComponent,
    SuitabilitySearchComponent,
    AffordabilitySearchComponent,
    NewsletterComponent,
    CarCarouselComponent,
    BookATestDriveComponent,
    ThreadsComponent,
    ChatsComponent,
    ActiveUsersComponent,
    MessageFeedComponent,
    ShowroomCarsComponent,
    PasswordComponent,
    LangingComponent,
    LandingComponent,
    FourrandomcarsComponent,
    BannerAdComponent,
    TopBannerComponent,
    SearchOptionsComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    HttpClientModule,
    // AngularFontAwesomeModule,
    LoadingModule,
    FormsModule,
    TooltipModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    StorageServiceModule,
    // MatSnackBarModule,
    NouisliderModule,
    IonRangeSliderModule,
    MDBBootstrapModule.forRoot(),
    NgxContentLoadingModule,
    NgxPaginationModule,
    NgProgressModule.forRoot(),
    // AnimateOnScrollModule.forRoot(),
    SocketIoModule.forRoot(config),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarHttpModule,
    LoadingBarModule.forRoot(),
    NgxImageZoomModule.forRoot(),
    ImageZoomModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    NgxCarouselModule,
    NgxMaterialTimepickerModule.forRoot(),
    NgbDatepickerModule,
    MaterialModule,
    LightboxModule,
    MatButtonModule,
    MatCheckboxModule,
    PdfViewerModule
    // FontAwesomeModule
  ],
  providers: [
    HeaderComponent,
    ClientProfileComponent,
    SearchService,
    LoginService,
    UtilService,
    ChatService,
    WebSocketService,
    ApiMethodsService,
    ConstantsService,
    AuthService,
    AffordabilityComponent,
    NewsletterComponent,
    SuitabilitySearchComponent,
    HomeComponent,
    ImageDialogComponent
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [ ImageDialogComponent ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

  // constructor(update: SwUpdate, push: SwPush, snackbar: MatSnackBar) {

    // update.available.subscribe(update => {
    //   console.log('update available');
    //   const snack = snackbar.open('New car offer', 'Reload');

    //   snack.onAction().subscribe(() => {
    //     window.location.reload();
    //   });

    // });

    // push.messages.subscribe( (msg: any) => {
    //   console.log(msg);
    //   snackbar.open(JSON.stringify(msg));
    // });

    // const key = 'BLqOIE4Dh6Iac4pBEVO7Mt0e9eYwwn_sj80NPlk5atVQDE2SCayiWkU_tuJrBA1hB7PuWIvQekQ75PBt0CSJNkA';
    // push.requestSubscription({ serverPublicKey: key })
    //   .then(PushSubscription => {
    //     console.log(PushSubscription.toJSON());
    //   });
  // }
}
