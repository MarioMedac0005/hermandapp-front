export function getMediaByCategory(media, category) {
	return media?.find(item => item.category === category);
}

export function getMediaByCategories(media, category) {
	return media?.filter(item => item.category === category) ?? [];
}
