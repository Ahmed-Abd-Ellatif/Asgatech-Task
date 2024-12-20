import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export default class OrdersComponent implements OnInit {
  // -------------------------------
  // VALUES
  // -------------------------------
  ShowAddOrder: boolean = false;
  orders: any;
  products: any;
  addProducts: any[] = [];
  users: any;
  p: number = 1;
  // -------------------------------
  // constructor
  // -------------------------------
  _fb = inject(FormBuilder);
  constructor(private _sharedService: SharedService, private _router: Router) {}
  form = this._fb.group({
    OrderDate: [new Date()],
    UserId: [],
    PaymentType: [],
    ProductId: [],
    Quantity: [],
  });

  viewDetails(id: number) {
    this._router.navigate([`/order/${id}`]);
  }

  getAllProducts() {
    this._sharedService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }
  getAllUsers() {
    this._sharedService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }
  getAllOrders() {
    this._sharedService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  // -------------------------------
  // ngOnInit
  // -------------------------------
  ngOnInit(): void {
    this.getAllOrders();
    this.getAllProducts();
    this.getAllUsers();
  }

  AddToProductsArray() {
    const product = {
      ProductId: this.form.value.ProductId,
      Quantity: this.form.value.Quantity,
    };
    this.addProducts.push(product);
    console.log(this.addProducts);
  }
  submit() {
    const obj = {
      OrderDate: this.form.value.OrderDate,
      UserId: this.form.value.UserId,
      Products: this.addProducts,
      PaymentType: this.form.value.PaymentType,
    };
    this._sharedService.createOrder(obj).subscribe({
      next: (res) => {
        this.ShowAddOrder = false;
        this.getAllOrders();
      },
    });
  }

  onShowAddOrder() {
    this.ShowAddOrder = !this.ShowAddOrder;
  }
  deleteOrder(id: any) {
    this._sharedService.deleteOrder(id).subscribe({
      next: (res) => {
        this.ShowAddOrder = false;
        this.getAllOrders();
      },
    });
  }
}
