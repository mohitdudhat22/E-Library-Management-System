import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MERN Starter API',
        version: '1.0.0',
        description: 'API documentation for MERN Starter',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

export {
  swaggerUi,
  swaggerDocs
};