import { Body, Controller, Post, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../shared/s/get-user.decorator';
import { SubmissionsService } from './submissions.service';
import { Submission } from '../schemas/Submissions/submission.schema';

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
  @UseGuards(JwtAuthGuard)
  async getCampaignSubmissions(@Param('campaignId') campaignId: string) {
    const submissions = await this.submissionsService.findByCampaignId(campaignId);
    return submissions;
  }
}