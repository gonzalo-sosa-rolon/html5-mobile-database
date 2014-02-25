html5-mobile-database
=====================

H5MDB is a lib that allow you to more easily implement mobile's CRUD.

 
# Usage

You have an abstract class called DAO that create all your sql queries for you. You just need to implement the functions exec_query (to exec insert, update and delete queries) and exec_select_query to exec select queries.

I provide you a WebSQL implementation (that is working on Android, IOS, Chrome, Safari and Opera), so, you don't have to worry if you want to use your app in these enviroments.

But take a look to the class DAO if you want to understand how the lib is working or if you want to implement the lib with another database (localStore, IndexedDB).

## Creating your model using WebSQL implementation

Let start creating our first example. We are going to create an Employee DAO using the WebSQLDAO.

```javascript
// test/daos.js

EmployeeDAO = WebSQLDAO.extend({
	table : "Employee",
	init : function(db) {
		this._super(db, this.table, {"id" : "INTEGER PRIMARY KEY AUTOINCREMENT", "name" : "VARCHAR(50)", "lastname" : "VARCHAR(50)", "age" : "INTEGER"});
	}
});

```

You just have to extend the WebSQLDAO and call the WebSQLDAO constructor passing the table description. The framework go to create the table with all the fields for you.

The parameters that you have to pass are:

db : The open database.
table : The table name.
fields : All your fields configuration.

In this example we are creating a table called "Employee" with the fields id, name, lastname and age.

To use this DAO just create an instance providing the database:

```javascript

var db = window.openDatabase("Database", "1.0", "Database example", 200000);
dao = new EmployeeDAO(db);

```

# Inserting, updating and deleting rows.

## Inserting data

```javascript
	var data = {"lastname" : lastname, "age" : age, "name" : name};
	dao.insert(data, callback); // implement the callback function to be called after your insert
```

## Updating data

```javascript

	var data = {"lastname" : lastname, "age" : age, "name" : name};
	dao.update(data, callback); // implement the callback function to be called after your update
```

## Deleting data

```javascript
  
	var data = {"id" : 4}; // You need to provide the id of the row that you want to delete.
	dao.delete_row(data, callback); // implement the callback function to be called after your delete
 
```

# Querying data

## Querying all rows

```javascript
  
  
  function callback(result) {
		
	for (var i = 0; i < result.length; i++) {
		// work here with the result set.
      }
  }
  
  dao.list(null, callback);
```

## Using filters

```javascript
  // read about all the filters in js/generic-dao/filters/filters.js 
 
  function callback(result) {
	for (var i = 0; i < result.length; i++) {
		// work here with the result set.
      }
  }
  
  var filter = new Filter();
  
  filter.add_filter(Filters.eq("name", "Gonzalo"));
  filter.add_filter(Filters.like("name", "Gon%"));
  
  dao.list(filter, callback);
  
```
