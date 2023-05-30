import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractDto } from './dto/abstract.dto';
import { Constructor } from 'src/types';

export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  id: number;
  createdtime: Date;
  createddate: number;
  sourcecreatedmodifiedtime: Date;

  toDto(options?: O): DTO;
}

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'createdby', nullable: true })
  createdby: string;

  @Column({ type: 'varchar', name: 'updatedby', nullable: true })
  updatedby: string;

  @CreateDateColumn()
  createdtime: Date;

  @Column({ name: 'createddate', type: 'int', nullable: true })
  createddate: number;

  @UpdateDateColumn()
  sourcecreatedmodifiedtime: Date;

  @Column({ name: 'sync_date', type: 'datetime', nullable: true })
  sync_date: Date;

  private dtoClass?: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O | undefined): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}
