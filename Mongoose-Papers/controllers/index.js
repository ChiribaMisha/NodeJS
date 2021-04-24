const Users = require('../model/Users');
const Papers = require('../model/Papers');
const mongoose = require('mongoose');

const createPapers = async (req, res) => {
  const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum corrupti facilis voluptatibus, cumque fugiat maiores reiciendis tempore? Ut dolore illo veritatis deleniti nihil sint eum corporis eos quos voluptate? Corrupti?';
  const author = '6081451a9524273254331881';
  const subscriber = '6065ecc6af9411295cdcb057'
  const papers = await Papers.addPapers('Doc3', text, author, subscriber);
  papers.save();
  res.sendStatus(200);
};

const getPapers = async (req, res) => {
  const arrPapers = await Papers.find({}).populate('subscriber author', 'name',);
  console.log(arrPapers);
  res.sendStatus(200);
};

module.exports = {
  createPapers,
  getPapers,
};