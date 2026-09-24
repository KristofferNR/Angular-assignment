import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);

  searchQuery = signal('');
  onSearch() {
    const query = this.searchQuery().trim();

    if (!query) {
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: { q: query },
    });

    this.searchQuery.set('');
  }
}
