import React, { useEffect } from 'react';
import { Layout, Row, Col, Radio, Typography } from 'antd';

import Navbar from '../components/common/Navbar';
import FilterComponent from '../components/common/FilterComponent';
import ProductCard from '../components/business/ProductCard';
import PaginationComponent from '../components/common/PaginationComponent';
import useProductStore from '../store/productStore';

const { Content } = Layout;
const { Title } = Typography;
const { Group: RadioGroup } = Radio;

const ProductList: React.FC = () => {
  const { 
    filteredProducts, 
    sortType, 
    setSortType, 
    currentPage, 
    pageSize, 
    applyFilters 
  } = useProductStore();
  
  // 调试信息
  useEffect(() => {
    console.log('ProductList component loaded');
    console.log('filteredProducts:', filteredProducts);
    console.log('sortType:', sortType);
    console.log('currentPage:', currentPage);
    console.log('pageSize:', pageSize);
    
    // 手动触发筛选和排序
    applyFilters();
  }, []);
  
  // 处理排序变化
  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };
  
  // 获取当前页的商品
  const getCurrentPageProducts = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredProducts.slice(start, end);
  };
  
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navbar />
      <Content style={{ padding: '20px 50px' }}>
        <h1>商品列表页面</h1>
        <p>当前页商品数量: {getCurrentPageProducts().length}</p>
        <p>总商品数量: {filteredProducts.length}</p>
        
        <Row gutter={[20, 20]}>
          {/* 左侧筛选区 */}
          <Col xs={24} md={6} lg={5}>
            <FilterComponent />
          </Col>
          
          {/* 右侧商品列表 */}
          <Col xs={24} md={18} lg={19}>
            {/* 排序选项 */}
            <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0, marginRight: 20 }}>排序:</Title>
              <RadioGroup value={sortType} onChange={handleSortChange}>
                <Radio.Button value="price-asc">价格 ↑</Radio.Button>
                <Radio.Button value="price-desc">价格 ↓</Radio.Button>
                <Radio.Button value="sales">销量</Radio.Button>
              </RadioGroup>
            </div>
            
            {/* 商品列表 */}
            <Row gutter={[16, 16]}>
              {getCurrentPageProducts().map(product => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            
            {/* 分页器 */}
            <PaginationComponent />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductList;