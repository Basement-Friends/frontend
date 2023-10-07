import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { MaterialsModule } from './modules/materials.module';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { HomeComponent } from './pages/home/home.component';
import { SwipeViewComponent } from './pages/swipe-view/swipe-view.component';
import { TallyComponent } from './components/tally/tally.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    HomeComponent,
    SwipeViewComponent,
    TallyComponent,
  ],
  imports: [MaterialsModule, BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
