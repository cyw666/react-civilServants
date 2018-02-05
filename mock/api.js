import Mock from 'mockjs';

export const getTags = Mock.mock({
  'list|10': [
    {
      'id|+1': 1,
      name: '@cname',
      'value|1-100': 50,
      'type|0-2': 1,
      email: '@email',
      isFinish: '@boolean',
      date: '@date(yyyy-MM-dd)',
      time: '@time(HH:mm:ss)',
      imgUrl:'@image',
      color: '@color',
      description: '@cparagraph',
      linkUrl: '@url(http,demourl.com)',
      city: '@city',
      idCard:'@id'
    }
  ],
})
