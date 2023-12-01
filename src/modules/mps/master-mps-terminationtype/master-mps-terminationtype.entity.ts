import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterTerminationTypeDto } from './dto/master-mps-terminationtype.dto';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';

@Entity('ms_mps_terminationtype')
@UseDto(MasterTerminationTypeDto)
export class MasterTerminationType extends AbstractEntity<MasterTerminationTypeDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'terminationtypeid' })
  terminationtypeid: number;

  @Column({ type: 'varchar', name: 'code', nullable: true })
  code: string;

  @Column({ type: 'varchar', name: 'terminationtype', nullable: true })
  terminationtype: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(
    () => TableTurnOverTerminationType,
    (turnoverterminationtype) => turnoverterminationtype.terminationtypeid,
  )
  turnoverterminationtype: TableTurnOverTerminationType[];
}
