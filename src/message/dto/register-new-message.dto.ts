import { ApiProperty } from '@nestjs/swagger';

export class RegisterNewMessageDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  message: string;
}
