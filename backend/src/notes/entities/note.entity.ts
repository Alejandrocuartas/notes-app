import {
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  Entity,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'text' })
  notes: string;

  @Column({ type: 'boolean', default: false })
  is_archived: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id: number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
