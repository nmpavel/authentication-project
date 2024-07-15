import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './modules/users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from './core/jwt/jwt-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/projects/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DATABASE_URL),
  MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  JwtModule.registerAsync({
      useClass: JwtConfigService,
  }),
  UsersModule,
  AuthModule,
  ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
