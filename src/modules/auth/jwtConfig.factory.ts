import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  const secret = configService.get<string>('JWT_SECRET');
  const expiresIn = configService.get<string>('JWT_EXPIRES_IN');

  return {
    global: false,
    secret,
    signOptions: {
      expiresIn,
    },
  };
};
