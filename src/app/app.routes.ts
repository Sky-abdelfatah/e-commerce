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

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register page',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home page' },
      { path: 'cart', component: CartComponent, title: 'Cart page' },
      { path: 'product', component: ProductsComponent, title: 'Product page' },
      { path: 'brand', component: BrandsComponent, title: 'Brand page' },
      {
        path: 'category',
        component: CategoriesComponent,
        title: 'Category page',
      },
      { path: 'details', component: DetailsComponent, title: 'Details page' },
      {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout page',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
