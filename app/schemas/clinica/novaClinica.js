module.exports = {
  type: 'object',
  properties: {
    rezaSocial: { type: 'string' },
    cep: { type: 'string' },
    cnpj: { type: 'string' },
  },
  required: ['razaoSocial', 'cep', 'cnpj'],
  additionalProperties: false,
};