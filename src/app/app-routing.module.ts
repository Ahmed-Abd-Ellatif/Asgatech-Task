import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './layout/orders/components/order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./layout/orders/orders.module').then((m) => m.OrdersModule),
  },

  { path: 'order/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
