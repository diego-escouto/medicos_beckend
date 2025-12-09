const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');
const novaClinica = require('./app/schemas/clinica/novaClinica');
const novoMedico = require('./app/schemas/medico/novoMedico');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game API - Pack de Aprendizado',
      version: '1.0.0',
      description: 'Documentação da API RESTful para gestão de Médicos e clinicas',
    },
    servers: [
      {
        url: 'http://localhost:3000' || 'https://medicos-beckend.onrender.com/api-docs', // A URL base do seu servidor (verifique em seu .env)
        description: 'Servidor de Desenvolvimento',
      },
    ],
    // Define o esquema de segurança para o Token JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Para acessar as rotas protegidas, insira o token no formato: Bearer [seu_token]'
        }
      },
      // Define os "objetos" que sua API usa
      schemas: {
        Medico: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do medico', example: 1 },
            nome: { type: 'string', description: 'Nome do medico', example: 'medico1' },
            crm: { type: 'string', description: 'CRM do medico', example: "123456" },
            especialidade: { type: 'string', description: 'especialidade do medico', example: "neurologista" },

          }
        },
        novoMedico: {
          type: 'object',
          required: ['nome', 'crm', 'especialidade'],
          properties: {
            id: { type: 'integer', description: 'ID do medico' },
            nome: { type: 'string', description: 'Nome do medico' },
            crm: { type: 'string', description: 'CRM do medico' },
            especialidade: { type: 'string', description: 'especialidade do medico' },
          }
        },
        Clinica: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID da clinica' },
            id_medico: { type: 'integer', description: 'ID do medico que trabalha na clinica' },
            razaoSocial: { type: 'string', description: 'Nome da clinica', example: 'CTR' },
            cep: { type: 'string', description: 'Cep da clinica', example: "88000000" },
            cnpj: { type: 'string', description: 'CNPJ da clinica', example: "XX.XXX.XXX/XXXX-XX" }
          }
        },
        novaClinica: {
          type: 'object',
          required: ['razaoSocial', 'cep', 'cnpj'],
          properties: {
            razaoSocial: { type: 'string', description: 'Nome da clinica' },
            cep: { type: 'string', description: 'Cep da clinica' },
            cnpj: { type: 'string', description: 'CNPJ da clinica' }
          }
        },
        Cliente: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', description: 'Nome do cliente' },
            email: { type: 'string', description: 'Email do cliente' },
            senha: { type: 'string', description: 'Senha do cliente' }
          }
        },
        LoginCliente: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', description: 'Email do cliente' },
            senha: { type: 'string', description: 'Senha do cliente' }
          }
        }
      }
    }
  },
  // Caminho para os arquivos que contêm os comentários do Swagger
  apis: [
    './app/routes/*.js', // Aponta para todos os arquivos na sua pasta de rotas
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;