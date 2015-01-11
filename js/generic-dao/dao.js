DAO = Class.extend({
	init : function(table, fields) {
		this.table = table;
		this.fields = fields;
		this.exec_query(this._prepare_create_table_query(), function() {});
	},		
	insert : function (data, callback) {
		this.before_insert(data);		
		this.exec_query(this._prepare_insert_query(data), callback);		
		this.after_insert(data);
	},
	update : function (data, callback) {
		this.before_update(data);
		this.exec_query(this._prepare_update_query(data), callback);
		this.after_update(data);
	},	
	list : function(filter, callback) {
		var query = this._prepare_select(filter);
		return this.exec_select_query(query, callback);
	},
	delete_row : function(data, callback) {
		this.before_delete(data);
		this.exec_query(this._prepare_delete_query(data), callback);
		this.after_delete(data);
	},
	delete_all : function(callback) {
		this.exec_query(this._prepare_delete_all(), callback);
	},
	_prepare_delete_all : function() {
		var query = "DELETE FROM " + this.table;
		return query;
	},
	_prepare_delete_query : function(data) {
		var query = "DELETE FROM " + this.table + " WHERE " + this.get_id() + " = " + data[this.get_id()];
		return query;
	},
	_prepare_select_max_id_query : function() {
		var query = "SELECT max(" + this.get_id() + ") FROM " + this.table;
		return query;
	},
	_prepare_create_table_query : function() {
		var query =
            "CREATE TABLE IF NOT EXISTS " + this.table + " (\n";
		
			for (var field in this.fields) {
				query += field + " " + this.fields[field] + ",\n";
			}
			
			query = query.substring(0, query.length - 2);
			query += ")";
			
			return query;
	},
	_prepare_insert_query : function(data) {
		var query = "INSERT INTO " + this.table + " (";
		var query_data = " VALUES (";
		
		for (var field in this.fields) {			
			query += field;		
			query_data += sql_sintax_util.get_sql_value(data[field]);
			
			query += ", ";
			query_data += ", ";			
		}
		
		query = query.substring(0, query.length - 2);
		query_data = query_data.substring(0, query_data.length - 2);
		
		return query + ") " + query_data + ")";
	},
	_prepare_update_query : function(data) {
		var result = "UPDATE " + this.table + " SET ";
		
		for (var field in data) {				
			result += field + " = "+ sql_sintax_util.get_sql_value(data[field]) + ", ";
		}
		
		result = result.substring(0, result.length - 2);			
		result += " WHERE " + this.get_id() + " = " + data[this.get_id()];
		
		return result;
	},
	_prepare_select : function (filter) {
		var result = "SELECT * FROM " + this.table;
		
		if (filter) {
			result += " WHERE " + filter.create();
		}
		
		return result;
	},
	success : function() {	    
    },
    error : function(tx, err) {
    	
    },
    before_insert : function(data) {}, 
    after_insert : function(data) {},
    before_delete : function(data) {},
    after_delete : function(data) {},
    before_update: function(data) {},
    after_update : function(data) {},
    get_id : function() {
    	return "id";
    },
    exec_query : function(query, callback) {
    	alert("Exec query no implemented");    	
    },
    exec_select_query : function(query, callback) {
    	alert("Exec select query no implemented");    	
    },
});

