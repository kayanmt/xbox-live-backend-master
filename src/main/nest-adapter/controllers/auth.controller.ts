import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { makeAuthControllerFactory } from 'src/main/factories/auth-controller-factory';
import { HttpRequestHandler } from 'src/utils/handlers/http/http-request-handler';
import { NestLoginDto } from '../dtos/login.dto';
import { ResponseInterceptor } from '../interceptors/response-interceptor';
const auth = makeAuthControllerFactory();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'Receive the authentication token.',
  })
  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Logged in, user will receive a token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid login info.',
  })
  @UseInterceptors(ResponseInterceptor)
  async login(@Body() body: NestLoginDto) {
    const http = new HttpRequestHandler({ body });
    return await auth.login(http.request());
  }
}
