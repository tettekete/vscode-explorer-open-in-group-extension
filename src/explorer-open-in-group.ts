import * as vscode from 'vscode';

export function openInGroup( uri:vscode.Uri, viewColumn:vscode.ViewColumn ): void
{
	if( uri.scheme !== 'file' )
	{
		vscode.window.showErrorMessage( 'Only file URIs are supported.' );
		return;
	}

	vscode.window.showTextDocument( uri, { viewColumn: viewColumn, preview: false } );
}
