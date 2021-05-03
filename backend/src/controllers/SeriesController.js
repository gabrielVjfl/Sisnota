const express = require("express");

const Model = require("../database/models");

const Series = Model.Series;

class SeriesController {
  async create(req, res) {
    try {
      const { nome } = req.body;

      let existsSerie = await Series.findOne({ where: { nome: nome } });

      if (existsSerie) {
        res.status(400).json({ errBackend: "Série já cadastrada" });
      } else {
        const data = {
          nome,
        };

        let response = await Series.create(data);

        res.status(201).json(response);
      }
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
  async index(req, res) {
    try {
      let response = await Series.findAll();

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
}

module.exports = new SeriesController();
