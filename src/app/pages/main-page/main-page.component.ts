import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngOnInit of MainPageComponent is called');
    this.route.fragment.subscribe((fragment: string) => {
      if (fragment === 'todo') {
        const todoElement = document.getElementById('todo');
        if (todoElement) {
          todoElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // scrollToTodo() {
  //   const todoSection = document.getElementById('todo');
  //   if (todoSection) {
  //     todoSection.scrollIntoView({ block: 'start' }); // Sin 'behavior: 'smooth''
  //   }
  // }
}
