import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { validateOrReject } from 'class-validator';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // create(createUserDto: CreateUserDto): Promise<User> {

  //   let user: User = new User();

  //   user.firstname = createUserDto.firstname;
  //   user.lastname = createUserDto.lastname;
  //   user.age = createUserDto.age;
  //   user.email= createUserDto.email;
  //   return this.userRepository.save(user);
  // }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     let user: User = new User();

  //     user.firstname = createUserDto.firstname;
  //     user.lastname = createUserDto.lastname;
  //     user.age = createUserDto.age;
  //     user.email = createUserDto.email;

  //     return await this.userRepository.save(user);
  //   } catch (error) {
  //     // Check if the error is due to a unique constraint violation
  //     if (error.code === '23505' && error.detail.includes('email')) {
  //       throw new ConflictException('Email address already exists');
  //     }
  //     throw error; // Rethrow other errors
  //   }
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email address already exists');
    }
    const user: User = this.userRepository.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      age: createUserDto.age,
      email: createUserDto.email,
      gender: createUserDto.gender,
    });

    return await this.userRepository.save(user);
  }
  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     await validateOrReject(createUserDto, { skipMissingProperties: false });

  //     const existingUser = await this.userRepository.findOne({
  //       where: { email: createUserDto.email },
  //     });
  //     if (existingUser) {
  //       throw new ConflictException('Email address already exists');
  //     }
  //     const user: User = this.userRepository.create({
  //       firstname: createUserDto.firstname,
  //       last_name: createUserDto.last_name,
  //       age: createUserDto.age,
  //       email: createUserDto.email,
  //       gender: createUserDto.gender,
  //     });

  //     return await this.userRepository.save(user);
  //   } catch (errors) {
  //     throw new BadRequestException(errors);
  //   }
  // }

  // const query = this.userRepository.createQueryBuilder();
  // query.select("user")
  // .from(User, "user")
  // .where("user.name = :name", { name: "Timber" })

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.firstname', 'user.lastname', 'user.age', 'user.email'])
      .getOne();
  }

  // findOne(id: number) {
  //    return this.userRepository.find();
  // }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.age = updateUserDto.age;
    user.id = id;
    return this.userRepository.save(user);
  }
  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   const userToUpdate = await this.userRepository.findOne(id);

  //   if (!userToUpdate) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Update user properties
  //   userToUpdate.firstname = updateUserDto.firstname;
  //   userToUpdate.lastname = updateUserDto.lastname;
  //   userToUpdate.age = updateUserDto.age;

  //   return await this.userRepository.save(userToUpdate);
  // }

  remove(id: string) {
    return this.userRepository.delete(+id);
  }
  async deleteAll(): Promise<void> {
    await this.userRepository.clear();
  }
}
