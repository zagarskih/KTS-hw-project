import { z } from 'zod';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RelatedProducts from './components/RelatedProducts';
import GoBack from 'components/GoBack';
import { Header } from 'components';
import ProductCard from './components/ProductCard';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useSafeParams } from 'hooks/useSafeParams';
import { observer } from 'mobx-react-lite';
import ProductStore from 'stores/ProductStore';
import { useLocalStore } from 'hooks/useLocalStore';
import RoutesConfig from 'routes';

import styles from './ProductPage.module.scss';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const ProductPage: React.FC = observer(() => {
  const params = useSafeParams(paramsSchema, RoutesConfig.home);
  const productId = params?.id;

  const productStore = useLocalStore(() => new ProductStore());
  const { product, fetchProduct, isLoadingProduct } = productStore;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (productId !== undefined) {
      fetchProduct(productId);
    }
  }, [productId, productStore]);

  if (isLoadingProduct) return '...loading';

  if (!product) return <NotFoundPage />;

  return (
    <div className={styles.root}>
      <Header className="header" />
      <Link className="link" to={RoutesConfig.products.mask}>
        <GoBack className="goBack" children="Go back" />
      </Link>
      <div className={styles.container}>
        <ProductCard product={product} />
        <RelatedProducts categoryId={product.category.id} productID={product.id} />
      </div>
    </div>
  );
});

export default ProductPage;
