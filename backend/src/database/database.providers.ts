import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
      // pretty clever way to infer type
      return mongoose.connect('mongodb://127.0.0.1:27018/backendTemplate');
      // return mongoose.connect('mongodb://localhost/nest');
    },
  },
];
