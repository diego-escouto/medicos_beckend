module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4 },
    email: { type: 'string' },
    senha: { type: 'string', minLength: 8},
  },
  required: ['email', 'senha'],
  additionalProperties: false,
};
