import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-modal',
  templateUrl: './apartment-modal.component.html',
  styleUrls: ['./apartment-modal.component.css']
})
export class ApartmentModalComponent {
  @Input()
  apartment: any; 

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private router: Router) { }

  apartmentsImg = [0, 1, 2, 3, 4, 5, 6];

  open(apartment: any) {
    const modalRef = this.modalService.open(ApartmentModalComponent);
    modalRef.componentInstance.apartment = apartment;
  }

  openClose(apartment: any) {
    this.router.navigate(['/booking'], { queryParams: { apartmentId: apartment.apartmentId } });
  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }
}
