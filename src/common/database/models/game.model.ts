import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ServerModel } from './server.model';

@Entity('game')
export class GameModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  apiKey: string;

  @Column()
  active: boolean;

  @Column()
  public: boolean;

  @OneToMany(() => ServerModel, (server) => server.game)
  servers: ServerModel[];
}
