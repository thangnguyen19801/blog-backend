import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'db/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { RoleModule } from './role/role.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AbilityModule } from './ability/ability.module';
import { LikeModule } from './like/like.module';

import { RatingModule } from './rating/rating.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import { GatewayModule } from './gateway/gateway.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot(config),
    UserModule,
    BlogModule,
    RoleModule,
    TagModule,
    AuthModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AbilityModule,
    CacheModule.register(),
    LikeModule,
    RatingModule,
    NotificationModule,
    AwsModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
