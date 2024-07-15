import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import { Constants } from "src/utils/constants";
// import {AdminAuthGuard} from "src/core/guards/admin-auth.guard";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";

@Controller({ path: "project", version: Constants.API_VERSION_1 })

export class ProjectController {
    constructor(private readonly service: ProjectService) {
    }
    @Post()
    @UseGuards(AdminAuthGuard)
    create(@Body()
    dto: CreateProjectDto) {
        return this.service.create(dto);
    }

    @Get()
    @UseGuards(AdminAuthGuard)
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string,
        @Body()
        dto: UpdateProjectDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
