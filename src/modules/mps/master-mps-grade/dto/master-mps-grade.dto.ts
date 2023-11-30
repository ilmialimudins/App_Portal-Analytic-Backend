import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterGrade } from '../master-mps-grade.entity';

export class MasterGradeDto extends AbstractDto {
  @ApiProperty()
  gradeid: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  grade: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterGradeEntity: MasterGrade) {
    super(masterGradeEntity, { exludeFields: true });
    this.gradeid = masterGradeEntity.gradeid * 1;
    this.code = masterGradeEntity.code;
    this.grade = masterGradeEntity.grade;
    this.description = masterGradeEntity.description;
    this.isdelete = masterGradeEntity.isdelete;
  }
}
