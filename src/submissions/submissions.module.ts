import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from '../schemas/Submissions/submission.schema';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
    AuthModule,
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}