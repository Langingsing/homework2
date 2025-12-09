import React from 'react';
import { Layout, Card, List, Button, Typography, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Navbar from '../components/common/Navbar';
import useProductStore from '../store/productStore';

const { Content } = Layout;
const { Title } = Typography;

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  
  // 计算购物车总价
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ padding: '20px 50px' }}>
        <Title level={2}>购物车</Title>
        
        {cart.length === 0 ? (
          <Empty
            description="购物车是空的"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary">去购物</Button>
          </Empty>
        ) : (
          <div>
            <List
              dataSource={cart}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.product.id)}
                    />
                  ]}
                >
                  <Card
                    hoverable
                    cover={<img alt={item.product.name} src={item.product.images[0]} style={{ height: 120, objectFit: 'cover' }} />}
                    style={{ width: '100%' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.product.name}</div>
                        <div style={{ fontSize: 12, color: '#888', marginBottom: 5 }}>
                          规格：{item.selectedSpecs.size} / {item.selectedSpecs.color}
                        </div>
                        <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                          ￥{item.product.price.toFixed(2)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          type="text"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span style={{ margin: '0 10px', minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <Button
                          type="text"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <Card style={{ width: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span>商品总价：</span>
                  <span style={{ fontSize: 18, fontWeight: 'bold', color: '#ff4d4f' }}>
                    ￥{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span>配送费：</span>
                  <span>￥0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 16, fontWeight: 'bold' }}>总计：</span>
                  <span style={{ fontSize: 20, fontWeight: 'bold', color: '#ff4d4f' }}>
                    ￥{totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button type="primary" size="large" block>
                  去结算
                </Button>
              </Card>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default CartPage;