// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as base64 from "js-base64";

const hasOneSelection = (selections: readonly vscode.Selection[]) =>
  selections && selections.length === 1 && !selections[0].isEmpty;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "codechic" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand("codechic.start", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor && hasOneSelection(editor.selections)) {
      const text = editor.document.getText(editor.selections[0]).trim();
      const param = encodeURI(base64.encode(JSON.stringify({ text })));

      vscode.env.openExternal(
        vscode.Uri.parse(`https://codechic.vercel.app?l=${param}`)
      );
    }

    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
