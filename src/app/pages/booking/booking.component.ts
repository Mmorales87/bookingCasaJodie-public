import { Component, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/apartment.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailService } from 'src/app/send-email.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  apartamentoControl: FormControl;
  nombreControl: FormControl;
  apellidosControl: FormControl;
  emailControl: FormControl;
  telefonoControl: FormControl;
  adultosControl: FormControl;
  menoresControl: FormControl;
  checkinControl: FormControl;
  checkoutControl: FormControl;
  selectedApartment?: string = '';
  nombre?: string = '';
  apellidos?: string = '';
  email?: string;
  telefono?: string = '';
  adultos?: string = '';
  menores?: string = '';
  checkin?: string = '';
  checkout?: string = '';
  comentarios: string;
  bookingForm: FormGroup;
  totalPrice: number;
  modalTotal: number;
  numberOfDays: number;
  missingFields: string[] = [];
  minDate: string;
  closeResult: string;
  discount: number;

  constructor(
    private formBuilder: FormBuilder,
    private apartmentService: ApartmentService,
    private http: HttpClient,
    private modalService: NgbModal,
    private sendEmailService: SendEmailService,
    private route: ActivatedRoute // INYECTA ActivatedRoute
  ) { }

  ngOnInit(): void {

    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.minDate = today.toISOString().split('T')[0]; // Establecer la fecha mínima

    this.apartamentoControl = new FormControl('', Validators.required);
    this.nombreControl = new FormControl('', Validators.required);
    this.apellidosControl = new FormControl('', Validators.required);
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      this.telefonoControl = new FormControl('', Validators.required);
    this.adultosControl = new FormControl('', Validators.required);
    this.menoresControl = new FormControl('', Validators.required);
    this.checkinControl = new FormControl('', Validators.required);
    this.checkoutControl = new FormControl('', Validators.required);
    this.route.queryParams.subscribe(params => {
      this.selectedApartment = params['apartmentId']; // RECUPERA EL PARÁMETRO apartmentId
      this.apartamentoControl.setValue(this.selectedApartment); // SETEA EL VALOR EN EL CONTROL DEL FORMULARIO
    });



    // Crea el FormGroup
    this.bookingForm = this.formBuilder.group({
      apartamento: this.apartamentoControl,
      nombre: this.nombreControl,
      apellidos: this.apellidosControl,
      email: this.emailControl,
      telefono: this.telefonoControl,
      adultos: this.adultosControl,
      menores: this.menoresControl,
      llegada: this.checkinControl,
      salida: this.checkoutControl,
    });
  }


  onApartmentSelected() {
    if (this.selectedApartment) {
      const selectedDates = this.apartmentService.getSelectedDates();
      if (selectedDates.length === 2) {
        this.checkin = selectedDates[0];
        this.checkout = selectedDates[1];
      } else {
        this.checkin = '';
        this.checkout = '';
      }
    } else {
      this.checkin = '';
      this.checkout = '';
    }
  }

  

  public getApartmentName(): string {
    switch (this.selectedApartment) {
      case '0':
        return 'Apt. A';
      case '1':
        return 'Apt. B';
      case '2':
        return 'Apt. C';
      case '3':
        return 'Apt. D';
      default:
        return '';
    }
  }

  private getApartmentPrice(): number {
    this.numberOfDays = this.numberOfDays;
    switch (this.selectedApartment) {
        case '0':
            const basePriceApartment0 = 120.5;
            this.discount = (this.numberOfDays >= 8) ? (basePriceApartment0 * 0.1) : ((this.numberOfDays >= 4) ? (basePriceApartment0 * 0.05) : 0);
            return (this.numberOfDays >= 4) ? (basePriceApartment0 - this.discount) : basePriceApartment0;
        case '1':
            const basePriceApartment1 = 125.5;
            this.discount = (this.numberOfDays >= 8) ? (basePriceApartment1 * 0.1) : ((this.numberOfDays >= 4) ? (basePriceApartment1 * 0.05) : 0);
            return (this.numberOfDays >= 4) ? (basePriceApartment1 - this.discount) : basePriceApartment1;
        case '2':
            const basePriceApartment2 = 200.5;
            this.discount = (this.numberOfDays >= 8) ? (basePriceApartment2 * 0.1) : ((this.numberOfDays >= 4) ? (basePriceApartment2 * 0.05) : 0);
            return (this.numberOfDays >= 4) ? (basePriceApartment2 - this.discount) : basePriceApartment2;
        case '3':
            const basePriceApartment3 = 140.75;
            this.discount = (this.numberOfDays >= 8) ? (basePriceApartment3 * 0.1) : ((this.numberOfDays >= 4) ? (basePriceApartment3 * 0.05) : 0);
            return (this.numberOfDays >= 4) ? (basePriceApartment3 - this.discount) : basePriceApartment3;
        default:
            return null;
    }
}


  calculateNights() {
    const arrivalEpochTime = new Date(this.checkin).getTime() / 1000;

    const departureEpochTime = new Date(this.checkout).getTime() / 1000;

    return this.numberOfDays = this.daysSelected(departureEpochTime, arrivalEpochTime);
  }

  public daysSelected(checkoutTimeStamp, checkinTimeStamp) {
    const oneDayInSeconds = 24 * 60 * 60;
    return Math.round((checkoutTimeStamp - checkinTimeStamp) / oneDayInSeconds);
  }

  public calculateTotal() {
    return this.totalPrice = this.calculateNights() * this.getApartmentPrice();
  }

  submitForm() {
    this.apartmentService.setSelectedApartment(this.selectedApartment);

    // Verificar si ya existe una reserva para el apartamento y las fechas seleccionadas
    this.http.get<any[]>('http://localhost:3000/api/occupied-dates').subscribe(
      (occupiedDates) => {

        const conflictingReservation = occupiedDates.find((occupiedDate) => {
          const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
          const newCheckin = new Date(this.checkin).getTime();
          const newCheckout = new Date(this.checkout).getTime() - oneDayInMilliseconds;

          const occupiedCheckin = new Date(occupiedDate.llegada).getTime();
          const occupiedCheckout = new Date(occupiedDate.salida).getTime();

          return (
            occupiedDate.apartamento === this.getApartmentName() &&
            (
              (newCheckin >= occupiedCheckin && newCheckin < occupiedCheckout) || // Cambio aquí
              (newCheckout > occupiedCheckin && newCheckout <= occupiedCheckout) ||
              (newCheckin <= occupiedCheckin && newCheckout >= occupiedCheckout)
            )
          );
        });


        if (conflictingReservation) {
          alert(`Ya existe una reserva para el Apartamento ${this.getApartmentName().split("Apt. ")} en las fechas seleccionadas.`);
        } else {
          this.apartmentService.setSelectedApartment(this.selectedApartment);

          // Hacer la solicitud POST al backend para guardar la reserva
          const bookingData = {
            apartamento: this.getApartmentName(),
            nombre: this.nombre,
            apellidos: this.apellidos,
            email: this.email,
            telefono: this.telefono,
            adultos: this.adultos,
            menores: this.menores,
            llegada: this.checkin,
            salida: this.checkout,
            comentarios: this.comentarios,
            precioTotal: this.calculateTotal().toFixed(2),
            discount: this.discount,
          };

          this.http.post('http://localhost:3000/api/bookings', bookingData).subscribe(
            () => {
              console.log('Reserva guardada correctamente en el servidor.');

              this.modalService.dismissAll();

              // Limpiar los campos
              this.selectedApartment = '';
              this.nombre = '';
              this.apellidos = '';
              this.email = '';
              this.telefono = '';
              this.adultos = '';
              this.menores = '';
              this.checkin = '';
              this.checkout = '';
              this.comentarios = '';

              location.reload();
            },
            (error) => {
              console.error('Error al guardar la reserva en el servidor:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener las fechas ocupadas:', error);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Abre el Modal para mostrar los campos sin rellenar o invalidos
  open(content, invalidFormModal) {
    if (this.bookingForm.valid) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    } else {
      this.getMissingFields();
      this.modalService.open(invalidFormModal, { size: 'sm' });
    }
  }

  // Retorna los nombres de los campos sin rellenar (o invalidos como el de email) en el formulario de reserva
  getMissingFields() {
    this.missingFields = [];

    const formControls = this.bookingForm.controls;
    for (const controlName in formControls) {
      if (formControls[controlName].invalid) {
        this.missingFields.push(controlName);
      }
    }
  }

  isInvalidDateRange(): boolean {
    if (!this.checkin || !this.checkout) return false;

    const checkinDate = new Date(this.checkin);
    const checkoutDate = new Date(this.checkout);

    return checkoutDate < checkinDate;
  }
}



