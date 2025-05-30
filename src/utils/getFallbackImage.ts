export const getFallbackImage = (name: string, category: string) => {
  const fileName = encodeURIComponent(name) + ".png";
  return `/${category + "Images"}/${fileName}`;
};


