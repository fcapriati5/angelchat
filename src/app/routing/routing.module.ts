import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { EntityComponent } from '../entity/entity.component';
import { IntentComponent } from '../intent/intent.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: 'entities', component: EntityComponent },
  { path: 'intents', component: IntentComponent },
  { path: '', component: LoginComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
