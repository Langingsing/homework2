import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useProductStore from '../../store/productStore';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const { cart } = useProductStore();
  
  // 计算购物车商品总数
  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);
  
  // 使用items属性定义菜单项
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">商品列表</Link>,
    },
    {
      key: '2',
      label: <Link to="/cart">购物车</Link>,
    },
  ];
  
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
        电商平台
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ flex: 1, maxWidth: 600, margin: '0 auto' }}
        items={menuItems}
      />
      <div style={{ position: 'relative' }}>
        <Link to="/cart">
          <Badge count={cartTotal} showZero>
            <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </Badge>
        </Link>
      </div>
    </Header>
  );
};

export default Navbar;