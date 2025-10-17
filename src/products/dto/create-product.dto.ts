// add this import
import {
    IsObject,
  // everything else we had
  Validate,
} from 'class-validator';
import {
  ProductSpecs
} from '../custom-validators/ProductSpecs'; // the newly
                                           // created class
export class CreateProductDto {
    // everything else remains the same
    @IsObject({
    message: 'specs must be a valid object',
  })
  @Validate(ProductSpecs) // we added this line
  specs: Record<string, string>;
}