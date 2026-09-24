import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductCard } from '../../shared/components/productCard/productCard';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ProductCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private route = inject(ActivatedRoute)

  query = toSignal(
    this.route.queryParamMap.pipe(
    map((params) => params.get('q')?.trim() || '')
  ),
  { initialValue: ''}
)
  searchResult = httpResource<ProductModel[]>(() => {
    const query = this.query()
    if (!query) {
      return undefined
    }
    return `http://localhost:8000/api/products/search?q=${query}`
  }, {
  defaultValue: []
  })
  
}
