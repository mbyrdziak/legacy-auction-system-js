/**
 * @param {User} user
 * @constructor
 */
var RequestContext = function(user) {

    /**
     * @type {Date}
     */
    var now = new Date();

    /**
     * @returns {User}
     */
    this.getUser = function() {
        return user;
    };

    /**
     * @returns {Date}
     */
    this.getNow = function() {
        return now;
    };

    /**
     * @param {Date} nowTime
     */
    this.setNow = function(nowTime) {
        now = nowTime;
    };
};