import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database connected!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});