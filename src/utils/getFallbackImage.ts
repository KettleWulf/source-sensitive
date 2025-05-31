export const getFallbackImage = (name: string, category: string) => {
  const fileName = encodeURIComponent(name) + ".png";
  return `/images/${category + "Images"}/${fileName}`;
};


