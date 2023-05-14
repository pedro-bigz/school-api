import { Resource } from "@app/resources/entities/resource.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";

@Entity({ name: "media" })
export class Media {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ length: 256 })
  model_type: string;

  @Column()
  model_id: number;

  @Column({ length: 100 })
  collection_name: string;

  @Column({ length: 256 })
  metadata: string;

  @Column({ length: 256 })
  filename: string;

  @Column({ length: 256 })
  disk: string; //could be link or path

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Resource, (resource) => resource.id)
  resource: Resource;
}
