import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop()
  title: string;


  @Prop()
  deadline: Date;

  @Prop()
  instructions: string;

  @Prop({ default: 'active' })
  status: string;
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
    })
    brandId: string;
  

}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);