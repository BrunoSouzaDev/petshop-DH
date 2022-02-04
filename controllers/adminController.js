const servicosModel = require('../models/servicos.json');
const uuidv4 = require('uuidv4');
const fs = require('fs');
const { validationResult } = require('express-validator');

const adminController = {
  index: function(req, res) {
    res.render('admin');
  },
  buscarServicos: function(req, res) {
    res.render('adminServicos', { servicos: servicosModel })
  },
  cadastrarServicos: function(req, res) {
    res.render('servicosCadastro')
  },
  store: function(req, res) {
    const erros = validationResult(req);
    
    if (!erros.isEmpty()){
      console.log(erros);
      return;
    }
    
    const { nome, preco, descricao } = req.body;
    
    const servico = {
      id: uuidv4.uuid(),
      nome,
      preco: Number(preco),
      descricao,
      fotoUrl: req.file.filename
    }

    servicosModel.push(servico);

    fs.writeFileSync(__dirname + '/../models/servicos.json', JSON.stringify(servicosModel))

    res.redirect('/admin/servicos');
  },
  editarServicos: function(req, res) {
    const { id } = req.params;

    const servico = servicosModel.find(servico => servico.id === id);

    res.render('servicosEditar', { servico });
  },
  update: function(req, res) {
    const { id } = req.params;

    const { nome, preco, descricao } = req.body;

    const servico = servicosModel.find(servico => servico.id === id);

    if (typeof req.file !== 'undefined' ) {
      servico.fotoUrl = req.file.filename;
    }

    servico.nome = nome;
    servico.preco = Number(preco);
    servico.descricao = descricao;

    fs.writeFileSync(__dirname + '/../models/servicos.json', JSON.stringify(servicosModel))

    res.redirect('/admin/servicos');
  }
};

module.exports = adminController;