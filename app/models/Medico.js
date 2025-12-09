const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Medico {
  #nome;
  #crm;
  #especialidade;


  // constructor(nome, ataque, defesa, pontos_vida = null ) {
  constructor() { }

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get crm() {
    return this.#crm;
  }
  set crm(crm) {
    this.#crm = crm;
  }

  get especialidade() {
    return this.#especialidade;
  }
  set especialidade(especialidade) {
    this.#especialidade = especialidade;
  }



  static async findByPk(id) {
    try {
      const resultado = await MedicoModel.findByPk(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll(clinica) {
    try {
      const resultados = await MedicoModel.findAll({ 
        include: [{ association: 'clinicas', attributes: ['id', 'razaoSocial', 'cep', 'cnpj'] }]
      }); //{where ...}
      if (resultados) {
        return resultados;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async create(novoMedico) {
    try {
      const medico = await MedicoModel.create({
        nome: novoMedico.nome,
        crm: novoMedico.crm,
        especialidade: novoMedico.especialidade,
      });
      return medico;
    } catch (error) {
      throw error;
    }
  }

  static async update(dados, id_medico) {
    try {
      const resultado = await MedicoModel.update(dados, { where: { id: id_medico } });

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

  static async delete(id) {
    try {
      const data = await MedicoModel.findByPk(id);
      if (data) {
        data.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

const MedicoModel = db.define('medico', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  crm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  especialidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});

module.exports = { Medico, MedicoModel };
