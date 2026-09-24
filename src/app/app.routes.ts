import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { Search } from './routes/search/search';
import { Product } from './routes/product/product';
import { AdminProductNew } from './routes/admin/admin-product-new/admin-product-new';
import { AdminProducts } from './routes/admin/admin-products/admin-products';



export const routes: Routes = [
    { path: '', title: 'Home', component: Home },
    { path: 'search', title: 'Search', component: Search },
    { path: 'products/:slug', component: Product },
    { path: 'admin/products/new', component: AdminProductNew },
    { path: 'admin/products', component: AdminProducts },
];
