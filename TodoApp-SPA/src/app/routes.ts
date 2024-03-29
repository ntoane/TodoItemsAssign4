import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemOverdueComponent } from './items/item-overdue/item-overdue.component';
import { AuthGuard } from './_guards/auth.guard';
import { ItemListResolver } from './_resolvers/item-list.resolver';
import { ItemOverdueResolver } from './_resolvers/item-overdue.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'newitem', component: ItemAddComponent },
            { path: 'itemlists', component: ItemListComponent, resolve: { items: ItemListResolver }},
            { path: 'overdueitems', component: ItemOverdueComponent, resolve: {items: ItemOverdueResolver}},
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
