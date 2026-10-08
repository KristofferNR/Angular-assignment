import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ProductModel } from '../../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  imports: [RouterLink],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  http = inject(HttpClient);

  product = httpResource<ProductModel[]>(() => 'http://localhost:8000/api/products/', {
    defaultValue: [],
  });

  deletedIds = signal<number[]>([]);

  products = computed(() => {
    return this.product.value().filter((p) => !this.deletedIds().includes(p.id));
  });

  deleteProduct(id: number, name: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.http.delete(`http://localhost:8000/api/products/${id}`).subscribe({
      next: () => {
        this.deletedIds.update((ids) => [...ids, id]);
        console.log(this.deletedIds());
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }
}
