import { ApiProperty } from '@nestjs/swagger';
import { User, Role } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserEntity implements User {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ uniqueItems: true })
  id: number;

  @Expose()
  @IsEmail()
  @ApiProperty({ uniqueItems: true, example: 'user@example.com' })
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'John' })
  name: string;

  @Expose()
  @IsBoolean()
  @ApiProperty({ example: false })
  blocked: boolean;

  @Expose()
  @IsEnum(Role, { each: true })
  @ApiProperty({ enum: [Role], example: [Role.user] })
  roles: Role[];
}
