import { z } from 'zod';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from 'api/index';
import { ProductApi } from 'api/types';
import RelatedProducts from './components/RelatedProducts';
import GoBack from './components/GoBack';
import { Header } from 'components';
import ProductCard from './components/ProductCard';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useSafeParams } from 'hooks/useSafeParams';
import { useQuery } from '@tanstack/react-query';

import styles from './ProductPage.module.scss';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const ProductPage: React.FC = () => {
  const params = useSafeParams(paramsSchema, '/');

  const productId = params?.id;

  const { data, isPending } = useQuery<ProductApi | null>({
    queryKey: ['product', { id: productId }],
    queryFn: () => getProduct({ id: productId! }),
    enabled: !!productId,
  });

  if (!productId) return null;

  if (isPending) {
    return '...loading';
  }

  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.root}>
      <Header className={styles.header}/>
      <Link className={styles.goBackLink} to="/products">
        <GoBack className={styles.goBack} />
      </Link>
      <div className={styles.container}>
        <ProductCard product={data} />
        <RelatedProducts categoryId={data.category.id} productID={data.id} />
      </div>
    </div>
  );
};

export default ProductPage;
