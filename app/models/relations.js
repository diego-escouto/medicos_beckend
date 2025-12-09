//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {
  //este relacionamento poderia estar em app/models/Medico:
  models.medico.hasMany(models.clinica, {
    foreignKey: {
      name: 'id_medico',
      allowNull: true, 
    },
    as: 'clinicas',
    onDelete: 'SET NULL',
  });
  //este relacionamento poderia estar em app/models/Clinica:
  models.clinica.belongsTo(models.medico, {
    foreignKey: 'id_medico',
  });
};