// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const results = await axios.get("https://blog.webdevsimplified.com/rss.xml");
	
	const articles = parser.parse(results.data).rss.channel.item.map(
		article => {
			return {
				label: article.title,
				detail: article.description,
				link: article.link
			}
		}
	);
	// xmlParser.parse(results.data)
	console.log(articles);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "justblogparserexample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		'justblogparserexample.searchWDSBlogExample', 
		async function () {
			// The code you place here will be executed every time your command is executed

			const article = await vscode.window.showQuickPick(articles, {
				matchOnDetail: true
			})

			if (article == null) {
				return;
			}

			vscode.env.openExternal(article.link);
	});

	context.subscriptions.push(disposable);65

	const notificationFunction = vscode.commands.registerCommand(
		'justblogparserexample.meow',
		function () {
			console.log('notification meow called');
			vscode.window.showInformationMessage('Meow 😺');
	})

	context.subscriptions.push(notificationFunction);
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
