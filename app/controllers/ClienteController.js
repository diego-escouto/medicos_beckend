const models = require('../models');
const Cliente = models.cliente.Cliente;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/cliente/novoCliente.js');
const validacao = ajv.compile(schema);
const helper = require('../commons/helper.js');
const schemaLogin = require('../schemas/cliente/login.js');
const validacaoLogin = ajv.compile(schemaLogin);

class ClienteController {
  create(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    const cliente = {
      nome: request.body.nome ? request.body.nome : null,
      email: request.body.email,
      senha: helper.hashSenha(request.body.senha),
    };

    Cliente.create(cliente)
      .then((data) => {
        data.setDataValue('senha', '');
        data.setDataValue('token', helper.gerarTokenAcesso(cliente.nome, cliente.id));
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).send({
          message: erro.message,
        });
      });
  }

  async login(request, response) {
    // Se o corpo vier como string por algum motivo, tentamos converter.
    if (typeof request.body === 'string') {
      try {
        request.body = JSON.parse(request.body);
        console.warn('[login] parsed request.body from string');
      } catch (e) {
        console.warn('[login] request.body is string but not valid JSON');
      }
    }

    // Log do tipo recebido (ajuda no diagnóstico)
    try {
      console.warn('[login] request.body (type):', typeof request.body);
    } catch (e) {
      /* ignore */
    }

    let validacoes = validacaoLogin(request.body);
    if (!validacoes) {
      // Log temporário para diagnosticar payload inválido
      try {
        console.warn('[login] request.body:', JSON.stringify(request.body));
      } catch (e) {
        console.warn('[login] request.body (non-serializable)');
      }

      let mensagem = validacaoLogin.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacaoLogin.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    let dados = request.body;
    dados.senha = helper.hashSenha(dados.senha);

    Cliente.findOne(dados)
      .then((registro) => {
        if (!registro) {
          return response.status(404).json({
            message: 'Cliente ou senha nao foram encontrados',
          });
        }
        return response.status(200).json({
          token: helper.gerarTokenAcesso(registro.nome, registro.id),
        });
      })
      .catch((erro) => {
        return response.status(500).send({
          message: erro.message,
        });
      });
  }
}

module.exports = new ClienteController();
