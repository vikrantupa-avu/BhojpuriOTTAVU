import { Injectable, Logger } from '@nestjs/common';
import { RequestOtpDto } from './dto/request-otp.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async requestOtp(dto: RequestOtpDto) {
    this.logger.log(`OTP requested for ${dto.phoneNumber}`);
    return {
      message: 'OTP request accepted. Integrate Firebase Auth verification on client and backend token exchange.',
      provider: 'firebase-auth',
    };
  }
}
