export class CreateUserDto {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    activated: boolean;
    forbidden: boolean;
    remember_token: string;
    token_profile: string;
    language: string;
    genero: string;
    checked_term: boolean;
    last_login_at: string;
}
