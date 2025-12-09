import React, { useState } from 'react';
import { Radio, Divider } from 'antd';

const { Group: RadioGroup } = Radio;

interface SpecSelectorProps {
  specs: {
    size: string[];
    color: string[];
  };
  onSpecChange: (selectedSpecs: { size: string; color: string }) => void;
}

const SpecSelector: React.FC<SpecSelectorProps> = ({ specs, onSpecChange }) => {
  const [selectedSize, setSelectedSize] = useState<string>(specs.size[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(specs.color[0] || '');
  
  // 处理规格变化
  const handleSpecChange = () => {
    onSpecChange({ size: selectedSize, color: selectedColor });
  };
  
  // 处理尺寸变化
  const handleSizeChange = (e: any) => {
    setSelectedSize(e.target.value);
    handleSpecChange();
  };
  
  // 处理颜色变化
  const handleColorChange = (e: any) => {
    setSelectedColor(e.target.value);
    handleSpecChange();
  };
  
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>尺寸</h4>
        <RadioGroup 
          value={selectedSize} 
          onChange={handleSizeChange}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {specs.size.map(size => (
            <Radio.Button key={size} value={size} style={{ marginRight: 10, marginBottom: 10 }}>
              {size}
            </Radio.Button>
          ))}
        </RadioGroup>
      </div>
      
      <Divider style={{ margin: '10px 0' }} />
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>颜色</h4>
        <RadioGroup 
          value={selectedColor} 
          onChange={handleColorChange}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {specs.color.map(color => (
            <Radio.Button key={color} value={color} style={{ marginRight: 10, marginBottom: 10 }}>
              {color}
            </Radio.Button>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default SpecSelector;