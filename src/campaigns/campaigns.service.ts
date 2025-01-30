import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from '../schemas/Submissions/campaign.schema';

@Injectable()
export class CampaignsService {
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<Campaign>) {}

  async findAllActive() {
    return this.campaignModel.find({ status: 'active' }).lean();
  }
}