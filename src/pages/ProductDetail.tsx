import React, { useState } from 'react';
import { Layout, Row, Col, Carousel, Typography, Button, InputNumber, Card } from 'antd';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SpecSelector from '../components/business/SpecSelector';
import CartDrawer from '../components/business/CartDrawer';
import ProductCard from '../components/business/ProductCard';
import useProductStore from '../store/productStore';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const { addToCart, products } = useProductStore();
  
  // 状态管理
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSpecs, setSelectedSpecs] = useState<{ size: string; color: string }>({ size: '', color: '' });
  const [cartDrawerVisible, setCartDrawerVisible] = useState<boolean>(false);
  
  // 获取当前商品
  const currentProduct = useProductStore.getState().getProductById(productId);
  
  // 获取推荐商品
  const getRecommendedProducts = () => {
    if (!currentProduct) return [];
    // 随机获取6个其他商品作为推荐
    return products
      .filter(p => p.id !== productId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  };
  
  // 处理规格变化
  const handleSpecChange = (specs: { size: string; color: string }) => {
    setSelectedSpecs(specs);
  };
  
  // 处理加入购物车
  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    // 如果未选择规格，使用默认值
    const specs = {
      size: selectedSpecs.size || currentProduct.specs.size[0] || '',
      color: selectedSpecs.color || currentProduct.specs.color[0] || ''
    };
    
    addToCart(currentProduct, quantity, specs);
    setCartDrawerVisible(true);
  };
  
  if (!currentProduct) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2}>商品不存在</Title>
          <Button type="primary" style={{ marginTop: 20 }}>
            返回商品列表
          </Button>
        </Content>
      </Layout>
    );
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ padding: '20px 50px' }}>
        {/* 商品详情 */}
        <Row gutter={[20, 20]}>
          {/* 商品图片 */}
          <Col xs={24} md={12}>
            <Card>
              <Carousel 
                autoplay 
                style={{ height: 400 }} 
                dotPlacement="bottom"
              >
                {currentProduct.images.map((image, index) => (
                  <div key={index}>
                    <img 
                      src={image} 
                      alt={`${currentProduct.name} - ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </Carousel>
              
              {/* 缩略图 */}
              <div style={{ display: 'flex', marginTop: 10, justifyContent: 'center' }}>
                {currentProduct.images.map((image, index) => (
                  <div 
                    key={index} 
                    style={{
                      width: 60,
                      height: 60,
                      margin: '0 5px',
                      border: '1px solid #ddd',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${currentProduct.name} - ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          
          {/* 商品信息和规格选择 */}
          <Col xs={24} md={12}>
            <Card>
              <Title level={3}>{currentProduct.name}</Title>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ff4d4f', margin: '20px 0' }}>
                ￥{currentProduct.price.toFixed(2)}
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <Paragraph>销量：{currentProduct.sales}</Paragraph>
                <Paragraph>库存：{currentProduct.stock}</Paragraph>
              </div>
              
              {/* 规格选择 */}
              <SpecSelector 
                specs={currentProduct.specs} 
                onSpecChange={handleSpecChange} 
              />
              
              {/* 数量选择和加入购物车 */}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                <div style={{ marginRight: 20 }}>
                  <span style={{ marginRight: 10 }}>数量:</span>
                  <InputNumber
                    min={1}
                    max={currentProduct.stock}
                    value={quantity}
                    onChange={(value) => setQuantity(value || 1)}
                    style={{ width: 80 }}
                  />
                </div>
                
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleAddToCart}
                  disabled={currentProduct.stock === 0}
                  style={{ marginRight: 10 }}
                >
                  {currentProduct.stock === 0 ? '已售罄' : '加入购物车'}
                </Button>
                
                <Button 
                  size="large"
                  disabled={currentProduct.stock === 0}
                >
                  立即购买
                </Button>
              </div>
              
              {/* 商品描述 */}
              <div style={{ marginTop: 40 }}>
                <Title level={4}>商品描述</Title>
                <Paragraph>{currentProduct.description}</Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
        
        {/* 推荐商品 */}
        <div style={{ marginTop: 40 }}>
          <Title level={3}>推荐商品</Title>
          <Row gutter={[16, 16]}>
            {getRecommendedProducts().map(product => (
              <Col xs={24} sm={12} md={8} lg={4} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      
      {/* 购物车弹窗 */}
      <CartDrawer 
        visible={cartDrawerVisible} 
        onClose={() => setCartDrawerVisible(false)} 
      />
    </Layout>
  );
};

export default ProductDetail;