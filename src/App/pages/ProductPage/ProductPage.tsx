import { z } from 'zod';
import React, { useEffect } from 'react';
import RelatedProducts from './components/RelatedProducts';
import { GoBack, Layout } from 'components';
import ProductCard from './components/ProductCard';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useSafeParams } from 'hooks/useSafeParams';
import { observer } from 'mobx-react-lite';
import ProductStore from 'stores/ProductStore';
import { useLocalStore } from 'hooks/useLocalStore';
import { Loading } from 'components';
import RoutesConfig from 'routes';
import useIsMobile from 'hooks/useIsMobile';
import classNames from 'classnames';

import styles from './ProductPage.module.scss';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const ProductPage: React.FC = () => {
  const params = useSafeParams(paramsSchema, RoutesConfig.home);
  const productId = params?.id;

  const productStore = useLocalStore(() => new ProductStore());
  const { product, fetchProduct } = productStore;

  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (productId !== undefined) {
      fetchProduct(productId);
    }

    return () => {
      productStore.destroy();
    };
  }, [productId, productStore]);

  if (product === null) return <NotFoundPage />;

  const goBack = () => {
    window.history.back();
  };

  return (
    <Layout className={styles.root} isMobile={isMobile}>
      {product ? (
        <>
          <GoBack onClick={goBack} className={classNames(styles.goBackButton, 'goBack')} children="Go back" />
          <div className={styles.card}>
            <ProductCard product={product} />
          </div>
          <div className={styles.related}>
            <RelatedProducts categoryId={product.category.id} productID={product.id} />
          </div>
        </>
      ) : (
        <div className="loaderCenter">
          <Loading />
        </div>
      )}
    </Layout>
  );
};

export default observer(ProductPage);
