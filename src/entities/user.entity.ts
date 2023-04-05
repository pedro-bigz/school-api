import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column({ default: '' })
    password: string;

    @Column({ default: false })
    activated: boolean;

    @Column({ default: false })
    forbidden: boolean;

    @Column()
    genero: string;

    @Column({ default: false })
    checked_term: boolean;

    @Column()
    last_login_at: string;

    @Column()
    token_profile: string;
};
