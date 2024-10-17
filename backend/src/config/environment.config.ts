import dotenv from 'dotenv';

dotenv.config();

export interface EnvironmentConfig {
  DB_URI: string;
  DB_NAME: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = process.env.NODE_ENV || 'development';

  const config: EnvironmentConfig = {
    DB_URI: process.env.DB_URI || '',
    DB_NAME: process.env.DB_NAME || 'student_management',
    PORT: parseInt(process.env.PORT || '5000', 10),
    JWT_SECRET: process.env.JWT_SECRET || '',
    NODE_ENV: env,
  };

  if (!config.DB_URI) {
    console.error(
      "'DB_URI' (Database URI) is missing from environment variables!"
    );
    process.exit(1);
  }

  if (!config.JWT_SECRET) {
    console.error("'JWT_SECRET' is missing from environment variables!");
    process.exit(1);
  }

  return config;
};
