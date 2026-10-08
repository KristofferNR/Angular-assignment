import { httpResource } from '@angular/common/http';
import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../models/product';
import { Title } from '@angular/platform-browser';
import { ProductCard } from '../../shared/components/productCard/productCard';

@Component({
  selector: 'app-product',
  imports: [RouterLink, ProductCard],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private title = inject(Title);

  slug = input('');

  productResult = httpResource<ProductModel>(() => {
    const slug = this.slug();
    if (!slug) return undefined;

    return `http://localhost:8000/api/products/${slug}`;
  });

  relatedResult = httpResource<ProductModel[]>(() => {
    const slug = this.slug();
    if (!slug) return undefined;

    return `http://localhost:8000/api/products/related/${slug}`;
  });

  constructor() {
    effect(() => {
      const product = this.productResult.value();
      if (product?.name) {
        this.title.setTitle(`${product.name}`);
      }
    });
  }
}