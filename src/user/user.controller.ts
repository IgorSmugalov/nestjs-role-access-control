import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserIdDTO } from './dto/params.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UseRequestValidation } from 'src/lib/validation';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
@UseRequestValidation()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unique user' })
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param() idDto: UserIdDTO) {
    return await this.userService.findOne(idDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param() idDto: UserIdDTO,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return await this.userService.update(idDto, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param() idDto: UserIdDTO) {
    return await this.userService.remove(idDto);
  }
}
