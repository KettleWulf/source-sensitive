export const getFallbackImage = (name: string, category: string) => {
	const safeName = name.replace(/[/\\:*?"<>|]/g, '-');
	const fileName = encodeURIComponent(safeName) + ".png";
	return `/images/${category + "Images"}/${fileName}`;
};


