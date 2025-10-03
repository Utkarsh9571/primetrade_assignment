import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'API documentation for Notes App',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    Note: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        user: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },

    security: [{ bearerAuth: [] }],
  },
  apis: ['./swaggerDocs.js'], // ✅ only this file now
};

const specs = swaggerJSDoc(options);

export default { swaggerUi, specs };
