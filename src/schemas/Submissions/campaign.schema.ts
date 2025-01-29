import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop()
  title: string;

  @Prop()
  brandId: string;

  @Prop()
  deadline: Date;

  @Prop()
  instructions: string;

  @Prop({ default: 'active' })
  status: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);