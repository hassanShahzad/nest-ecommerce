import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // or '127.0.0.1'
      port: 5432,
      username: 'postgres',    // default user for Postgres.app
      password: '1234',        // 👈 your password
      database: 'ecommerce_db', // the database name you created
      entities: [Product, Order, User], // finds all entity files
      synchronize: true,       // auto-creates tables (dev only)
      logging: true,           // shows SQL queries
    }),
    ProductsModule,
    OrdersModule,
    CommonModule,
    UsersModule,
  ],
})
export class AppModule {}
