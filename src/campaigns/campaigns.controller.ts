import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService)
  {}

  @Get('joined')
@UseGuards(JwtAuthGuard)
async getJoinedCampaigns() {
  // Remove lean() and exec() since the service should handle query execution
  return this.campaignsService.findAllActive();
}

  
}