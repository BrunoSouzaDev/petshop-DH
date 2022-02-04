const { check } = require('express-validator');

const validadores = {
  cadstroValidador: [
    check('nome').isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres.'),
    check('descricao').notEmpty
  ],
}

module.exports = validadores;