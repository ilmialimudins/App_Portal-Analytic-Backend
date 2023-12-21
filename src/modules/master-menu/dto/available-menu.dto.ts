import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AvailableMenusBodyDTO {
  @ApiProperty()
  @IsString()
  url: string;
}

export class AvailableMenusResponseBody {
  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;
}
