import React from 'react';
import { Pagination } from 'antd';
import useProductStore from '../../store/productStore';

const PaginationComponent: React.FC = () => {
  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setPageSize 
  } = useProductStore();
  
  // 处理页码变化
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  
  return (
    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalPages * pageSize}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['12', '24', '36']}
        showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
      />
    </div>
  );
};

export default PaginationComponent;