import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Submission extends Document {
  @Prop()
  campaignId: string;

  @Prop()
  influencerId: string;

  @Prop()
  contentLink: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  submissionDate: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);