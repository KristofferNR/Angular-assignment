import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroModel } from '../../../models/hero';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {

  hero = input.required<HeroModel>();

}
