/**
 * @param {RequestContext} context
 * @param {string} name
 * @param {Date} startTime
 * @param {Date} endTime
 * @param {AuctionType} type
 * @param {number} startingPrice
 * @param {number} buyNowPrice
 * @constructor
 */
var Auction = function(context, name, startTime, endTime, type, startingPrice, buyNowPrice) {

    /**
     * @type {AuctionStatus}
     */
    var status = AuctionStatus.NEW;

    /**
     * @type {Array.<Bid>}
     */
    var bids = [];

    /**
     * @type {User}
     */
    var owner = context.getUser();

    /**
     * @type {Date}
     */
    var activateDate;

    this.activate = function() {
        status = AuctionStatus.ACTIVE;
        activateDate = context.getNow();
    }

    /**
     * @returns {Array.<Bid>}
     */
    this.getBids = function() {
        return bids;
    };

    /**
     * @returns {string}
     */
    this.getName = function() {
        return name;
    };

    /**
     * @returns {Date}
     */
    this.getStartTime = function() {
        return startTime;
    };

    /**
     * @returns {Date}
     */
    this.getEndTime = function() {
        return endTime;
    };

    /**
     * @returns {AuctionType}
     */
    this.getType = function() {
        return type;
    };

    /**
     * @returns {AuctionStatus}
     */
    this.getStatus = function() {
        return status;
    };

    /**
     * @returns {number}
     */
    this.getBuyNowPrice = function() {
        return buyNowPrice;
    };

    /**
     * @returns {User}
     */
    this.getOwner = function() {
        return owner;
    };

    /**
     * @returns {Date}
     */
    this.getActivateDate = function() {
        return activateDate;
    };

    this.toString = function() {
        return "auction with name: " + name;
    };
};