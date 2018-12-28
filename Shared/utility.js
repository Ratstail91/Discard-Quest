//initialize the exports
exports = module.exports = {};

//GenerateDialogFunction
//dialogJson - the json object containing the bot's dialog
//key - Json key
//data (optional) - a number of arguments that are substituted into the resulting string
exports.generateDialogFunction = function(dialogJson) {
	return function(key, ...data) {
		let result;

		if (Array.isArray(dialogJson[key])) {
			result = dialogJson[key][Math.floor(Math.random() * dialogJson[key].length)];
		} else {
			result = dialogJson[key];
		}

		//handle no result
		if (typeof(result) === "undefined") {
			const noResult = dialogJson["noResult"];
			if (typeof(noResult) === "undefined") {
				return ""; //nothing at all to show
			}
			if (Array.isArray(noResult)) {
				result = noResult[Math.floor(Math.random() * noResult.length)];
			} else {
				result = noResult;
	 		 }
		}

		let counter = 0;
		data.map((dat) => {
			counter++;
			result = result.replace(/\{([1-9][0-9]*)\}/g, a => a === "{" + counter + "}" ? dat : a);
		});

		return result;
	}
}

//isAdmin
//member - discord.js member
exports.isAdmin = function(member) {
	return member.roles.find(role => role.name === process.env.ADMIN_ROLE || role.name === process.env.MOD_ROLE);
}
