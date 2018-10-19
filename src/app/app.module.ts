import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { CreateItineraryComponent } from './itinerary/create-itinerary/create-itinerary.component';
import { LoginComponent } from './accounts/login/login.component';
import { LogoutComponent } from './accounts/logout/logout.component';
import { AppRoutingModule } from './app.routing.module';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { SelectLocationListComponent } from './layout/modals/select-location-list/select-location-list.component';
import { SortablejsModule } from 'angular-sortablejs';
import { AgmCoreModule } from '@agm/core'; // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { AddressUtilService } from './_services/address-util.service';
import { HttpClientModule } from '@angular/common/http';
import { TaxiCalculatorComponent } from './taxi-calculator/taxi-calculator.component';
import { PlaceDetailsComponent } from './itinerary/place-details/place-details.component';
import { CollapseModule } from 'ngx-bootstrap';
import { PlacePhotosComponent } from './itinerary/place-photos/place-photos.component';
import { HomeComponent } from './home/home.component';
import { ViewItineraryComponent } from './itinerary/view-itinerary/view-itinerary.component';
import { ItineraryService } from './_services/itinerary.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SearchItineraryComponent } from './itinerary/search-itinerary/search-itinerary.component';
import { EditItineraryComponent } from './itinerary/edit-itinerary/edit-itinerary.component';
import { AccountsService } from './_services/accounts.service';
import { RegisterComponent } from './accuonts/register/register.component';
import { AccountManageComponent } from './accuonts/account-manage/account-manage.component';
import { EventsComponent } from './events/events.component';
import { PhotoLoaderComponent } from './photo-loader/photo-loader.component';
import { NearbyPlacesComponent } from './itinerary/nearby-places/nearby-places.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CarouselModule } from 'ngx-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InstructionsComponent } from './itinerary/instructions/instructions.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    CreateItineraryComponent,
    LoginComponent,
    LogoutComponent,
    LocationListComponent,
    SelectLocationListComponent,
    TaxiCalculatorComponent,
    PlaceDetailsComponent,
    PlacePhotosComponent,
    HomeComponent,
    ViewItineraryComponent,
    SearchItineraryComponent,
    EditItineraryComponent,
    RegisterComponent,
    AccountManageComponent,
    EventsComponent,
    PhotoLoaderComponent,
    NearbyPlacesComponent,
    AdminComponent,
    InstructionsComponent
  ],
  imports: [
    HttpClientModule,
    DragScrollModule,
    NgxDatatableModule,
    FormsModule,
    SortablejsModule.forRoot({ animation: 150 }),
    SweetAlert2Module.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpGX7ayckqbcHZMdJFmawMS4kJmh_HvHs'
    }),
    AgmDirectionModule,
    NgProgressModule.forRoot({
      color: '#FFBB41'
    }),
    NgProgressRouterModule.forRoot(),
    NgProgressHttpModule
  ],
  providers: [AddressUtilService, ItineraryService, AccountsService],
  entryComponents: [SelectLocationListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
