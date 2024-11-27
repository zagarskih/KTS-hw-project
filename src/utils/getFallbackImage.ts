import fallbackImages from 'assets/images/fallbackImgs';

type CategoryName = 'clothes' | 'shoes' | 'electronics' | 'miscellaneous';

const getFixedFallbackImage = (category: string | undefined, productId: number | undefined) => {
  const categoryName = (category?.toLowerCase() as CategoryName) || 'miscellaneous';
  const images = fallbackImages[categoryName] || fallbackImages['miscellaneous'];

  if (!productId) return images[0];

  const hash = [...productId.toString()].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % images.length;

  return images[index];
};

export default getFixedFallbackImage;
