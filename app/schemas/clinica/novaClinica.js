module.exports = {
  type: 'object',
  properties: {
    razaoSocial: { type: 'string' },
    cep: { type: 'string' },
    cnpj: { type: 'string' },
  },
  required: ['razaoSocial', 'cep', 'cnpj'],
  additionalProperties: false,
};