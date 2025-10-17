import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { PaginationService } from "src/common/pagination/pagination.service";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [
      TypeOrmModule.forFeature([Order, Product]),
      CommonModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService, PaginationService],
  })
  export class OrdersModule {}
  // orders.service.ts
