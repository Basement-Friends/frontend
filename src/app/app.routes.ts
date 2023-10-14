import { Route } from '@angular/router';
import { SwipeViewComponent } from './scenes/swipe-view/swipe-view.component';
import { HomeComponent } from './scenes/home/home.component';
import { LoginComponent } from './scenes/login/login.component';
import { SwipeSettingsComponent } from './scenes/swipe-settings/swipe-settings.component';
import { LoginGuard } from './guards/login.guard';


export const appRoutes: Route[] = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'swipesetting', canActivate: [LoginGuard], component: SwipeSettingsComponent},
    { path: 'swiping', canActivate: [LoginGuard], component: SwipeViewComponent}
];
