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

    if (startTime.getTime() < context.getNow()) {
        throw "StartTime must be from future";
    }

    if (endTime.getTime() < context.getNow()) {
        throw "EndTime is not from future!!!";
    }

    if (endTime.getTime() < startTime.getTime()) {
        throw "request.StartTime must be before request.EndTime";
    }

    this.activate = function() {

        if (status != AuctionStatus.NEW) {
            throw "Current status is not NEW";
        }

        if (startTime > context.getNow()) {
            throw "Given time must be from past";
        }

        status = AuctionStatus.ACTIVE;
        activateDate = context.getNow();
    };

    this.buyNow = function() {
        if (type != AuctionType.BUY_NOW || status != AuctionStatus.ACTIVE) {
            throw "Wrong type or status"
        } else if (owner != context.getUser()) {
            throw "Not an owner";
        }

        bids.push(new Bid(this, buyNowPrice, context.getUser(), context.getNow()));
        this.finish();
    };

    this.finish = function() {
        if (status != AuctionStatus.ACTIVE) {
            throw "Auction has to be Active";
        }

        if (type == AuctionType.BID && endTime.getTime() < context.getNow().getTime()) {
            throw "Auction has to be after its finish time";
        }

        status = AuctionStatus.FINISHED;
    };

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