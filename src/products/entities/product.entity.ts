import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '1',
    description: 'The id of the product',
    uniqueItems: true,
    type: 'uuid',
    required: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({uniqueItems: true, type: 'string', example: 'T-shirt'})
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({type: 'string', example: 'This is a T-shirt', nullable: true})
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({type: 'number', example: 10.99, nullable: true})
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({type: 'string', example: 't-shirt', uniqueItems: true})
  @Column('text', { unique: true })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    } else {
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
