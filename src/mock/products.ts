import Mock from 'mockjs';

const products = Mock.mock({
  'list|100': [
    {
      'id|+1': 1,
      'name': '@ctitle(5, 10)',
      'price|100-2000.2': 1,
      'category|1': ['男装', '女装', '鞋靴', '配饰'],
      'sales|0-10000': 1,
      'stock|0-100': 1,
      'description': '@cparagraph(2, 4)',
      'images|5': ['@image(200x200, @color, @title)'],
      'tags': function() {
        const allTags = ['新品', '热销', '折扣'];
        const count = Mock.Random.integer(1, 2);
        const shuffled = [...allTags].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      },
      'specs': {
        'size|1-4': ['S', 'M', 'L', 'XL'],
        'color|1-3': ['黑色', '白色', '红色', '蓝色']
      }
    }
  ]
});

export default products.list;