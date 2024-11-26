import React from 'react';
import { getProductsByCategory } from 'api';
import { Text } from 'components';
import { CardsContainer } from 'components';
import { ProductApi } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import styles from './RelatedProducts.module.scss';

type RelatedProductProps = {
  categoryId: number;
  productID: number;
};

const RelatedProducts: React.FC<RelatedProductProps> = (props) => {
  const { categoryId, productID } = props;

  const { data } = useQuery<ProductApi[] | null>({
    queryKey: ['productsByCategory', { id: categoryId }],
    queryFn: () => getProductsByCategory({ id: categoryId }),
  });

  const relatedProducts = data?.filter((product) => product.id !== productID).slice(0, 3) ?? null;

  return relatedProducts?.length === 0 ? (
    <></>
  ) : (
    <div>
      <Text className={styles.title} view="title">
        Related Items
      </Text>
      <CardsContainer products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
