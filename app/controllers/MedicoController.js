//validacao de schema
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/medico/novoMedico.js');
const validacao = ajv.compile(schema);
//models
const models = require('../models/index.js');
const Medico = models.medico.Medico;

class MedicoController {
  findAll(request, response) {
    const clinicaModel = models.clinica.clinicaModel;
    Medico.findAll(clinicaModel)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Médico nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }

  find(request, response) {
    const id = request.params.id;
    Medico.findByPk(id)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Médico nao encontrado',
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  create(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

   Medico.create(request.body)
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'erro no servidor: ' + erro.message,
        });
      });
  }

  update(request, response) {
    const id = request.params.id;

    Medico.findByPk(id)
      .then((buscaMedico) => {
        if (buscaMedico === null) {
          return response.status(404).json({
            message: 'Médico nao encontrado',
          });
        } else {
          Medico.update(request.body, id).then((atualizado) => {
            if (atualizado) {
              Medico.findByPk(id).then((medicoAtualizado) => {
                return response.status(200).json(medicoAtualizado);
              });
            } else {
              return response.status(500).json({
                message: 'ocorreu algum problema no servidor',
              });
            }
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  delete(request, response) {
    const id = request.params.id;
    Medico.delete(id)
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'Médico excluido com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'Médico nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }
}
module.exports = new MedicoController();
