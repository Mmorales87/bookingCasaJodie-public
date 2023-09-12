import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { TodoComponent } from './pages/todo/todo.component';
import { ApartmentService } from './apartment.service';
import { BookingComponent } from './pages/booking/booking.component';

const routes:  Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'apartments', component: ApartmentService },
  { path: 'booking', component: BookingComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
