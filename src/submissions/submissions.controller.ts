import { Body, Controller, Post, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../shared/s/get-user.decorator';
import { SubmissionsService } from './submissions.service';
import { Submission } from '../schemas/Submissions/submission.schema';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles.decorator';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSubmission(
    @Body() body: { campaignId: string; contentLink: string },
    @GetUser() user: { userId: string },
  ) {
    return this.submissionsService.create({
      campaignId: body.campaignId,
      influencerId: user.userId,
      contentLink: body.contentLink,
    });
  }

  @Get('campaign/:campaignId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('brand')

  async getCampaignSubmissions(@Param('campaignId') campaignId: string) {
    const result = await this.submissionsService.findByCampaignId(campaignId);
    return result.map(doc => doc.toObject()); // Convert to plain objects here
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('brand')
  async updateSubmissionStatus(
    @Param('id') id: string,
    @Body() body: { status: 'approved'| 'rejected'}
  ){
    return this.submissionsService.findByIdAndUpdate(
      id,
      {status: body.status},
      {new: true},
    );
  }

}