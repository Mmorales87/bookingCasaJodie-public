import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeModal: string;
  invalidFormModalData: {
    missingFields: string[];
  } = { missingFields: [] };

  constructor() { }

  // Resto de tu código de ModalService...
}

