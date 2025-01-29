import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ MongooseModule.forRoot('mongosh "mongodb+srv://cluster0.msg9n.mongodb.net/" --apiVersion 1 --username rudigabuilds --password 8yGVlqUeDUBsg5gR'),
  AuthModule,
  CampaignsModule, 
  SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
