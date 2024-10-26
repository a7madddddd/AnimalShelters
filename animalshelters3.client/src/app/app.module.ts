import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegesterComponent } from './newProject9/Lujain/regester/regester.component';
import { NavBarComponent } from './newProject9/nav-bar/nav-bar.component';
import { FooterComponent } from './newProject9/footer/footer.component';
import { HomeComponent } from './newProject9/Qadomi/home/home.component';
import { RouterModule } from '@angular/router';
import { AdoptionComponent } from './newProject9/Rania/adoption/adoption.component';
import { SheltersComponent } from './newProject9/A7mad/shelters/shelters.component';
import { AboutUSComponent } from './newProject9/Qadomi/about-us/about-us.component';
import { PostCommunityuserComponent } from './Communityuser/post-communityuser/post-communityuser.component';
import { AnimalCategoryComponent } from './newProject9/Rania/animal-category/animal-category.component';
import { LoginComponent } from './newProject9/Lujain/login/LoginComponent';
import { ContactUsComponent } from './newProject9/Qadomi/contact-us/contact-us.component';
import { ProfileComponent } from './newProject9/Lujain/profile/profile.component';
import { AnimalsComponent } from './newProject9/A7mad/animals/animals.component';
import { AddSheltersComponent } from './newProject9/A7mad/add-shelters/add-shelters.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { GetAllSheltersComponent } from './newProject9/A7mad/get-all-shelters/get-all-shelters.component';
import { DetailsComponent } from './newProject9/Lujain/details/details.component';
import { EditProfileComponent } from './newProject9/Lujain/edit-profile/edit-profile.component';
import { CategoriesComponent } from './newProject9/Rania/categories/categories.component';
import { EditSheltersComponent } from './newProject9/A7mad/edit-shelters/edit-shelters.component';
import { ContactComponent } from './Admin/contact/contact.component';
import { GetAllUsersComponent } from './Admin/get-all-users/get-all-users.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
//import { AdminAdoptionComponent } from './Admin/admin-adoption/admin-adoption.';
import { AllAdoptionsComponent } from './Admin/all-adoptions/all-adoptions.component';
import { EditAdoptionComponent } from './newProject9/A7mad/edit-adoption/edit-adoption.component';
import { QadomiShelterComponent } from './newProject9/Qadomi/qadomi-shelter/qadomi-shelter.component';


@NgModule({
  declarations: [
    AppComponent,
    RegesterComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    SheltersComponent,
    PostCommunityuserComponent,
    AnimalCategoryComponent,
    AboutUSComponent,
    ContactUsComponent,
    LoginComponent,
    AdoptionComponent,
    ProfileComponent,
    EditProfileComponent,
    AddSheltersComponent,
    EditProfileComponent,
    DashboardComponent,
    GetAllSheltersComponent,
    AddSheltersComponent,
    DashboardComponent,
    GetAllSheltersComponent,
    AnimalsComponent,
    DetailsComponent,
    CategoriesComponent,
    EditSheltersComponent,
    CategoriesComponent,
    ContactComponent,
    AdoptionComponent,
    GetAllUsersComponent,
    AdminLoginComponent,
    //AdminAdoptionComponent,
    AllAdoptionsComponent,
    EditAdoptionComponent,
    QadomiShelterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Register', component: RegesterComponent },
      { path: 'animal', component: AnimalCategoryComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'EditProfile/:id', component: EditProfileComponent },
      { path: 'details/:id', component: DetailsComponent },
      {path: 'ShelterInHome', component: QadomiShelterComponent},

      { path: 'Shelters', component: SheltersComponent },
      { path: 'Animal/:shelterId', component: AnimalCategoryComponent },
      { path: 'Shelters', component: SheltersComponent },
      { path: 'AboutUs', component: AboutUSComponent },
      { path: 'Shelters', component: SheltersComponent },
      { path: 'post-communityuser', component: PostCommunityuserComponent },
      { path: 'adoption/:id', component: AdoptionComponent },
      { path: 'Add Shelters', component: AddSheltersComponent },
      { path: 'admin', component: AdminLoginComponent },




      { path: 'post-communityuser', component: PostCommunityuserComponent },
      { path: 'ContactUs', component: ContactUsComponent },
      {
        path: 'adminDashboard', component: DashboardComponent, children: [
          { path: 'ContactAdmin', component: ContactComponent },
          { path: 'AllUsers', component: GetAllUsersComponent },

          { path: 'Add Shelters', component: AddSheltersComponent },
      
          { path: 'All Shelter', component: GetAllSheltersComponent },
          { path: 'Edit Shelter/:id', component: EditSheltersComponent },
          { path: 'Edit Adoption/:id', component: EditAdoptionComponent },
          { path: 'All Adoption', component: AllAdoptionsComponent },
        ]
      }

    ])


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
