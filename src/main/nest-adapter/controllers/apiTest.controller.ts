import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api-test')
@Controller()
export class ApiTestController {
  @ApiOperation({
    summary: 'Make sure the api is running.',
  })
  @Get()
  test() {
    return {
      message: 'Api is running.',
      docs: 'xbox-live-backend-production.up.railway.app/api',
    };
  }
}
