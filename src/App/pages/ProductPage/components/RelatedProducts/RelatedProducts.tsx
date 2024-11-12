import React, { useEffect } from 'react';
import { Text } from 'components';
import { CardsContainer } from 'components';
import { observer } from 'mobx-react-lite';
import rootStore from 'stores/instanse';
import styles from './RelatedProducts.module.scss';

type RelatedProductProps = {
  categoryId: number;
  productID: number;
};

const RelatedProducts: React.FC<RelatedProductProps> = observer((props) => {
  const { categoryId, productID } = props;
  const { productsStore } = rootStore;
  const {
    productsByCategory,
    fetchProductsByCategory,
    isLoadingProductsByCategory,
  } = productsStore;

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId, fetchProductsByCategory]);

  if (isLoadingProductsByCategory) return '...loading';

  if (productsByCategory?.length === 0) return null;

  const relatedProducts =
    productsByCategory
      ?.filter((product) => product.id !== productID)
      .slice(0, 3) ?? null;

  return (
    <div>
      <Text className={styles.title} view="title">
        Related Items
      </Text>
      <CardsContainer products={relatedProducts} />
    </div>
  );
});

export default RelatedProducts;
