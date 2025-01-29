import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { connection } from 'mongoose';
import { error } from 'console';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectConnection() private connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.asPromise();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    
    MongooseModule.forRootAsync({
      useFactory: () =>({
        uri:process.env.MONGODB_URI,
        connectionFactory: (connection) =>{
          connection.on('error', (error) =>{
            console.error('MongoDB connection error:', error);
          });
          return connection;
        },
      }),
    }),
  AuthModule,
  CampaignsModule, 
  SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
