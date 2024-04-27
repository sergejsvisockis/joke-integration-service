import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('jokes')
export class JokeEntity {

  @PrimaryColumn({ type: 'varchar', length: 11 })
  public id: string;

  @Column({ type: 'varchar', length: 1000 })
  public joke: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  set setJoke(value: string) {
    this.joke = value;
  }
}
