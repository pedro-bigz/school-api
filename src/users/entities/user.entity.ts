import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    first_name: string;

    @Column({ length: 100 })
    last_name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255, default: '' })
    password: string;

    @Column({ default: false })
    activated: boolean;

    @Column({ default: false })
    forbidden: boolean;

    @Column()
    last_login_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
};
