WebSQLDAO = DAO.extend({
	init : function(db, table, filters) {
		this.db = db;
		this._super(table, filters);		
		this.result = [];
	},
	exec_query : function(query, callback) {
		this.db.transaction(
	            function(tx) {
	            	tx.executeSql(query);
	            	
	            	if(callback) {
	            		callback();
	            	}
	            },
	            function(tx, error) {
	                console.error('Transaction error ' + error);
	            },
	            function(tx) {	            	
	            	console.log('Transaction success ');
	            });
	},
    exec_select_query : function(query, callback) {
    	var webdao = this;
    	
    	this.db.transaction(
                function(tx) {
                	tx.executeSql(query, [], function(tx, results) {
                        var len = results.rows.length,
                        	query_result = [];
                      
                        for (var i = 0; i < len; i++) {
                        	query_result[i] = results.rows.item(i);
                        }                      
                        
                        if(callback) {
    	            		callback(query_result);
    	            	}                        
                    });
                },
                function(tx, error) {
                	console.error('Transaction error ' + error);
                },
                function(tx) {	            	
	            	console.log('Transaction success ');	            	
	            }
            );
    }
});

