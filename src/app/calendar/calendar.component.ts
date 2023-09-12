import { Component, OnInit, ElementRef } from '@angular/core';
import { Calendar, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ApartmentService } from '../apartment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  public events: any[];
  public options: any;
  public selectedDates: any[] = [];
  public selectedApartment: string | null = null;
  public calendar: Calendar;


  constructor(private elementRef: ElementRef,
    private apartmentService: ApartmentService,
    private http: HttpClient) { }

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: true,
      selectOverlap: true,
      select: (info: any) => {
        this.selectedDates = [info.startStr, info.endStr];
        this.completeFormData();
      },
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'title',
        center: 'prev',
        right: 'next',
      },
      editable: false,
    };

    this.calendar = new Calendar(
      this.elementRef.nativeElement.querySelector('#calendar'),
      this.options
    );

    this.calendar.render();
    this.getAndRenderOccupiedDates();

  }

  completeFormData() {
    this.selectedApartment = this.apartmentService.getSelectedApartment();

    // Actualiza los valores de los inputs en el DOM
    const checkinInput = document.getElementById('checkin') as HTMLInputElement;
    const checkoutInput = document.getElementById('checkout') as HTMLInputElement;

    checkinInput.value = this.selectedDates[0];
    checkoutInput.value = this.selectedDates[1];
  }

  getAndRenderOccupiedDates() {
    this.http.get<any[]>('http://localhost:3000/api/occupied-dates').subscribe(
      (occupiedDates) => {
        this.calendar.removeAllEvents();
  
        const apartmentColors = {
          'Apt. A': '#E5497E',
          'Apt. B': '#EB607F',
          'Apt. C': '#F36863',
          'Apt. D': '#FD582F',
        };
  
        const apartmentEvents = occupiedDates.map((occupiedDate) => {
          const apartmentColor = apartmentColors[String(occupiedDate.apartamento)] || 'gray';
          return {
            id: `apartment-${occupiedDate.apartamento}-${occupiedDate.llegada}-${occupiedDate.salida}`,
            title: occupiedDate.apartamento +` ocupado`,
            start: new Date(occupiedDate.llegada),
            end: new Date(occupiedDate.salida),
            color: apartmentColor,
          };
        });
        
  
        this.calendar.addEventSource(apartmentEvents);
      },
      (error) => {
        console.error('Error al obtener las fechas ocupadas:', error);
      }
    );
  }  
}
