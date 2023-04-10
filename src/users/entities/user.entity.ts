import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    first_name: string;

    @Column({ length: 100 })
    last_name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255, default: '' })
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
