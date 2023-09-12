import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private selectedApartment: string | null = null;
  private selectedDates: any[] = [];

  setSelectedApartment(apartment: string) {
    this.selectedApartment = apartment;
  }

  getSelectedApartment(): string | null {

    return this.selectedApartment;
  }

  getPriceApartment(){

    return this.selectedApartment;
  }

  setSelectedDates(dates: any[]) {
    this.selectedDates = dates;
  }

  getSelectedDates(): any[] {
    return this.selectedDates;
  }


}
