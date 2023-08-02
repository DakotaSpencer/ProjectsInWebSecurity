const sqlDAL = require('../data/sqlDAL');

const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

/**
 * 
 * @param {number} total
 * @returns questions
 */
exports.getQuestions = async function (total) {
    let results = await sqlDAL.getQuestions(total);
    return results;
}

exports.getLeaderboard = async function (quantity){
    let results = await sqlDAL.getLeaderboard(quantity);
    return results;
}