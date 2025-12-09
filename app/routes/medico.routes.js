const express = require('express');
var router = express.Router();
const medicoController = require('../controllers/MedicoController.js');
const clinicaController = require('../controllers/ClinicaController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

/**
 * @swagger
 * tags:
 *   - name: medico
 *     description: Rotas para gerenciar médicos
 *   - name: clinica
 *     description: Rotas para gerenciar as clinicas nas quais o médico trabalha
 *   - name: cliente
 *     description: Rotas para gerenciar os clientes
 */

/**
 * @swagger
 * /medico:
 *   get:
 *     summary: Lista todos os medicos
 *     description: Retorna uma lista com todos os medicos e suas clinicas
 *     tags: [medico]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de médicos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/medico'
 *       '401':
 *         description: Não autorizado.
 */
//retorna todos os médicos
router.get('/medico', [authMiddleware.check], medicoController.findAll);


/**
 * @swagger
 * /medico/{id}:
 *   get:
 *     summary: Recupera um médico pelo seu ID
 *     description: Busca e retorna os dados de um médico específico.
 *     tags: [medico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do medico.
 *     responses:
 *       '200':
 *         description: Dados do medico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/medico'
 *       '404':
 *         description: medico não encontrado.
 */
//recupera um medico pelo seu id
router.get('/medico/:id', [authMiddleware.check], medicoController.find);


/**
 * @swagger
 * /medico:
 *   post:
 *     summary: Cria um novo medico
 *     description: Cadastra um novo medico no sistema.
 *     tags: [medico]
 *     security:
 *       - bearerAuth: []
 *     requestBody: teste
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/novoMedico'
 *     responses:
 *       '201':
 *         description: medico criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
//cria um novo medico
router.post('/medico', [authMiddleware.check], medicoController.create);

/**
 * @swagger
 * /medico/{id}:
 *   put:
 *     summary: Modifica um medico pelo seu ID
 *     description: Modifica os dados de um medico específico.
 *     tags: [medico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do medico.
 *     responses:
 *       '200':
 *         description: Dados do medico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/medico'
 *       '500':
 *         description: Erro no servidor.
 */
//atualiza um medico pelo seu id
router.put('/medico/:id', [authMiddleware.check], medicoController.update);

/**
 * @swagger
 * /medico/{id}:
 *   delete:
 *     summary: Exclui um medico pelo seu ID
 *     description: Apaga os dados de um medico específico.
 *     tags: [medico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do medico.
 *     responses:
 *       '200':
 *         description: Dados do medico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/medico'
 *       '404':
 *         description: medico não encontrado.
 */
//exclui um medico pelo seu id
router.delete('/medico/:id', [authMiddleware.check], medicoController.delete);

/**
 * @swagger
 * /medico/{id_medico}/clinica:
 *   get:
 *     summary: retorna todas as clinicas associadas a um médico
 *     description: retorna todas as clinicas associadas a um médico.
 *     tags: [clinica]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do médico que receberá a clinica.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/novaClinica'
 *     responses:
 *       '201':
 *         description: clinica criada e associada ao médico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clinica'
 *       '400':
 *         description: Dados da clinica são inválidos.
 */
//retorna todas as clinicas associadas a um médico
router.get('/medico/:id_medico/clinica', [authMiddleware.check], clinicaController.findByJogador);

/**
 * @swagger
 * /medico/{id_medico}/clinica:
 *   post:
 *     summary: cria uma nova clinica e o associa a um médico
 *     description: cria uma nova clinica e o associa a um médico.
 *     tags: [clinica]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do medico que terá a clinica associada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/novaClinica'
 *     responses:
 *       '201':
 *         description: clinica criada e o associada ao médico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clinica'
 *       '400':
 *         description: Dados da clinica são inválidos.
 */
//cria uma nova clinica e o associa a um médico
router.post('/medico/:id_medico/clinica', [authMiddleware.check], clinicaController.create);

/**
 * @swagger
 * /medico/{id_medico}/clinica/:id_clinica:
 *   put:
 *     summary: Atualiza uma clinica associada a um médico
 *     description: Modifica uma clinica associada a um médico.
 *     tags: [clinica]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do medico que terá a clinica atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/novaClinica'
 *     responses:
 *       '201':
 *         description: Clinica atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       '500':
 *         description: Dados da clinica inválidos.
 */
//Atualiza uma clinica associada a um médico
router.put('/medico/:id_medico/clinica/:id_clinica', [authMiddleware.check], clinicaController.update);

module.exports = router;