import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

// la configuración para JWT debe ser asíncrona, ya que lee de las variables de entorno
export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '7d' },
    };
  },
};
