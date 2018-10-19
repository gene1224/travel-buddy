import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { CreateItineraryComponent } from './itinerary/create-itinerary/create-itinerary.component';
import { LoginComponent } from './accounts/login/login.component';
import { LogoutComponent } from './accounts/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ViewItineraryComponent } from './itinerary/view-itinerary/view-itinerary.component';
import { SearchItineraryComponent } from './itinerary/search-itinerary/search-itinerary.component';
import { EditItineraryComponent } from './itinerary/edit-itinerary/edit-itinerary.component';
import { RegisterComponent } from './accuonts/register/register.component';
import { AccountManageComponent } from './accuonts/account-manage/account-manage.component';
import { EventsComponent } from './events/events.component';
import { AdminComponent } from './admin/admin.component';
import { InstructionsComponent } from './itinerary/instructions/instructions.component';

const routes: Routes = [
  {
    path: 'itinerary',
    runGuardsAndResolvers: 'always',
    component: DefaultLayoutComponent,
    canActivate: [],
    children: [
      {
        path: 'create',
        component: CreateItineraryComponent
      },
      {
        path: 'view/:uid',
        component: ViewItineraryComponent
      },
      {
        path: 'edit/:uid',
        component: CreateItineraryComponent
      },
      {
        path: 'copy/:uid',
        component: CreateItineraryComponent
      },
      {
        path: 'search',
        component: SearchItineraryComponent
      },
      {
        path: 'instructions',
        component: InstructionsComponent
      }
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: DefaultLayoutComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'account-management',
        component: AccountManageComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [];
