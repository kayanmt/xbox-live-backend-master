import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { HttpResponse } from 'src/domain/http/http-response';
import { makeProfileControllerFactory } from 'src/main/factories/profile-controller-factory';
import { HttpRequestHandler } from 'src/utils/handlers/http/http-request-handler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NestProfileDto } from '../dtos/profile.dto';
import { ResponseInterceptor } from '../interceptors/response-interceptor';
import { NestProfileGamesDto } from '../dtos/profile-games.dto';
const profile = makeProfileControllerFactory();

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  @ApiOperation({
    summary: 'Create a profile.',
  })
  @Post('create-profile')
  @ApiResponse({
    status: 201,
    description: 'Profile created.',
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
  async create(
    @Body() body: NestProfileDto,
    @Headers() headers: { authorization: string },
  ) {
    const http = new HttpRequestHandler({ body, headers });
    return await profile.create(http.request());
  }

  @ApiOperation({
    summary: 'Get all profiles.',
  })
  @Get('get-all-profiles')
  @ApiResponse({
    status: 200,
    description: 'Profiles found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Profiles not found.',
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
    return await profile.getAll(http.request());
  }

  @ApiOperation({
    summary: 'Get one profile by ID.',
  })
  @Get('get-profile/:id')
  @ApiResponse({
    status: 200,
    description: 'Profile found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found.',
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
    return await profile.getOne(http.request());
  }

  @ApiOperation({
    summary: 'Delete a profile.',
  })
  @Delete('delete-profile/:id')
  @ApiResponse({
    status: 200,
    description: 'Profile Deleted.',
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
    return await profile.delete(http.request());
  }

  @ApiOperation({
    summary: 'Update a profile.',
  })
  @Patch('update-profile/:id')
  @ApiResponse({
    status: 200,
    description: 'Profile Updated.',
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
    @Body() body: NestProfileDto,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, body, headers });
    return await profile.update(http.request());
  }

  @ApiOperation({
    summary: 'Add favorite game(s) in a profile.',
  })
  @Patch('add-games-profile/:id')
  @ApiResponse({
    status: 200,
    description: 'Game(s) added.',
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
  async addGames(
    @Param('id') id: string,
    @Body() body: NestProfileGamesDto,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, body, headers });
    return await profile.addGames(http.request());
  }

  @ApiOperation({
    summary: 'Remove favorite game(s) from a profile.',
  })
  @Patch('remove-games-profile/:id')
  @ApiResponse({
    status: 200,
    description: 'Game(s) removed.',
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
  async removeGames(
    @Param('id') id: string,
    @Body() body: NestProfileGamesDto,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, body, headers });
    return await profile.removeGames(http.request());
  }
}
