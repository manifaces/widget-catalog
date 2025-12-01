import { Carousel } from 'components/Carousel';
import { ProductCard } from 'components/ProductCard';
import { Product } from 'models/product';

export interface GalleryPreviewProps {
  products: Product[];
}

export const GalleryPreview = ({ 
  products 
}: GalleryPreviewProps) => {
  const productSlidesToShow = products.length < 5 ? products.length : 5;
  
  return (
    <section>
      <Carousel slidesToShow={productSlidesToShow}>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </Carousel>
      
    </section>
  )
}