import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../models/product';

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  templateUrl: './productCard.html',
  styleUrl: './productCard.css',
})

export class ProductCard {

  product = input.required<ProductModel>();

}
