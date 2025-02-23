import { ApiProperty } from '@nestjs/swagger';
import { CreateServerRequest } from './create-server.request';
import { IsString } from 'class-validator';

export class UpdateServerRequest extends CreateServerRequest {
  @ApiProperty()
  @IsString()
  password: string;
}
