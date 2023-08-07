class User{
    constructor(userId, username, email, firstName, lastName, password, roles, isEnabled){
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
        this.isEnabled = isEnabled;
    }
}

exports.User = User;