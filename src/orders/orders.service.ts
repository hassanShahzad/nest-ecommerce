import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private readonly paginationService:
          PaginationService,
      ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const {
        productId, quantity, totalPrice
      } = createOrderDto;
      const product =
        await this.productRepository.findOne
      ({
        where: {
          id: productId,
        },
      });
      if (!product) {
        return {
          message: 'Product not found!',
        };
      }
      const order = this.orderRepository.create({
        product,
        quantity,
        totalPrice,
      });
      await this.orderRepository.save(order);
      return {
        message: 'Order created successfully',
        order,
      };
    } catch (error) {
      return {
        message: 'An error occurred!',
        error,
      };
    }
  }

async getOrders(page = 1, limit = 10) {
  const orders = await this.orderRepository.find({
    skip: (page - 1) * limit,
    take: limit,
    relations: ['product', 'customer'],
    select: {
      product: {
        name: true,
        price: true,
        image: true,
      },
      customer: {
        id: true,
        username: true,
      },
    },
  });

  const totalItems = await this.orderRepository.count();
  const meta = this.paginationService.getPaginationMeta(
    page,
    limit,
    totalItems,
  );

  return {
    data: orders,
    meta,
  };
}

    async getOrderById(id: string) {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: [
          'product',
          // 'customer', <-- Uncomment this line after
          // creating the User entity
        ],
      });
      return {
        order,
      };
    }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
