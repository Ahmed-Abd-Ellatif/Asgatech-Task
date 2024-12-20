import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  // --------------------------------
  // VALUES
  // --------------------------------
  showEditQuantity: boolean = false;
  orderId!: number;
  order: any;
  user: any;
  products: any[] = [];
  // --------------------------------
  // constructor
  // --------------------------------
  _fb = inject(FormBuilder);
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sharedService: SharedService
  ) {
    this._activatedRoute.params.subscribe((res) => {
      this.orderId = res['id'];
    });
  }
  form = this._fb.group({
    ProductName: [],
    ProductId: [],
    Quantity: [],
  });
  // --------------------------------
  // orderById
  // --------------------------------
  orderById() {
    this._sharedService.getOrderById(this.orderId).subscribe((res) => {
      this.order = res[0];
      this.getUserById();
      this.getProductsById();
    });
  }
  // --------------------------------
  // getUserById
  // --------------------------------
  getUserById() {
    this._sharedService.getUserById(this.order.UserId).subscribe((res) => {
      this.user = res[0];
      console.log(res);
    });
  }
  // --------------------------------
  // getProductsById
  // --------------------------------
  getProductsById() {
    this._sharedService.getAllProducts().subscribe((res) => {
      for (let i = 0; i < this.order.Products.length; i++) {
        this.products.push(
          res.filter(
            (el: any) => el.ProductId == this.order.Products[i].ProductId
          )
        );
      }
      this.products = this.products.flat();
      this.products = this.products.map((product) => {
        const match = this.order.Products.find(
          (item: any) => item.ProductId === product.ProductId
        );
        return {
          ...product,
          Quantity: match ? match.Quantity : 0,
        };
      });
      console.log(this.products);
    });
  }
  // ----------------------------------
  // Edit Product Quantity
  // ----------------------------------
  onShowEditQuantity(product?: any) {
    this.form.patchValue({
      ProductName: product.ProductName,
      ProductId: product.ProductId,
      Quantity: product.Quantity,
    });
    this.showEditQuantity = !this.showEditQuantity;
  }
  submit() {
    this.products.forEach((product) => {
      if (product.ProductId === this.form.value.ProductId) {
        product.Quantity = this.form.value.Quantity;
      }
    });
    this.showEditQuantity = false;
  }
  // --------------------------------
  // ngOnInit
  // --------------------------------
  ngOnInit(): void {
    this.orderById();
  }
}
