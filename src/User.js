/**
 * @param {String} login
 * @constructor
 */
var User = function(login) {
    this.toString = function() {
        return login;
    };
};