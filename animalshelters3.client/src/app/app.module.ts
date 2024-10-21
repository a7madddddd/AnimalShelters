import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './newProject9/test/test.component';
import { RegesterComponent } from './newProject9/regester/regester.component';
import { NavBarComponent } from './newProject9/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
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
