import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegesterComponent } from './newProject9/Lujain/regester/regester.component';
import { NavBarComponent } from './newProject9/nav-bar/nav-bar.component';
import { FooterComponent } from './newProject9/footer/footer.component';
import { HomeComponent } from './newProject9/Qadomi/home/home.component';
import { RouterModule } from '@angular/router';
import { SheltersComponent } from './newProject9/A7mad/shelters/shelters.component';
import { AboutUSComponent } from './newProject9/Qadomi/about-us/about-us.component';
import { PostCommunityuserComponent } from './Communityuser/post-communityuser/post-communityuser.component';


@NgModule({
  declarations: [
    AppComponent,
    RegesterComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    SheltersComponent,
    AboutUSComponent,
    PostCommunityuserComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Register', component: RegesterComponent },
      { path: 'Shelters', component: SheltersComponent },
      { path: 'AboutUs', component: AboutUSComponent },
      { path: 'Shelters', component: SheltersComponent },
      { path: 'post-communityuser', component:PostCommunityuserComponent  },


    ])


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
