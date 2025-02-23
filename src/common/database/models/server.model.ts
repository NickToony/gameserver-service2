import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { GameModel } from './game.model';

@Entity('server')
export class ServerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currentPlayers: number;

  @Column()
  maxPlayers: number;

  @Column('json', { nullable: true })
  metadata?: { [key: string]: string };

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GameModel, (game) => game.id)
  game?: GameModel;
  @Column()
  gameId: number;
}
