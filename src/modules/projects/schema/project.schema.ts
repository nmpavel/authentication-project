import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';


@Schema({ timestamps: true, id: true, versionKey: false })
export class Project extends AbstractDocument {
  @Prop({default:null, nullable: true })
  title: string;

  @Prop({ default:null , nullable: true })
  shortDescription: string;

  @Prop({default: null , nullable: true })
  description: string;

  @Prop({ default: null })
  urlSlug: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);