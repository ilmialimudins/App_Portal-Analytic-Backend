import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { LocationDto } from './dto/master-location.dto';
import { Company } from '../master-company-ees/master-company-ees.entity';
import { TableProperty } from '../mps/table-mps-property/table-mps-property.entity';

@Entity('ms_location')
@UseDto(LocationDto)
export class Location extends AbstractEntity<LocationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'locationid' })
  locationid: number;

  @Column({ type: 'varchar', name: 'locationcode', nullable: false })
  locationcode: string;

  @Column({ type: 'varchar', name: 'locationdesc', nullable: false })
  locationdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @Column({ type: 'varchar', name: 'isdelete', nullable: true })
  isdelete: string;

  @OneToMany(() => Company, (company) => company.locationid)
  company: Company[];

  @OneToMany(() => TableProperty, (property) => property.locationid)
  property: TableProperty[];
}
