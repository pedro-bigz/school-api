import { Discipline } from "@app/discipline/entities/discipline.entity";
import { Media } from "@app/media/entities/media.entity";
import { User } from "@app/users/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from "typeorm";

@Entity({ name: "resources" })
export class Resource {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false })
  activated: boolean;

  @RelationId((resource: Resource) => resource.creator)
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  // @RelationId((resource: Resource) => resource.discipline)
  // disciplineId: number;

  @ManyToOne(() => Discipline, (discipline) => discipline.id)
  discipline: Discipline;

  @OneToMany(() => Media, (media) => media.resource)
  media: Media[];
}
