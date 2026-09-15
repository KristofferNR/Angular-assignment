import { Component } from '@angular/core';
import { ProductCard } from '../../shared/components/productCard/productCard';
import { httpResource } from '@angular/common/http';
import { ProductModel } from '../../models/product';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

    //Hämtar alla produkter som ska visas på startsidan
    product = httpResource<ProductModel[]>(
    () => "http://localhost:8000/api/products/", {
      defaultValue: []
    }
  );
}
