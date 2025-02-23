import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateServerRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  currentPlayers: number;

  @ApiProperty()
  @IsNumber()
  maxPlayers: number;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  metadata?: Map<string, string>;

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
