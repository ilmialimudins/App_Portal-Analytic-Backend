import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EESFactor } from './factor.entity';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FactorDto } from './dto/factor.dto';
import { GetByIdDto } from 'src/common/dto/get-by-id';
import { AddFactorDto } from './dto/add-factor.dto';

@Injectable()
export class FactorService {
  constructor(
    @InjectRepository(EESFactor)
    private factorRepository: Repository<EESFactor>,
  ) {}

  async getAllFactor(pageOptions: PageOptionsDTO): Promise<PageDto<FactorDto>> {
    try {
      const query = this.factorRepository
        .createQueryBuilder('factor')
        .orderBy('factor.factorname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getFactorById(id: GetByIdDto): Promise<FactorDto | undefined> {
    try {
      const query = await this.factorRepository
        .createQueryBuilder('factor')
        .where('factor.id = :id', { id: id.id })
        .getOne();
      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async addFactor(factor: AddFactorDto) {
    try {
      const query = await this.factorRepository
        .createQueryBuilder('mastercompany')
        .insert()
        .into(EESFactor)
        .values({
          factorcode: factor.factorcode,
          factorname: factor.factorname,
        })
        .execute();
      return query;
    } catch (error) {
      throw error;
    }
  }
}
