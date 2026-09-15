import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { Cart } from './routes/cart/cart';
import { Checkout } from './routes/checkout/checkout';
import { Search } from './routes/search/search';
import { Product } from './routes/product/product';
import { AdminProductNew } from './routes/admin/admin-product-new/admin-product-new';
import { AdminProducts } from './routes/admin/admin-products/admin-products';



export const routes: Routes = [
    { path: '', component: Home },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: 'search', component: Search },
    { path: 'product/:slug', component: Product },
    { path: 'admin/products/new', component: AdminProductNew },
    { path: 'admin/products', component: AdminProducts },
];
