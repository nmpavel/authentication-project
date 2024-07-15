import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectSchema } from "./schema/project.schema";
import { JwtModule } from "@nestjs/jwt";
import JwtConfigService from "src/core/jwt/jwt-config.service";
import { UsersSchema } from "../users/schema/users.schema";
import JwtHelper from "src/core/jwt/jwt.helper";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'Project', schema: ProjectSchema },
        ]),
    ],
    controllers: [ProjectController],
    providers: [ProjectService, JwtHelper]
})
export class ProjectModule {
}
