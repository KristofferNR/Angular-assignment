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

  //Tar in en produkt från föräldern och använder sig av htmlen
  product = input.required<ProductModel>();

}
