import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import JwtHelper from '../../core/jwt/jwt.helper';
import { Constants } from '../../utils/constants';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../users/schema/users.schema';
import { UsersRepository } from '../users/users.repository';
import BCryptUtils from 'src/utils/bcrypt.utils';
import { ResponseUtils } from 'src/utils/response.utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtHelper: JwtHelper,
        @InjectModel('Users') private readonly usersModel: Model<Users>
    ) { }

    private readonly usersRepository = new UsersRepository(this.usersModel);

    async login(dto: LoginAuthDto): Promise<any> {
        const { email, password } = dto;
        const data = await this.usersRepository.findOneByFilterQuery({ email: email })

        if (!data) {
            throw new NotFoundException(
                Constants.NOT_FOUND,
            );
        }

        const resData = await this.authenticateUser(
            password,
            data
        )
        if (resData == null) {
            // handle unauth
            throw new UnauthorizedException(
                Constants.UNAUTH_REQ
            );
        }
        return resData;
    }

    async authenticateUser(
        password: string,
        user: Users
    ): Promise<any> {
        const { password: passwordHash, ...entityWithoutPassword } = user;

        const matched = await BCryptUtils.compare(password, passwordHash);
        if (matched) {
            const token = this.jwtHelper.generateToken(
                {
                    userId: entityWithoutPassword._id
                },
                '7d'
            );
            return {
                token: token,
                user: entityWithoutPassword
            };
        }
        return null;
    }

    async register(dto: RegisterAuthDto): Promise<Users | Error> {
        const data = await this.usersRepository.createEntity(dto);

        if (!data) {
            throw new BadRequestException(
                Constants.CREATE_FAILED,
            );
        }

        const { email, password } = dto;
        const loginData = await this.login({
            email: email,
            password: password
        });
        return ResponseUtils.successResponseHandler(201, "Registered successfully!", "data", loginData);
    }

    async validateRequest(req: any): Promise<boolean> {
        try {
            const bearerToken = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!bearerToken || !bearerToken.startsWith(bearer)) {
                return false;
            }
            const token = bearerToken.replace(bearer, '');
            const jwtPayload = this.jwtHelper.verifyToken(token);
            const data = await this.usersRepository.findOneEntity(jwtPayload.userId);
            if (!data || data instanceof Error) {
                return false;
            }

            req.data = data;

            return true;
        } catch (e) {
            return false;
        }
    }

}
