import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import OrdersComponent from './orders.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class OrdersModule {}
