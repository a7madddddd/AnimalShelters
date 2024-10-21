import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './newProject9/nav-bar/nav-bar.component';
import { RegesterComponent } from './newProject9/Lujain/regester/regester.component';

@NgModule({
  declarations: [
    AppComponent,
    RegesterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
