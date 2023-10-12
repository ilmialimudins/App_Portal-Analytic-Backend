import { AbstractEntity } from 'src/common/abstract.entity';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PowerBIDto } from './dto/powerbi-temp.dto';

@Entity('tbl_z_token_pbi')
@UseDto(PowerBIDto)
export class PowerBI extends AbstractEntity<PowerBIDto> {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'pbiid' })
  pbiid: number;

  @Column({ type: 'varchar', name: 'access_token', nullable: false })
  access_token: string;

  @Column({ type: 'varchar', name: 'dashboard', nullable: false })
  dashboard: string;
}
