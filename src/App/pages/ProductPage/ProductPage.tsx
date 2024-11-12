import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RelatedProducts from './components/RelatedProducts';
import GoBack from './components/GoBack';
import { Header } from 'components';
import ProductCard from './components/ProductCard';
import { ProductApi } from 'api/types';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useSafeParams } from 'hooks/useSafeParams';
import { observer } from 'mobx-react-lite';
import productStore from 'stores/ProductStore';

import styles from './ProductPage.module.scss';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const ProductPage: React.FC = observer(() => {
  const params = useSafeParams(paramsSchema, '/');
  const productId = params?.id;

  const [selectedProduct, setSelectedProduct] = useState<ProductApi | null>(
    null,
  );

  const { fetchProduct, isLoadingProduct } = productStore;

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      if (productId !== undefined) {
        const product = await fetchProduct(productId);
        setSelectedProduct(product || null);
      }
    };
    loadProduct();
  }, [productId, fetchProduct]);

  if (isLoadingProduct) return '...loading';

  if (!selectedProduct) return <NotFoundPage />;

  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <Link className={styles.goBackLink} to="/products">
        <GoBack className={styles.goBack} />
      </Link>
      <div className={styles.container}>
        <ProductCard product={selectedProduct} />
        <RelatedProducts
          categoryId={selectedProduct.category.id}
          productID={selectedProduct.id}
        />
      </div>
    </div>
  );
});

export default ProductPage;
