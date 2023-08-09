// sqlDAL is responsible to for all interactions with mysql for Membership
const User = require('../models/user').User;
const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

const mysql = require('mysql2/promise');
// const sqlConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: 'P@ssw0rd',
//     database: 'Time4Trivia',
//     multipleStatements: false
// };

const sqlConfig = {
    host: '10.0.30.112',
    user: 'groupone',
    password: 'S3cur3P4assw0rd!',
    database: 'Time4Trivia',
    multipleStatements: false
};

/**
 * @returns and array of user models
 */
exports.getAllUsers = async function () {
    users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users;`;

        const [userResults, ] = await con.query(sql);

        // console.log('getAllUsers: user results');
        // console.log(userResults);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            // console.log(sql);
            const [roleResults, ] = await con.query(sql);

            // console.log('getAllUsers: role results');
            // console.log(roleResults);

            let roles = [];
            let isAdmin = "";
            
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
                if (role.Role == "admin"){
                    isAdmin = true
                }
            }
            let userEnabled = "";
            // console.log(u)
            if (u.IsEnabled) {
                userEnabled = true
            }
            users.push(new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles, userEnabled, isAdmin));
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }
    // console.log(users)
    return users;
}

/**
 * @returns and array of user models
 */
exports.getUsersByRole = async function (role) {
    users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users u join UserRoles ur on u.userid = ur.userId join Roles r on ur.roleId = r.roleId where r.role = '${role}'`;

        const [userResults, ] = await con.query(sql);

        // console.log('getAllUsers: user results');
        // console.log(userResults);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            // console.log(sql);
            const [roleResults, ] = await con.query(sql);

            // console.log('getAllUsers: role results');
            // console.log(roleResults);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            let userEnabled = "";
            if (u.IsEnabled) {
                userEnabled = true
            }
            let isAdmin = "";
            // if (u.) {
            //     isAdmin = true
            // }

            users.push(new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles, userEnabled, isAdmin));
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return users;
}

/**
 * @param {number} userId the userId of the user to find
 * @returns a User model or null if not found
 */
exports.getUserById = async function (userId) {
    let user = null;


    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users where UserId = ${userId}`;
        
        const [userResults, ] = await con.query(sql);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            // console.log(sql);
            const [roleResults, ] = await con.query(sql);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            user = new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return user;
}

/**
 * @param {number} userId the username of the user to find
 * @returns a User model or null if not found
 */
exports.deleteUserById = async function (userId) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `delete from UserRoles where UserId = ${userId}`;
        let result = await con.query(sql);
        // console.log(result);

        sql = `delete from Users where UserId = ${userId}`;
        result = await con.query(sql);
        // console.log(result);

        result.status = STATUS_CODES.success;
        result.message = `User ${userId} delted!`;
    } catch (err) {
        console.log(err);
        result.status = STATUS_CODES.failure;
        result.message = err.message;
    }finally{
        con.end();
    }

    return result;
}

/**
 * @param {string} username the username of the user to find
 * @returns a User model or null if not found
 */
exports.getUserByUsername = async function (username) {
    let user = null;

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users where Username = '${username}'`;
        // console.log(sql);
        
        const [userResults, ] = await con.query(sql);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            // console.log(sql);
            const [roleResults, ] = await con.query(sql);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            user = new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return user;
}

/**
 * @param {number} userId the userId of the user to find roles for
 * @returns an array of role names
 */
exports.getRolesByUserId = async function (userId) {
    results = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where UserId = ${userId}`;

        const [results, ] = await con.query(sql);

        for(key in results){
            let role = results[key];
            results.push(role.Role);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return results;
}

/**
 * @param {string} username 
 * @param {string} hashedPassword 
 * @param {string} email 
 * @returns a result object with status/message
 */
exports.createUser = async function (username, hashedPassword, email, firstName, lastName) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `insert into Users (Username, Email, Password, FirstName, LastName) values (${con.escape(username)}, ${con.escape(email)}, '${hashedPassword}', ${con.escape(firstName)}, ${con.escape(lastName)})`;
        const userResult = await con.query(sql);
        let newUserId = userResult[0].insertId;
        sql = `INSERT INTO Leaderboard (UserId,Score) VALUES(${newUserId},0);`
        await con.query(sql);
        sql = `insert into UserRoles (UserId, RoleId) values (${newUserId}, 1)`;
        await con.query(sql);

        result.status = STATUS_CODES.success;
        result.message = 'Account Created with User Id: ' + newUserId;
        result.data = newUserId;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }finally{
        con.end();
    }
}

/**
 * 
 * @param {number} userId 
 * @param {string} hashedPassword 
 * @returns a result object with status/message
 */
exports.updateUserPassword = async function (userId, hashedPassword) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Users set password = '${hashedPassword}' where userId = '${userId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = 'Profile updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} userId 
 * @param {string} firstName 
 * @param {string} lastName
 * @returns a result object with status/message
 */
exports.updateProfile = async function (userId, firstName, lastName) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Users set firstName = '${con.escape(firstName)}', lastName = '${con.escape(lastName)}' where userId = '${userId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = 'Profile updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} quantity
 * @returns a result object with status/message
 */
exports.getLeaderboard = async function (quantity) {
    results = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select u.Username, l.Score from Leaderboard l join Users u on u.UserId = l.UserId where l.Score > 0 order by l.Score desc limit ${quantity};`;
        results = await con.query(sql);
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return results;
}

/**
 * 
 * @param {number} userId
 * @param {boolean} isEnabled
 * @returns a result object with status/message
 */
exports.setIsUserEnabled = async function (userId, isEnabled) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Users set IsEnabled=${isEnabled} where userId = '${userId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Account ID ${userId} IsEnabled set to ${isEnabled}`;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} userId
 * @param {boolean} isAdmin
 * @returns a result object with status/message
 */
exports.setUserIsAdmin = async function (userId, isAdmin) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = ``;

        if (isAdmin){
            sql = `update UserRoles set RoleId=2 where userId = '${userId}'`;
        } else {
            sql = `update UserRoles set RoleId=1 where userId = '${userId}'`;
        }
        const userResult = await con.query(sql);
        console.log(sql)
        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Account ID ${userId} IsEnabled set to ${isEnabled}`;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {string} username
 * @returns a result object with status/message
 */
exports.getIsUserEnabled = async function (username) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select IsEnabled from Users where Username = '${username}'`;
        const userResult = await con.query(sql);
        
        // console.log(r);
        // result.status = STATUS_CODES.success;
        // result.isenabled = userResult[0][0].IsEnabled;
        return userResult[0][0].IsEnabled;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} userId
 * @returns a result object with status/message
 */
exports.getUserScore = async function (userId) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select Score from Leaderboard where userId = ${userId}`;
        const userResult = await con.query(sql);
        // console.log("User Result: ", userResult)
        const score = userResult[0][0].Score;
        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Leaderboard`;
        result.Score = score;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} userId
 * @param {number} gameScore
 * @returns a result object with status/message
 */
exports.updateUserScore = async function (userId, gameScore) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let currScore = (await this.getUserScore(userId)).Score;
        
        if (gameScore < currScore) {
            result.status = STATUS_CODES.success;
            result.message = `New Score Not New Highscore`;
            return result
        }

        if(gameScore>10){
            gameScore= Math.floor(Math.random() * -2);
        }

        // let sql = `REPLACE INTO Leaderboard set Score=${gameScore}, userId=${userId}`;
        let sql = `update Leaderboard set Score=${gameScore} where userId = ${userId}`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `New Highscore set to ${gameScore}`;
        return userResult;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {string} question
 * @param {string} correctAnswer
 * @param {string} incorrectAnswer1
 * @param {string} incorrectAnswer2
 * @param {string} incorrectAnswer3
 * @returns a result object with status/message
 */
exports.addNewQuestion = async function (question, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree) values (${con.escape(question)}, ${con.escape(correctAnswer)}, ${con.escape(incorrectAnswer1)}, ${con.escape(incorrectAnswer2)}, ${con.escape(incorrectAnswer3)})`;
        const userResult = await con.query(sql);
        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Question Submitted`;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} questionId
 * @param {boolean} approved
 * @returns a result object with status/message
 */
exports.setQuestionApproved = async function (questionId, approved) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Questions set Approved=${approved} where QuestionId = '${questionId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Question ID ${questionId} Approved set to ${approved}`;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} total
 * @returns a result object with status/message
 */
exports.getQuestions = async function (total) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Questions where Approved=true ORDER BY RAND() LIMIT ${total};`;
        const userResult = await con.query(sql);
        let questions = userResult[0]
        let jsonData = questions
        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Questions`;
        return jsonData;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {number} total
 * @returns a result object with status/message
 */
exports.getAllUnapprovedQuestions = async function () {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Questions where Approved=false`;
        const userResult = await con.query(sql);
        let questions = userResult[0]
        let jsonData = questions
        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = `Questions`;
        return jsonData;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}