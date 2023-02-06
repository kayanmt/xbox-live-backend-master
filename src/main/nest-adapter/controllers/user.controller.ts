import { HttpResponse } from 'src/domain/http/http-response';
import { makeUserControllerFactory } from 'src/main/factories/user-controller-factory';
import { HttpRequestHandler } from 'src/utils/handlers/http/http-request-handler';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NestUserDto } from '../dtos/user.dto';
import { ResponseInterceptor } from '../interceptors/response-interceptor';
import { EmailDto } from '../dtos/email.dto';
import { HttpCode } from '@nestjs/common/decorators';
const user = makeUserControllerFactory();

@ApiTags('user')
@Controller('user')
export class UserController {
  @ApiOperation({
    summary: 'Create a user.',
  })
  @Post('create-user')
  @ApiResponse({
    status: 201,
    description: 'User created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @UseInterceptors(ResponseInterceptor)
  async create(
    @Body() body: NestUserDto,
    @Headers() headers: { authorization: string },
  ) {
    const http = new HttpRequestHandler({ body, headers });
    return await user.create(http.request());
  }

  @ApiOperation({
    summary: 'Get all users.',
  })
  @Get('get-all-users')
  @ApiResponse({
    status: 200,
    description: 'Users found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getAll(
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ headers });
    return await user.getAll(http.request());
  }

  @ApiOperation({
    summary: 'Get a user by ID.',
  })
  @Get('get-user-by-id/:id')
  @ApiResponse({
    status: 200,
    description: 'User found.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getOneById(
    @Param('id') id: string,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, headers });
    return await user.getOneById(http.request());
  }

  @ApiOperation({
    summary: 'Get a user by email.',
  })
  @Post('get-user-by-email')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User found.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getOneByEmail(
    @Body() body: EmailDto,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ body, headers });
    return await user.getOneByEmail(http.request());
  }

  @ApiOperation({
    summary: 'Delete a user.',
  })
  @Delete('delete-user/:id')
  @ApiResponse({
    status: 200,
    description: 'User Deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async delete(
    @Param('id') id: string,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, headers });
    return await user.delete(http.request());
  }

  @ApiOperation({
    summary: 'Update a user.',
  })
  @Patch('update-user/:id')
  @ApiResponse({
    status: 200,
    description: 'User Updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: NestUserDto,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, body, headers });
    return await user.update(http.request());
  }
}
