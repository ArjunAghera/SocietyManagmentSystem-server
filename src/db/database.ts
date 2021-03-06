import { createConnection } from 'typeorm';
import { Complaint } from '../models/Complaint.model';
import { Opinion } from '../models/Opinion.model';
import { Plan } from '../models/Plan.model';
import { ResidentDetails } from '../models/ResidentDetails.model';
import { Size } from '../models/Size.model';
import { User } from '../models/User.model';
import { WorkAssigned } from '../models/WorkAssigned.model';

const db = async (cb) => {
  try {
    await createConnection({
      type: 'postgres',
      url: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
      extra: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      entities: [
        User,
        Plan,
        ResidentDetails,
        Size,
        Opinion,
        Complaint,
        WorkAssigned,
      ],
      synchronize: true,
    });
    console.log('Connected to Postgres');
    cb();
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to db');
  }
};

export default db;
