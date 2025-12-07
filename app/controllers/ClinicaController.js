const models = require('../models/index.js');
const Clinica = models.clinica.Clinica;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/clinica/novaClinica.js');
const validacao = ajv.compile(schema);

class ClinicaController {
    findByJogador(request, response) {
        Clinica.findAllByMedicoId(request.params.id_medico)
            .then((clinicas) => {
                if (clinicas && clinicas.length > 0) {
                    return response.status(200).json(clinicas);
                }
                return response.status(404).json({ message: 'Nenhuma clinica foi encontrada para este médico' });
            })
            .catch((error) => {
                return response.status(500).json({ message: error.message });
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

        const clinicaParaCriar = {
            ...request.body,
            id_medico: request.params.id_medico,
        };

        Clinica.create(clinicaParaCriar)
            .then((novaClinica) => {
                return response.status(201).json(novaClinica);
            })
            .catch((erro) => {
                return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
            });


    }

    update(request, response) {
        let validacoes = validacao(request.body);
        if (!validacoes) {
            let mensagem = validacao.errors[0].instancePath.replace('/', '');
            mensagem += ' ' + validacao.errors[0].message;
            return response.status(400).json({
                message: mensagem,
            });
        }

        const clinicaParaAtualizar = {
            ...request.body,

        };


        Clinica.update(request.body, request.params.id_medico, request.params.id_clinica)
            .then(clinicaAtualizado => {
                if (clinicaAtualizado == 1) {
                    Clinica.findOne(request.params.id_medico, request.params.id_clinica).then(data => {
                        response.send(data);
                    });
                } else {
                    response.send({
                        message: `Não foi possível atualizar a clínica com id=${request.params.id_clinica}. Talvez a clínica não foi encontrada ou o req.body está vazio!`
                    });
                }
            })

             
            .catch(erro => {
                return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
            });

    }
}

module.exports = new ClinicaController();