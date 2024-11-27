import React, { useEffect, useMemo } from 'react';
import { Text } from 'components';
import { CardsContainer } from 'components';
import { observer } from 'mobx-react-lite';
import rootStore from 'stores/instance';
import styles from './RelatedProducts.module.scss';

type RelatedProductProps = {
  categoryId: number;
  productID: number;
};

const RelatedProducts: React.FC<RelatedProductProps> = observer((props) => {
  const { categoryId, productID } = props;
  const { productsStore } = rootStore;
  const { productsByCategory, fetchProductsByCategory, isLoadingProductsByCategory } = productsStore;

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId, fetchProductsByCategory]);

  const relatedProducts = useMemo(() => {
    return productsByCategory?.filter((product) => product.id !== productID).slice(0, 3) ?? null;
  }, [productsByCategory, productID]);

  if (isLoadingProductsByCategory) return '...loading';
  if (productsByCategory?.length === 0) return null;
  if (!relatedProducts?.length) return null;

  return (
    <div>
      <Text className={styles.title} view="title">
        Related Items
      </Text>
      <CardsContainer products={relatedProducts} />
    </div>
  );
});

export default React.memo(RelatedProducts);
