import { Product } from '../model/product.model';
import { BaseResponseDto } from './base-response.dto';

export class ProductsResponseDto extends BaseResponseDto {
  products: Product[];
}
