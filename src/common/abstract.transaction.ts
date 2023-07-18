import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export abstract class BaseTransaction<TransactionInput, TransactionOutput> {
  constructor(private readonly datasouce: DataSource) {}

  protected abstract execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput>;

  async run(data: TransactionInput): Promise<TransactionOutput> {
    const queryRunner = this.datasouce.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const result = await this.execute(data, queryRunner.manager);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      console.log('rollback');
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async runWithinTransaction(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    return this.execute(data, manager);
  }
}
