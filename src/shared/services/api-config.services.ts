import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  get mssqlConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'mssql',
      name: 'connection1',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: false,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      options: { encrypt: false },
      // do net enable this using migration instead
      synchronize: false,
    };
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }

  get duendeAuthority(): string {
    return this.get('DUENDE_AUTHORITY');
  }

  get duendeClientId(): string {
    return this.get('DUENDE_CLIENTID');
  }

  get duendeRedirectUrl(): string {
    return this.get('DUENDE_REDIRECTURL');
  }

  get duendeCodeVerifier(): string {
    return this.get('DUENDE_CODEVERIFIER');
  }

  get duendeClientSecret(): string {
    return this.get('DUENDE_CLIENTSECRET');
  }

  get powerBITenantId(): string {
    return this.get('POWERBI_TENANTID');
  }

  get powerBIClientId(): string {
    return this.get('POWERBI_CLIENTID');
  }

  get powerBIClientSecret(): string {
    return this.get('POWERBI_CLIENTSECRET');
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + 'environment variable does not set');
    }

    return value;
  }
}
