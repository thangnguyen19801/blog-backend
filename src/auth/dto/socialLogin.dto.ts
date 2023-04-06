import { IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  social: string;
}
