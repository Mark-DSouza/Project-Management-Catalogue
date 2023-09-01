import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { User } from 'src/users/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(AuthService.name);
  async signup(dto: AuthDto): Promise<Omit<User, 'hashedPassword'>> {
    try {
      // generate the hashed password
      const hashedPassword = await argon.hash(dto.password);

      // save the new user in the database
      const user = await this.userRepository.save({
        email: dto.email,
        hashedPassword,
      });

      // return the saved user
      delete user.hashedPassword;

      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === 'ER_DUP_ENTRY'
      ) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.userRepository.findOneBy({ email: dto.email });

    // if user does not exiist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare password
    const isPasswordMatching = await argon.verify(
      user.hashedPassword,
      dto.password,
    );

    // if password incorrect throw exception
    if (!isPasswordMatching) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // send back the user
    delete user.hashedPassword;
    return user;
  }
}
