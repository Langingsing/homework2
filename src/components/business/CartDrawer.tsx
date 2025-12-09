import React from 'react';
import { Drawer, Button, List, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useProductStore from '../../store/productStore';

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  
  // 计算购物车总价
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  return (
    <Drawer
      title="购物车"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>
            总计：￥{totalPrice.toFixed(2)}
          </div>
          <Button type="primary" size="large">
            去结算
          </Button>
        </div>
      }
    >
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p>购物车是空的</p>
          <Button type="primary" onClick={onClose} style={{ marginTop: 20 }}>
            去购物
          </Button>
        </div>
      ) : (
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
                cover={<img alt={item.product.name} src={item.product.images[0]} style={{ height: 80, objectFit: 'cover' }} />}
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
      )}
    </Drawer>
  );
};

export default CartDrawer;