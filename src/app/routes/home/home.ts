import { Component } from '@angular/core';
import { ProductCard } from '../../shared/components/productCard/productCard';
import { httpResource } from '@angular/common/http';
import { ProductModel } from '../../models/product';
import { SpotComponent } from '../../shared/components/spot/spot';
import { SpotModel } from '../../models/spot';

@Component({
  selector: 'app-home',
  imports: [ProductCard, SpotComponent],
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

  spot = httpResource<SpotModel[]>(
    () => "http://localhost:8000/api/products/spot", {
      defaultValue: []
    }
  );

}
