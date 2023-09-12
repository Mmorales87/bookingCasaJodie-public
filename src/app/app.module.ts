import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarModule } from 'angular-calendar';
import { OwlModule } from 'ngx-owl-carousel';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TodoComponent } from './pages/todo/todo.component';
import { ApartmentsComponent } from './shared/apartments/apartments.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalsComponent } from './custom-modals/custom-modals.component';
import { ApartmentModalComponent } from './shared/apartments/apartment-modal/apartment-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    TodoComponent,
    ApartmentsComponent,
    MainPageComponent,
    BookingComponent,
    CustomModalsComponent,
    ApartmentModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

