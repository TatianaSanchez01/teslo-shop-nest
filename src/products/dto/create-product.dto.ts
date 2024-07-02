import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'string',
    example: 'T-shirt',
    minLength: 1,
    required: true,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'This is a T-shirt',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'number', example: 10.99, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ type: 'string', example: 't-shirt', required: false })
  @IsString()
  @IsOptional()
  slug?: string;  

  @ApiProperty({ type: 'number', example: 10, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    example: ['S', 'M', 'L'],
    required: true,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    type: 'string', required: true})
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({ type: 'array', items: { type: 'string' }, required: false })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
