import React from 'react';
import { Card, Checkbox, InputNumber, Button, Space } from 'antd';
import useProductStore from '../../store/productStore';

const { Group: CheckboxGroup } = Checkbox;

const FilterComponent: React.FC = () => {
  const { filter, setFilter, resetFilter } = useProductStore();
  
  const categories = ['男装', '女装', '鞋靴', '配饰'];
  
  // 处理分类变化
  const handleCategoryChange = (checkedValues: string[]) => {
    setFilter({ category: checkedValues[0] || '' });
  };
  
  // 处理价格变化
  const handlePriceChange = (type: 'min' | 'max', value: number | null) => {
    if (type === 'min') {
      setFilter({ minPrice: value || 0 });
    } else {
      setFilter({ maxPrice: value || 2000 });
    }
  };
  
  return (
    <Card title="筛选区" style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>分类</h4>
        <CheckboxGroup
          options={categories.map(cat => ({ label: cat, value: cat }))}
          value={filter.category ? [filter.category] : []}
          onChange={handleCategoryChange}
        />
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>价格区间</h4>
        <Space.Compact style={{ width: '100%' }}>
          <InputNumber
            placeholder="最低价"
            min={0}
            max={2000}
            value={filter.minPrice}
            onChange={(value) => handlePriceChange('min', value)}
            style={{ width: '50%' }}
          />
          <InputNumber
            placeholder="最高价"
            min={0}
            max={2000}
            value={filter.maxPrice}
            onChange={(value) => handlePriceChange('max', value)}
            style={{ width: '50%' }}
          />
        </Space.Compact>
      </div>
      
      <Button type="primary" onClick={resetFilter} block>
        重置筛选
      </Button>
    </Card>
  );
};

export default FilterComponent;