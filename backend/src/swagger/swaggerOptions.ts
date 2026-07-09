const swaggerOptions = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'ShopSphere API',
      version: '1.0.0',
      description: 'Professional E-Commerce Backend API Documentation',
    },

    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Sonu',
            },
            email: {
              type: 'string',
              example: 'sonu@gmail.com',
            },
            password: {
              type: 'string',
              example: 'Password@123',
            },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'sonu@gmail.com',
            },
            password: {
              type: 'string',
              example: 'Password@123',
            },
          },
        },

        UserResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
