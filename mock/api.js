import mockjs from 'mockjs';

const getTags = mockjs.mock({
  'list|100': [{'id|+1': 1, name: '@name', 'value|1-100': 50, 'type|0-2': 1 }],
})

export {
  getTags,
}