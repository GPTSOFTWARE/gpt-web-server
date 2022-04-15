import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/services/base.service';
import { CacheService } from 'src/common/services/cache.service';
import { TokenService } from 'src/common/services/token.service';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService extends BaseService<Admin> {
  private bcrypt;
  constructor(
    @InjectRepository(Admin) repo: Repository<Admin>,
    private tokenService: TokenService,
    private cacheService: CacheService
  ) {
    super(repo);

    this.bcrypt = bcrypt;
  }

  async login(input: InputSetLogin) {
    const admin = await this.repo.findOne({ username: input.username });

    if (!admin) {
      throw new UnauthorizedException('Your username is incorrect!!');
    }
    if (!(await this.bcrypt.compare(input.password, admin.password))) {
      throw new UnauthorizedException('Your password is incorrect');
    }

    const jwt = this.tokenService.sign({...admin});
    await this.cacheService.setValue<string>(input.username, jwt, { ttl: 86400 })

    return jwt;
  }

  async isExist(input: Admin){
    return !!(await this.repo.findOne(input));
  }
}
