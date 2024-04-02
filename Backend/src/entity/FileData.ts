import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  cycle_number: number;

  @Column({ type: "float" })
  time: number;

  @Column({ type: "float" })
  current: number;

  @Column({ type: "float" })
  voltage: number;
}
