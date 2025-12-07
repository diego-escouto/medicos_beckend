const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Clinica {
  #razaoSocial;
  #cep;
  #cnpj;

  constructor() {}

  get razaoSocial() {
    return this.#razaoSocial;
  }
  set razaoSocial(razaoSocial) {
    this.#razaoSocial = razaoSocial;
  }

  get cep() {
    return this.#cep;
  }
  set cep(cep) {
    this.#cep = cep;
  }

  get cnpj() {
    return this.#cnpj;
  }
  set cnpj(cnpj) {
    this.#cnpj = cnpj;
  }

  static findAllByMedicoId(id_medico) {
    return ClinicaModel.findAll({ where: { id_medico } });
  }

  static create(novaClinica) {
    return ClinicaModel.create(novaClinica);
  }

  static update(clinicaAtualizada) {
    return ClinicaModel.update(clinicaAtualizada);
  }

  static findOne(id_medico, id_clinica) {
  return ClinicaModel.findOne({ where: { id: id_clinica, id_medico: id_medico } });
}

    
    static async update(dados, id_medico, id_clinica) {
      try {
        const resultado = await ClinicaModel.update(dados, { where: { id: id_clinica, id_medico: id_medico} });
        
        console.log('update model', resultado);
        if (resultado) {
          return resultado;
        } else {
          return false;
        }
      } catch (error) {
        throw error;
      }
    }

  }
  

const ClinicaModel = db.define('clinica', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_medico: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  razaoSocial: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
 cep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Clinica, EquipamentoModel };