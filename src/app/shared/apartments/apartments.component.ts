import { Component } from '@angular/core';
import { ApartmentModalComponent } from './apartment-modal/apartment-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent {
  constructor(private modalService: NgbModal, private router: Router) { }


  apartments = [
    {
      apartmentId: 0,
      apartment: 'Apartamento A',
      title: 'Serenidad Alpina',
      description: 'Adéntrate en un remanso de paz alpina en este dúplex elegante. \n Dos habitaciones dobles te reciben, una con una lujosa cama de matrimonio y otra con encanto en sus dos camas individuales, ambas bajo techos abuhardillados que añaden carácter.\n En la planta baja, un acogedor salón con chimenea invita a momentos de serenidad. La cocina abierta se une al ambiente, creando un espacio perfecto para compartir. Un baño completo en la primera planta, al que se accede mediante una encantadora escalera de caracol, añade un toque de comodidad.',
      bed: '3',
      bath: '1',
      apartmentLetters: 'A',
      apartmentsImg: [0, 1, 2, 3, 4, 5, 6],
      price: '120.5',
    },
    {
      apartmentId: 1,
      apartment: 'Apartamento B',
      title: 'Vista Esmeralda',
      description: ' Este dúplex te sumergirá en un mundo de comodidad y estilo. \nDos habitaciones dobles, una con cama de matrimonio y otra con camas individuales bajo techos abuhardillados, prometen noches de descanso sublime. \nLa planta baja te recibe con un salón iluminado por una chimenea acogedora, mientras que la cocina abierta agrega un toque moderno. Un baño completo en la primera planta, accesible a través de una escalera de caracol, completa este refugio de tranquilidad.',
      bed: '3',
      bath: '2',
      apartmentLetters: 'B',
      apartmentsImg: [0, 1, 2, 3, 4, 5, 6],
       price: '125.5',
    },
    {
      apartmentId: 2,
      apartment: 'Apartamento C',
      title: 'Refugio Cielo Estrellado',
      description: ' Déjate cautivar por la elegancia sencilla de este apartamento. \nUna habitación doble, con cama de matrimonio, te invita a relajarte en un espacio íntimo. \nLa sala de estar, con una cocina abierta y un cómodo sofá cama, te brinda un lugar para compartir momentos especiales. Un baño completo añade un toque de lujo a este refugio, donde cada noche puede convertirse en una experiencia estrellada.',
      bed: '2',
      bath: '1',
      apartmentLetters: 'C',
      apartmentsImg: [0, 1, 2, 3, 4, 5, 6],
       price: '200.5',
    },
    {
      apartmentId: 3,
      apartment: 'Apartamento D',
      title: 'Suite Montaña Mágica',
      description: ' Esta suite dúplex te llevará a una escapada mágica en las montañas. \nTres habitaciones dobles te ofrecen una variedad de opciones: una cama de matrimonio en la planta baja y otra en la primera planta, junto con dos camas individuales, todas bajo techos abuhardillados. \nLa planta baja alberga un salón amplio con cocina abierta, creando un espacio para momentos entrañables. Un baño completo en la planta baja y otro en la primera planta, con una escalera de un tramo que los conecta, añaden practicidad y encanto a esta experiencia de montaña única.Este dúplex te sumergirá en un mundo de comodidad y estilo...',
      bed: '4',
      bath: '2',
      apartmentLetters: 'D',
      apartmentsImg: [0, 1, 2, 3, 4, 5, 6],
       price: '140.75',
    }
  ];

  open(apartment: any) {
    const modalRef = this.modalService.open(ApartmentModalComponent);
    modalRef.componentInstance.apartment = apartment;
  }

  openApt(apartment: any) {
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
