import { Product } from './../../../core/models/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly toastr = inject(ToastrService);
  private wishlistitems: Product[] = [];
  myheaders: object = { headers: { token: this.cookieService.get('token') } };

  addproducttocart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',
      { productId: id },
      this.myheaders
    );
  }
  getloggedusercart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myheaders);
  }
  removefromewhishlist(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart/${id}`,
      this.myheaders
    );
  }
  updatecartcount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,
      { count: count },
      this.myheaders
    );
  }
  checkoutsession(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      this.myheaders
    );
  }
}
