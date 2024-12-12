import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { promises } from 'dns';
import { ICreateUser } from '@avans-nx-workshop/shared/api';
import {Neo4JUserService} from '@avans-nx-workshop/backend/neo4j'
import { IsMongoId } from 'class-validator';
@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<IUserInfo[]> {
        this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IUser | null> {
        this.logger.log(`finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async findOneByEmail(email: string): Promise<IUserInfo | null> {
        this.logger.log(`Finding user by email ${email}`);
        const item = this.userModel
            .findOne({ emailAddress: email })
            .select('-password')
            .exec();
        return item;
    }

    create1(userData: ICreateUser): Promise<IUserInfo> {
        // Create a new user document without setting the _id (MongoDB will handle that)
        const user = new this.userModel({
          name: userData.name,
          emailAddress: userData.emailAddress,
          password: userData.password,
          profileImgUrl: '',  // Optional field (you can set a default or null if not needed)
           // Default value
          isActive: true, // Default active status
        });
      
        return user.save(); // MongoDB will auto-generate the _id field
      }
      

    async create(user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log(`Create user ${user.name}`);
        const createdItem = this.userModel.create(user);
        return createdItem;
    }

    async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
        this.logger.log(`Update user ${user.name}`);
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }

    async delete(_id: string): Promise<{ message: string }> {
        this.logger.log(`Deleting user with id ${_id}`);
        const result = await this.userModel.deleteOne({ _id }).exec();
        if (result.deletedCount === 0) {
            throw new HttpException(`User with id ${_id} not found`, 404);
        }
        return { message: `User with id ${_id} deleted successfully` };
    }
}
