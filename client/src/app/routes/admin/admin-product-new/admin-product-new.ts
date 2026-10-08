import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-new',
  imports: [FormsModule],
  templateUrl: './admin-product-new.html',
  styleUrl: './admin-product-new.css',
})
export class AdminProductNew {
  private http = inject(HttpClient);
  private router = inject(Router);

  errorMessage = signal('');
  skuErrorMessage = signal('');
  successMessage = signal('');
  isSubmitting = signal(false);

  name = signal('');
  brand = signal('');
  price = signal<number | null>(null);
  sku = signal('');
  image = signal('');
  description = signal('');
  date = signal(new Date().toISOString().split('T')[0]);

  isValid = computed(() => {
    return (
      this.name().length > 0 &&
      this.name().length < 25 &&
      this.price() !== null &&
      this.price() ! >= 0 &&
      this.sku().trim().length > 0 &&
      this.image().trim().length > 0
    );
  });

  onSubmit() {
    if (!this.isValid()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      name: this.name(),
      brand: this.brand(),
      price: this.price(),
      sku: this.sku(),
      image: this.image(),
      description: this.description(),
      date: this.date(),
    };

    this.http.post('http://localhost:8000/api/products/', payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set('Product Created Successfully');
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.isSubmitting.set(false);

        if (error.error?.field === 'sku') {
          this.skuErrorMessage.set(error.error.message);
          return;
        } else {
          this.errorMessage.set(error.error?.error || error.message);
          return;
        }

      },
    });
  }
}
