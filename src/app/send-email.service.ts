import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor(private http: HttpClient) {}

  // sendBookingConfirmationEmail(bookingData: any) {
  //   return this.http.post('http://localhost:3000/api/send-booking-email', bookingData);
  // }
}
