import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('aboutSection', { static: false }) aboutSection: ElementRef;

  scrollToAbout() {
    this.aboutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
