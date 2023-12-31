import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class SocialLoginDto {
  // @IsNotEmpty()
  // @IsString()
  // token: string;

  @IsNotEmpty()
  @IsString()
  socialId: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  social: string;
}
