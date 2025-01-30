import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from '../schemas/Submissions/submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}
  async findByIdAndUpdate(id: string, update: Partial<Submission>, options: { new: boolean }) {

    return this.submissionModel.findByIdAndUpdate(id, update, options);
  }

  async findByCampaignId(campaignId: string) {
    return this.submissionModel
      .find({ campaignId })
      .populate('influencerId', 'email');
  }

 

  async create(submissionData: any) {
    const newSubmission = new this.submissionModel(submissionData);
    return newSubmission.save();
  }
}