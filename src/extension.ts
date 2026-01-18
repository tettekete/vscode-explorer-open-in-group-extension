import * as vscode from 'vscode';
import { getCommandIdWithIndex } from './lib/utils';
import { updateContextOfDisplayedViewColumns } from './lib/helper';
import { openInGroup } from './explorer-open-in-group';

export function activate(context: vscode.ExtensionContext)
{
	vscode.commands.executeCommand('setContext', 'tettekete.notShowInCommandPalette', false);

	console.info('Explorer Open In Group extension is now active.');

	for( let i=1;i<=9;i++ )
	{
		const commandId = getCommandIdWithIndex( i );
		const disposable = vscode.commands.registerCommand(
			commandId,
			(uri: vscode.Uri,selectedFiles?:vscode.Uri[]) =>
			{
				const viewColumn = i as vscode.ViewColumn;
				openInGroup( uri, viewColumn );
			});
		context.subscriptions.push( disposable );
	}

	// 表示されているエディターの配列が変更されたときに開き先に出来る viewColumn のフラグを更新する
	const onDidChangeVisibleTextEditors = vscode.window.onDidChangeVisibleTextEditors(( editors )=>
		{
			setTimeout(()=>
				{
					updateContextOfDisplayedViewColumns();
				},
				500
			);

			/*
			setTimeout を使用して遅延実行しているのは、タブグループが閉じられた時や
			Split Up で分割された時に onDidChangeVisibleTextEditors イベントが
			発火した場合、正しい状態を取得できないため。VSCode Version: 1.108.1 (Universal)
			*/
			
		}
	);

	const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(( editor )=>
		{
			updateContextOfDisplayedViewColumns();
		}
	);

	updateContextOfDisplayedViewColumns();

	context.subscriptions.push(
		onDidChangeVisibleTextEditors,
		onDidChangeActiveTextEditor
	);
	
}

export function deactivate() {}
