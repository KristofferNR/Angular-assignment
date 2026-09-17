import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotModel } from '../../../models/spot';

@Component({
  selector: 'app-spot',
  imports: [RouterLink],
  templateUrl: './spot.html',
  styleUrl: './spot.css',
})
export class SpotComponent {
  spot = input.required<SpotModel>();
}
