import dotenv from 'dotenv';
import {swaggerUi, swaggerDocs} from './utils/swagger.js';
import {app} from './app.js';


const PORT = process.env.PORT || 8080;

// Load environment variables and connect to database
dotenv.config({ path: './.env' });
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

