import React from 'react';
import { getProductsByCategory } from 'api/index';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
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

  const relatedProducts = data && data.slice(0, 4).filter((product) => product.id !== productID);

  return (
    <div>
      <Text className={styles.title} view="title">
        Related Items
      </Text>

      <div className={styles.cardsContainer}>
        {relatedProducts &&
          relatedProducts.map((product) => (
            <a href={`/products/${product.id}`} className={styles.link} key={product.id}>
              <Card
                className={styles.card}
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                actionSlot={<Button className={styles.addButton}>Add to Cart</Button>}
              />
            </a>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
