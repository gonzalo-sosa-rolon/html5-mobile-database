sql_sintax_util = {
		get_sql_value : function(value) {
			var result = "null";
			var type = this._get_type(value);
			
			if (type === "number") {
				result = value;
			} else if (type === "string") {
				result = "'" + value + "'";
			}
			
			return result;
		},
		_get_type : function(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
		}
}