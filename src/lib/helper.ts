import * as vscode from 'vscode';

/**
 * コンテキストメニュー向けのフラグ `viewColumn_{n}_Opened` を更新します。
 * @param editors 
 */
export function updateContextOfDisplayedViewColumns( editors?: readonly vscode.TextEditor[] )
{
	const displayedGroupSet:Set<number> = new Set<number>();

	vscode.window.tabGroups.all.forEach( ( tab ) =>
		{
			if( tab.viewColumn > 0 )
			{
				displayedGroupSet.add( tab.viewColumn );
			}
		}
	);

	for( let i=1;i<=9;i++ )
	{
		const contextKey = `viewColumn_${i}_Opened`;
		const isOpened = displayedGroupSet.has( i ) ? true : false;

		vscode.commands.executeCommand('setContext', contextKey, isOpened);
	}
}
