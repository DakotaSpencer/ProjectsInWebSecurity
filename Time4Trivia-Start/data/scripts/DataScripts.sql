-- This is the initial data script for Time 4 Trivia
-- Running this script will insert the intial data for the application
use Time4Trivia;

-- Insert Initial Data
insert into Users  (username, password, email, firstname, lastname) values ('admin', '$2b$10$8Zq3JH4WY6CRwQmitid6V.9oFlM/RKo3ATcXqGWdoXoW14SmAJ7d6', 'admin@test.com', 'admin', 'admin');
insert into Users (username, password, email, firstname, lastname) values ('test', '$2b$10$GlNz68MNngzHKC1Vc4FaDu2zRGnFqXvt3Q69ke1OAnJF9Ml1l/jBm', 'test@test.com', 'test', 'test');
insert into Users (username, password, email, firstname, lastname) values ('phil', '$2b$10$GlNz68MNngzHKC1Vc4FaDu2zRGnFqXvt3Q69ke1OAnJF9Ml1l/jBm', 'phil@gmail.com', 'Phil', 'Philerton');

insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("How many planets are in our solar system?","9","8","Does Pluto count?","76",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("Who invented the donut hole?","Hanson Gregory","Mary Phelps Jacob","Inga Arvad","Louis Reard",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("How long was a Roman mile in todays feet?","4850","5000","4860","5676",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("What animal smells like popcorn?","Binturong's","Wonderpus Octopus","Aardvark","Star Nosed Mole",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("What country has the longest street in the world?","Canada","India","Japan","America",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("What year was the mobile phone invented?","1973","1977","1876","1967",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("Who invented the computer mouse?","Douglas Engelbart","Rene Somner","Ralph Benjamin","Charles Babbage",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("What is the 3rd largest cirt in China?","Tianjin","Beijing","Shanghai","Wuhan",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("How many episodes of One Piece are there?","1053","1196","Are we counting filler?","1216",1);
insert into Questions (Question, CorrectAnswer, IncorrectOne, IncorrectTwo, IncorrectThree, Approved) values ("How many questions are in this quiz?","10","Uh...","15","26",1);

select * from Questions;
select * from Questions where QuestionId = '1';

insert into Roles (Role, RoleDescription) values ('user', 'standard user role');
insert into Roles (Role, RoleDescription) values ('admin', 'site admins');

set @userId = (select UserId from Users where username = 'test');
set @roleId = (select RoleId from Roles where Role = 'user');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

set @userId = (select UserId from Users where username = 'phil');
set @roleId = (select RoleId from Roles where Role = 'user');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

set @userId = (select UserId from Users where username = 'admin');
set @roleId = (select RoleId from Roles where Role = 'admin');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

-- test data
select * from users;
select * from roles;
select * from userroles;

-- select u.userid, u.username, r.role
-- from users u 
-- 	left join userroles ur on u.userid = ur.userid
-- 	left join roles r on r.roleid = ur.roleid;