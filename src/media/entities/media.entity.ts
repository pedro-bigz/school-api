import { Resource } from "@app/resources/entities/resource.entity";
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
  ManyToOne,
} from "typeorm";

export class Media {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ length: 256 })
  media_type: string;

  @Column({ length: 256 })
  filename: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @RelationId((resource: Resource) => resource.media)
  resourceId: number;

  @ManyToOne(() => Resource, (resource) => resource.id)
  resource: Resource;
}
