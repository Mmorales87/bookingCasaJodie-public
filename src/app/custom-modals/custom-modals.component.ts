import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from '../pages/booking/booking.component';


@Component({
  selector: 'app-custom-modals',
  templateUrl: './custom-modals.component.html',
  styleUrls: ['./custom-modals.component.css']
})


export class CustomModalsComponent {
  @Input() 
  activeModal: string | null;
  missingFields: string[];

  constructor(public modal: NgbActiveModal){

  }
}
