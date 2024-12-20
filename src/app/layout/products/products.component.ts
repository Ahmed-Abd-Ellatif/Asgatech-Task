import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  // ------------------------------------------------
  // VALUES
  // ------------------------------------------------
  products: any;

  p: number = 1;
  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(private _sharedService: SharedService) {}
  // ------------------------------------------------
  // ngOnInit
  // ------------------------------------------------
  ngOnInit(): void {
    this._sharedService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
