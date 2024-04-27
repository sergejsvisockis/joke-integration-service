import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeModule } from './joke/joke.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['**/entity/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    JokeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
