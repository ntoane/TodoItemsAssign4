import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { appRoutes } from './routes';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemOverdueComponent } from './items/item-overdue/item-overdue.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ItemService } from './_services/item.service';
import { ItemListResolver } from './_resolvers/item-list.resolver';
import { ItemOverdueResolver } from './_resolvers/item-overdue.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ContactComponent,
      ItemAddComponent,
      ItemListComponent,
      ItemOverdueComponent,
      ItemDetailComponent,
      ItemEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      FontAwesomeModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      PaginationModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ItemService,
      ErrorInterceptorProvider,
      ItemListResolver,
      ItemOverdueResolver
   ],
   entryComponents: [
      ItemDetailComponent,
      ItemEditComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
