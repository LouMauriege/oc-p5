import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  start() {
    fetch('http://localhost:3001/api/test', {
      method: "POST"
    })
      .then(data => console.log(data));

    fetch('http://localhost:3001/api/test', {
      method: "GET"
    })
      .then(data => console.log(data));

    alert('Commencez par lire le README et à vous de jouer !');
  }
}
