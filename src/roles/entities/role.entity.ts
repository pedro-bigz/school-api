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
    public name: string;

    @Column({ length: 255 })
    public guardName: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @OneToMany(() => ModelHasRole, modelHasRole => modelHasRole.role)
    public modelHasRoles: ModelHasRole[]; 
}
