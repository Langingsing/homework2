import React from 'react';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import type { Product as ProductType } from '../../store/productStore';

const { Meta } = Card;

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        cover={<img alt={product.name} src={product.images[0]} style={{ height: 200, objectFit: 'cover' }} />}
        style={{ marginBottom: 20 }}
      >
        <Meta
          title={product.name}
          description={
            <div>
              <div style={{ fontSize: 16, fontWeight: 'bold', color: '#ff4d4f', marginBottom: 5 }}>
                ￥{product.price.toFixed(2)}
              </div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 5 }}>
                销量 {product.sales}
              </div>
              {product.tags.map(tag => (
                <Tag 
                  key={`${product.id}-${tag}`} 
                  color={tag === '新品' ? 'green' : tag === '热销' ? 'red' : 'blue'}
                  style={{ marginRight: 5 }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;