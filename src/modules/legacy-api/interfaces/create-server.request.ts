import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServerRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumberString()
  current_players: string;

  @ApiProperty()
  @IsNumberString()
  max_players: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  metadata?: { [key: string]: string };

  /**
   *  Legacy fields.
   *
   *  These fields were previously passed through on the root of the payload, then treated as "metadata".
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  port?: string;
}
