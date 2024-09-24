import dotenv from 'dotenv';
import {app} from './app.js';
import errorHandler from './middlewares/errorHandler.js';
import {swaggerUi, swaggerDocs} from './utils/swagger.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const PORT = process.env.PORT || 8080;

// Load environment variables and connect to database
dotenv.config({ path: './.env' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

