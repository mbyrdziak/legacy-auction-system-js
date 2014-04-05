var Repository = (function() {
    function Repository() {
        this.beginTransaction = function() {
            setTimeout(function() {
                console.log("Starting Transaction");
            }, 200);
        };

        this.persist = function(object) {
            setTimeout(function() {
                console.log("Storing object " + object);
            }, 200);
        };

        this.rollback = function() {
            setTimeout(function() {
                console.log("Rolling back!");
            }, 200);
        };
    }
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new Repository();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();