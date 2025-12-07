module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    crm: { type: 'string' },
    especialidade: { type: 'string'},
    
  },
  required: ['nome', 'crm', 'especialidade'],
  additionalProperties: false,
};
