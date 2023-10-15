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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './scenes/userDashboard/user-dashboard.component';
import { RegisterComponent } from './scenes/register/register.component';

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
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
