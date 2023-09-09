import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsePermissionsGuard } from 'src/permissions/permissions.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserIdDTO } from './dto/params.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserEntityHook } from './subjects/user-entity.hook';
import { UserIdHook } from './subjects/user-id.hook';
import { UserActions } from './user.permissions';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UsePermissionsGuard(UserActions.getAll, UserEntity)
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePermissionsGuard(UserActions.getById, UserIdDTO, UserIdHook)
  @ApiOperation({ summary: 'Get unique user' })
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param() idDto: UserIdDTO) {
    return await this.userService.findOne(idDto);
  }

  @Patch(':id')
  @UsePermissionsGuard(UserActions.update, UserEntity, UserEntityHook)
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param()
    idDto: UserIdDTO,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return await this.userService.update(idDto, updateUserDto);
  }

  @Delete(':id')
  @UsePermissionsGuard(UserActions.delete, UserEntity, UserEntityHook)
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param() idDto: UserIdDTO) {
    return await this.userService.remove(idDto);
  }
}
