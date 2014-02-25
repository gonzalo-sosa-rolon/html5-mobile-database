Filter = Class.extend({
	init : function(property, value) {
		this.property = property;
		this.value = value;
		this.filters = [];
	},
	add_filter : function(filter) {
		this.filters.push(filter);
	},
	create : function() {
		var result = "";
		var index = 0;

		if (this.property && this.value) {
			result += "(" + this.property + " " + this.get_operator()
					+ " " + sql_sintax_util.get_sql_value(this.value);
			index++;
		}

		for ( var i = 0, len = this.filters.length; i < len; i++) {
			var filter = this.filters[i];

			if (index == 0) {
				result += " (" + filter.create();
				index++;
			} else {
				result += " " + this.get_connect_operator() + " "
						+ filter.create();
			}
		}

		if (index != 0) {
			result += ")";
		}

		return result;
	},
	get_operator : function() {
		return "=";
	},
	get_connect_operator : function() {
		return "AND";
	}
});

FilterNotEqual = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return "<>";
	},
});

FilterGreaterThan = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return ">";
	},
});

FilterGreaterOrEqual = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return ">=";
	},
});

FilterLessThan = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return "<";
	},
});

FilterLessOrEqual  = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return "<=";
	},
});


FilterLike = Filter.extend({
	init : function(property, value) {
		this._super(property, value);
	},
	get_operator : function() {
		return "like";
	},
});

Filters = {
	eq : function(property, value) {
		return new Filter(property, value);
	},
	ne : function(property, value) {
		return new FilterNotEqual(property, value);
	},
	gt : function(property, value) {
		return new FilterGreaterThan(property, value);
	},
	lt : function(property, value) {
		return new FilterLessThan(property, value);
	},
	ge : function(property, value) {
		return new FilterGreaterOrEqual(property, value);
	},
	le : function(property, value) {
		return new FilterLessOrEqual(property, value);
	},
	like : function(property, value) {
		return new FilterLike(property, value);
	}
}

