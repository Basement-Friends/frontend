import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { MaterialsModule } from './modules/materials.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { HomeComponent } from './scenes/home/home.component';
import { SwipeViewComponent } from './scenes/swipe-view/swipe-view.component';
import { TallyComponent } from './components/tally/tally.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './scenes/login/login.component';
import { SwipeSettingsComponent } from './scenes/swipe-settings/swipe-settings.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './scenes/userDashboard/user-dashboard.component';
import { RegisterComponent } from './scenes/register/register.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { GamesComponent } from './components/games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    HomeComponent,
    SwipeViewComponent,
    TallyComponent,
    LoginComponent,
    SwipeSettingsComponent,
    UserDashboardComponent,
    RegisterComponent,
    GamesComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}