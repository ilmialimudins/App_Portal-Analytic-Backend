import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype.entity';
import { IsNumber, IsString } from 'class-validator';

export class TableTurnOverTerminationTypeDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  genderid: number;

  @ApiProperty()
  gradeid: number;

  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  terminationtypeid: number;

  @ApiProperty()
  turnover: number;

  @ApiProperty()
  isdelete: string;

  constructor(
    tableTurnOverTerminationTypeEntity: TableTurnOverTerminationType,
  ) {
    super(tableTurnOverTerminationTypeEntity, { exludeFields: true });
    this.id = tableTurnOverTerminationTypeEntity.id * 1;
    this.genderid = tableTurnOverTerminationTypeEntity.genderid;
    this.gradeid = tableTurnOverTerminationTypeEntity.gradeid;
    this.propertyid = tableTurnOverTerminationTypeEntity.propertyid;
    this.terminationtypeid =
      tableTurnOverTerminationTypeEntity.terminationtypeid;
    this.turnover = tableTurnOverTerminationTypeEntity.turnover;
    this.isdelete = tableTurnOverTerminationTypeEntity.isdelete;
  }
}

export class MPSTurnOverTerminationTypeUpdate {
  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  grade: string;

  @ApiProperty()
  @IsString()
  terminationtype: string;

  @ApiProperty()
  @IsNumber()
  turnover: number;
}
