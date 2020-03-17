// Angular Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule, routingComponents } from "./app-routing.module";

// Angular Material Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Components
import { AppComponent } from "./app.component";
import { AffordableResultsComponent } from "./affordable-results/affordable-results.component";
import { FilterSearchComponent } from "./filter-search/filter-search.component";
import { ResultsListComponent } from "./results-list/results-list.component";
import { ClientOffersComponent } from "./client-offers/client-offers.component";
import { ClientProfileComponent } from "./client-profile/client-profile.component";
import { HeaderComponent } from "./header/header.component";
import { SuitableComponent } from "./suitable/suitable.component";
import { ChatFormComponent } from "./chat-form/chat-form.component";
import { ChatwindowComponent } from "./chatwindow/chatwindow.component";
import { FeedComponent } from "./feed/feed.component";
import { MessageComponent } from "./message/message.component";
import { CarInformationComponent } from "./car-information/car-information.component";
import { CarResultComponent } from "./car-result/car-result.component";
import { SelectCarComponent } from "./select-car/select-car.component";
import { SuitabilitySearchComponent } from "./suitability-search/suitability-search.component";
import { AffordabilitySearchComponent } from "./affordability-search/affordability-search.component";
import { NewsletterComponent } from "./newsletter/newsletter.component";
import { CarCarouselComponent } from "./car-carousel/car-carousel.component";
import { BookATestDriveComponent } from "./book-a-test-drive/book-a-test-drive.component";
import { ThreadsComponent } from "./threads/threads.component";
import { ChatsComponent } from "./chats/chats.component";
import { ActiveUsersComponent } from "./active-users/active-users.component";
import { MessageFeedComponent } from "./message-feed/message-feed.component";
import { FourrandomcarsComponent } from "./fourrandomcars/fourrandomcars.component";
import { BannerAdComponent } from "./banner-ad/banner-ad.component";
import { TopBannerComponent } from "./top-banner/top-banner.component";
import { SearchOptionsComponent } from "./search-options/search-options.component";
import { ImageDialogComponent } from "./image-dialog/image-dialog.component";
import { GetCarInformationComponent } from "./get-car-information/get-car-information.component";
import { ShowroomCarsComponent } from "./showroom-cars/showroom-cars.component";
import { SpecialCarsComponent } from './special-cars/special-cars.component';

// Services
import { ChatService } from "./services/chat.service";
import { WebSocketService } from "./services/web-socket.service";
import { SearchService } from "./services/search.service";
import { LoginService } from "./services/login.service";
import { UtilService } from "./services/util.service";
import { ApiMethodsService } from "./services/api-methods.service";
import { AuthService } from "./services/auth.service";
import { ConstantsService } from "./services/constants.service";
import { GeneralService } from "./services/general/general.service";

// Other third-party modules
import { NgxPaginationModule } from "ngx-pagination";
import { StorageServiceModule } from "angular-webstorage-service";
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ToastrModule } from "ngx-toastr";

// Angular Material
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { NguCarouselModule } from "@ngu/carousel";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

// Loading bar
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { ImageZoomModule } from "angular2-image-zoom";
import { InlineSVGModule } from "ng-inline-svg";

// Bootstrap
import { MDBBootstrapModule } from "angular-bootstrap-md";

// Angular Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// Pipes
import { SortByPipe } from "./pipes/sort-by.pipe";

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgUniversalModule } from '@trilon/ng-universal';

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
    SortByPipe,
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
    FourrandomcarsComponent,
    BannerAdComponent,
    TopBannerComponent,
    SearchOptionsComponent,
    ImageDialogComponent,
    GetCarInformationComponent,
    ShowroomCarsComponent,
    SpecialCarsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    IonRangeSliderModule,
    NgxPaginationModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ImageZoomModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    NguCarouselModule,
    NgxMaterialTimepickerModule.forRoot(),
    NgbDatepickerModule,
    MDBBootstrapModule,
    NgUniversalModule,
    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  providers: [
    ClientProfileComponent,
    SearchService,
    LoginService,
    UtilService,
    ChatService,
    WebSocketService,
    ApiMethodsService,
    ConstantsService,
    AuthService,
    GeneralService,
    NewsletterComponent,
    SuitabilitySearchComponent,
    ImageDialogComponent
  ],
  entryComponents: [ImageDialogComponent, GetCarInformationComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
        'on the server' : 'in the browser';
    console.log('Running ${platform} with appId=${appId}');
  }
}
