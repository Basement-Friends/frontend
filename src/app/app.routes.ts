import { Route } from '@angular/router';
import { SwipeViewComponent } from './scenes/swipe-view/swipe-view.component';
import { HomeComponent } from './scenes/home/home.component';
import { LoginComponent } from './scenes/login/login.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'swiping', component: SwipeViewComponent}
];
