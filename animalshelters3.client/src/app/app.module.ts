import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegesterComponent } from './newProject9/Lujain/regester/regester.component';
import { NavBarComponent } from './newProject9/nav-bar/nav-bar.component';
import { FooterComponent } from './newProject9/footer/footer.component';
import { HomeComponent } from './newProject9/AOQ/home/home.component';
import { RouterModule } from '@angular/router';
import { SheltersComponent } from './newProject9/A7mad/shelters/shelters.component';
import { AboutUsComponent } from './newProject9/AOQ/about-us/about-us.component';
import { AboutComponent } from './newProject9/AOQ/about/about.component';
import { ContactUsComponent } from './newProject9/AOQ/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    RegesterComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    SheltersComponent,
    AboutUsComponent,
    AboutComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Register', component: RegesterComponent },
      { path: 'Shelters', component: SheltersComponent }
    ])


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
