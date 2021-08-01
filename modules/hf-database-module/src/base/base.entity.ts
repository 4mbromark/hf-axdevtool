import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class HighFiveBaseEntity {

  @PrimaryGeneratedColumn({
    name: 'ID',
    type: "bigint"
  })
  id: number;

  @CreateDateColumn({
    name: 'INSERT_DATE',
    type: "timestamp"
  })
  insertDate: Date;

  @UpdateDateColumn({
    name: 'UPDATE_DATE',
    type: "timestamp"
  })
  updateDate: Date;
}