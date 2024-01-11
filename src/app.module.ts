import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
//import { typeOrmConfig } from './config/typeorm.config';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
