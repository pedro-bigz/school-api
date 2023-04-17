import { ModelHasRole } from '@app/model_has_roles/entities/model_has_role.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: "roles" })
export class Role {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    guardName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ModelHasRole, modelHasRole => modelHasRole.role)
    modelHasRoles: ModelHasRole[]; 
}
