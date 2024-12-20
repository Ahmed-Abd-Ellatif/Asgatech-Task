import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // ----------------------------
  // constructor
  // ----------------------------
  constructor(private _http: HttpClient) {}
  // ----------------------------
  //  PRODUCTS
  // ----------------------------
  // GET ALL PRODUCTS
  getAllProducts(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/products');
  }
  getProductById(id: any): Observable<any> {
    return this._http.get<any>(
      `http://localhost:3000/products?ProductId=${id}`
    );
  }
  // ----------------------------
  // ORDERS
  // ----------------------------
  // GET ALL ORDERS
  getAllOrders(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/orders');
  }
  // GET ORDER BY ID
  getOrderById(id: any): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/orders/?OrderId=${id}`);
  }
  // CREATE ORDER
  createOrder(obj: any): Observable<any> {
    return this._http.post(`http://localhost:3000/orders`, obj);
  }
  // DELETE ORDER
  deleteOrder(id: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/orders/${id}`);
  }
  // ----------------------------
  // GET ALL USERS
  // ----------------------------
  getAllUsers(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/users');
  }
  getUserById(id: any): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/users?Id=${id}`);
  }
}
