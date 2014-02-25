
EmployeeDAO = WebSQLDAO.extend({
	table : "Employee",
	init : function(db) {
		this._super(db, this.table, {"id" : "INTEGER PRIMARY KEY AUTOINCREMENT", "name" : "VARCHAR(50)", "lastname" : "VARCHAR(50)", "age" : "INTEGER"});
	}
});
