import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserIdDTO } from './dto/params.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import {
  UserAlreadyExistsException,
  UserDoesNotExistsException,
} from './user.exceptions';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDTO) {
    try {
      return await this.prismaService.user.create({ data: createUserDto });
    } catch (error) {
      this.parsePrismaUserError(error);
    }
  }

  async findAll() {
    try {
      return (await this.prismaService.user.findMany()) ?? [];
    } catch (error) {
      this.parsePrismaUserError(error);
    }
  }

  async findOne(id: UserIdDTO) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({ where: id });
    } catch (error) {
      this.parsePrismaUserError(error);
    }
  }

  async update(id: UserIdDTO, updateUserDto: UpdateUserDTO) {
    try {
      return await this.prismaService.user.update({
        where: id,
        data: updateUserDto,
      });
    } catch (error) {
      this.parsePrismaUserError(error);
    }
  }

  async remove(id: UserIdDTO) {
    try {
      return await this.prismaService.user.delete({ where: id });
    } catch (error) {
      this.parsePrismaUserError(error);
    }
  }

  private parsePrismaUserError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new UserAlreadyExistsException();
        case 'P2025':
          throw new UserDoesNotExistsException();
        default:
          throw new InternalServerErrorException(error.code);
      }
    }
    throw new InternalServerErrorException(error?.code ?? error?.message);
  }
}
