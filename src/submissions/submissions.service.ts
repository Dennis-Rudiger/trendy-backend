import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from '../schemas/Submissions/submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(@InjectModel(Submission.name) private submissionModel: Model<Submission>) {}

  async create(submissionData: any) {
    const newSubmission = new this.submissionModel(submissionData);
    return newSubmission.save();
  }
}