describe("AuctionTest", function() {

    var repo;

    beforeEach(function () {
        repo = Repository.getInstance();
        repo.beginTransaction();
    });

    afterEach(function () {
        repo.rollback();
    });

    it("test1", function () {
        var user = new User("example.user");
        repo.persist(user);

        var context = new RequestContext(user);

        var startTime = new Date();
        startTime.setDate(startTime.getDate() + 1);
        var endTime = new Date();
        endTime.setDate(endTime.getDate() + 7);

        var auction = new Auction(context, "Karma dla kota", startTime, endTime, AuctionType.BUY_NOW, 0, 1000);
        repo.persist(auction);

        expect(auction.getBids().length).toBe(0);
        expect(auction.getName()).toBe("Karma dla kota");
        expect(auction.getStartTime()).toBe(startTime);
        expect(auction.getEndTime()).toBe(endTime);
        expect(auction.getStatus()).toBe(AuctionStatus.NEW);
        expect(auction.getType()).toBe(AuctionType.BUY_NOW);
        expect(auction.getBuyNowPrice()).toBe(1000);
        expect(auction.getOwner()).toBe(user);
    });

    it("test2", function () {
        var user = new User("example.user");
        repo.persist(user);

        var context = new RequestContext(user);

        var startTime = new Date();
        startTime.setDate(startTime.getDate() + 1);
        var endTime = new Date();
        endTime.setDate(endTime.getDate() + 7);

        var auction = new Auction(context, null, startTime, endTime, AuctionType.BID, 1000, 1000);
        repo.persist(auction);

        var now = new Date();
        context.setNow(now);

        auction.activate();

        expect(auction.getActivateDate()).toBeDefined();
        expect(auction.getStatus()).toBe(AuctionStatus.ACTIVE);
    });
});