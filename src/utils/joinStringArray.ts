
export const joinStringArray = (stringArray: string[]) => {
	if (!stringArray.length) return "None"
	
	if (stringArray.length === 1) return stringArray[0];
	
	if (stringArray.length === 2) return stringArray.join(" and ");

	return stringArray.slice(0, -1).join(", ") + " and " + stringArray.slice(-1);
}