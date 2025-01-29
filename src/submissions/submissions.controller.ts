import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../shared/s/get-user.decorator';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSubmission(
    @Body() body: { campaignId: string; contentLink: string },
    @GetUser() user: { userId: string }, // Get influencer ID from JWT
  ) {
    return this.submissionsService.create({
      campaignId: body.campaignId,
      influencerId: user.userId,
      contentLink: body.contentLink,
    });
  }
}