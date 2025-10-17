import { Injectable } from '@nestjs/common';
import {
  CreateProductDto
} from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product =
      this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return {
      message: 'Product created successfully',
      product,
    };
  }
      async getProducts(page = 1, limit = 10) {
        const products = await this.productRepository.find({
          skip: (page - 1) * limit,
          take: limit,
        });
        return {
          products,
        };
      }
      async getProductById(id: string) {
        const product = await this.productRepository.findOne({
          where: { id },
        });
        return {
          product,
        };
      }
}