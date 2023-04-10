import { IsBoolean, IsString, IsInt, IsEmail} from 'class-validator';
import internal from 'stream';

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsBoolean()
    activated: boolean;

    @IsString()
    forbidden: boolean;

    @IsString()
    deleted_at: string

    @IsString()
    updated_at: string

    @IsString()
    remember_token: string;

    @IsString()
    token_profile: string;

    @IsString()
    last_login_at: string;
}
