
/**
 * Pads a number with leading zeros to ensure it has a specified length.
 * @param num The number to pad.
 * @param length The desired length of the resulting string.
 * @returns A string representation of the number padded with leading zeros.
 */
export function zeroPaddingNumber( num:number, length:number ):string
{
	return num.toString().padStart( length, '0' );
}

/**
 * Generates a command ID string based on the provided index.
 * @param index The index to include in the command ID.
 * @returns A command ID string formatted as 'explorer-open-in-group.open-in-group-XX'.
 */
export function getCommandIdWithIndex( index:number ):string
{
	const paddedIndex = zeroPaddingNumber( index, 2 );
	return `explorer-open-in-group.open-in-${paddedIndex}`;
}
