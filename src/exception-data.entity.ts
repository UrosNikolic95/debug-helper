import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "exception_data" })
export class ExceptionDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_name: string;

  @Column()
  function_name: string;

  @Column({ type: "json" })
  input_paramaters: Object;
}
