import { Component } from '@angular/core';

@Component({
  selector: 'app-sampoo',
  templateUrl: './sampoo.component.html',
  styleUrls: ['./sampoo.component.scss']
})
export class SampooComponent {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

}


// @Component({
//   selector: 'app-hero-form-template',
//   templateUrl: './hero-form-template.component.html',
//   styleUrls: ['./hero-form-template.component.css'],
// })
// export class HeroFormTemplateComponent {

//   powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

//   hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

// }