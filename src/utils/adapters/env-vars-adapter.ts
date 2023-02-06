import { EnvVarsAdapterInterface } from '../abstract/adapters/env-vars-adapter-interface';

export class EnvVarsAdapter implements EnvVarsAdapterInterface {
  adminPassword = process.env.ADMPASSWORD;
  port = process.env.PORT;
  secret = process.env.SECRET;
}
