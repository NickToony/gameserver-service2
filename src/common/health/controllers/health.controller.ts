import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check health status' })
  @ApiResponse({
    status: 200,
    description: 'The health status is OK.',
    example: { status: 'ok' },
  })
  getHealth() {
    return { status: 'ok' };
  }
}
