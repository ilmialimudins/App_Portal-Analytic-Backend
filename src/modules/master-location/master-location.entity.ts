import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { LocationDto } from './dto/master-location.dto';
import { MasterCompanyEES } from '../master-company-ees/master-company-ees.entity';

@Entity('ms_location')
@UseDto(LocationDto)
export class Location extends AbstractEntity<LocationDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'locationid' })
  locationid: number;

  @Column({ type: 'bigint', name: 'locationcode', nullable: false })
  locationcode: number;

  @Column({ type: 'varchar', name: 'locationdesc', nullable: false })
  locationdesc: string;

  @Column({ type: 'varchar', name: 'desc', nullable: true })
  desc: string;

  @OneToMany(
    () => MasterCompanyEES,
    (mastercompanyees) => mastercompanyees.locationid,
  )
  mastercompanyees: MasterCompanyEES[];
}
