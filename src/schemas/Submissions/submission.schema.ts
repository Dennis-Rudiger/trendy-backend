import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Submission extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'User'})
  
 
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