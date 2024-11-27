/*
 * @Author: zhangguangzhi guangzhi.zhang@kunlun-inc.com
 * @Date: 2024-11-27 14:50:31
 * @LastEditors: zhangguangzhi guangzhi.zhang@kunlun-inc.com
 * @LastEditTime: 2024-11-27 15:29:31
 * @FilePath: /codechic-vscode-extension/src/extension.ts
 * @Description:
 *
 * Copyright (c) 2024 by zhangguangzhi(guangzhi.zhang@kunlun-inc.com), All Rights Reserved.
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as base64 from 'js-base64'
import axios from 'axios'

const hasOneSelection = (selections: readonly vscode.Selection[]) =>
  selections && selections.length === 1 && !selections[0].isEmpty

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "codechic" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('codechic.start', () => {
    const editor = vscode.window.activeTextEditor
    if (editor && hasOneSelection(editor.selections)) {
      const text = editor.document.getText(editor.selections[0]).trim()

      axios({
        url: `https://codechic.vercel.app/api/cl`,
        method: 'POST',
        data: { text },
      })
        .then((r) => {
          vscode.env.openExternal(vscode.Uri.parse(`https://codechic.vercel.app?l=${r.data.k}`))
        })
        .catch((error) => {
          // 在请求出错时显示提示框
          vscode.window.showErrorMessage(`Request failed: ${error.message}`)
        })
    }

    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
  })

  // eslint-disable-next-line @typescript-eslint/semi
  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
