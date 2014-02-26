html5-mobile-database
=====================

H5MDB is a free lib that allow you to more easily implement mobile's CRUD.
To see it working just clone the repo and open the index.html with Chrome or Safari (or compile it using Cordova and try it in your phone).
 
# Usage

You have an abstract class called DAO that create all your sql queries for you. You just need to implement the functions exec_query (to exec insert, update and delete queries) and exec_select_query to exec select queries.

I provide you a WebSQL implementation (that is working on Android, IOS, Chrome, Safari and Opera), so, you don't have to worry if you want to use your app in these enviroments.

But take a look to the class DAO if you want to understand how the lib is working or if you want to implement the lib with another database (localStore, IndexedDB).

## Creating your model using the WebSQL implementation

Let start creating our first example. We are going to create an Employee DAO using the WebSQLDAO class.

```javascript
// test/daos.js

EmployeeDAO = WebSQLDAO.extend({
	table : "Employee",
	init : function(db) {
		this._super(db, this.table, {"id" : "INTEGER PRIMARY KEY AUTOINCREMENT", "name" : "VARCHAR(50)", "lastname" : "VARCHAR(50)", "age" : "INTEGER"});
	}
});

```

You just have to extend the WebSQLDAO class and call the WebSQLDAO constructor passing the table description. The framework go to create the table with all the fields for you.

WebSQLDAO parameters:

- **DB** The open database.
- **Table**  The table name.
- **Fields**  All your fields configuration.

In this example we are creating a table called "Employee" with the fields id, name, lastname and age. The framework check if the table already exists to avoid sql exceptions.

To use this DAO create an instance providing the database:

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


