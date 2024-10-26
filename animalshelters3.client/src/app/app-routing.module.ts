import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalCategoryComponent } from './newProject9/Rania/animal-category/animal-category.component'; // Import the component

const routes: Routes = [




  { path: 'animal', component: AnimalCategoryComponent }, // Add this route for the component





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
