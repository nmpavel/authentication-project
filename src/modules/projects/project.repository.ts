import mongoose, { Model, Types } from 'mongoose';
import { Project } from './schema/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export class ProjectRepository<ProjectDocument extends Project> {
    constructor(private readonly model: Model<ProjectDocument>) { }

    async createEntity(data: CreateProjectDto): Promise<Project> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Project | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProjectDto): Promise<Project | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteEntity(id: string): Promise<boolean> {
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<Project[]> {
        return await this.model.find({ isDeleted: false });
    }
}