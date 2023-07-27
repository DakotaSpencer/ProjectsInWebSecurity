const sqlDAL = require('../data/sqlDAL');

const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

exports.getQuestions = async function () {
    let results = await sqlDAL.getQuestions();
    return results;
}