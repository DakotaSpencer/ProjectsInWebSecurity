const sqlDAL = require('../data/sqlDAL');

const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

/**
 * 
 * @param {number} total
 * @returns questions
 */
exports.getUnapprovedQuestions = async function () {
    let results = await sqlDAL.getAllUnapprovedQuestions();
    return results;
}