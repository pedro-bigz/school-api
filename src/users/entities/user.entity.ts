import { ModelHasRole } from '@app/model_has_roles/entities/model_has_role.entity';
import { Resource } from '@app/resources/entities/resource.entity';
import {
    Entity,
    Column,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255, default: '' })
    password: string;

    @Column({ default: false })
    activated: boolean;

    @Column({ default: false })
    forbidden: boolean;

    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @OneToMany(() => Resource, (resource) => resource.creator)
    resources: Resource[]

    @OneToMany(() => ModelHasRole, (modelHasRoles) => modelHasRoles.user)
    @JoinColumn()
    modelHasRoles: ModelHasRole[]
};
