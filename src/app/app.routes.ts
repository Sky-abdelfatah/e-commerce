import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProductsComponent } from './features/products/products.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            // ⚠️ تأكد من المسار
            (m) => m.RegisterComponent
          ),
        title: 'Register page',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'Home page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart page',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Product page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories page',
      },

      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'All Orders page',
      },

      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout page',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
