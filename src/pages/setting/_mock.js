import city from './geographic/city.json';
import province from './geographic/province.json';

function getProvince(_, res) {
  return res.json(province);
}

function getCity(req, res) {
  return res.json(city[req.params.province]);
} // 代码中会兼容本地 service mock 以及部署站点的静态数据
function updateUser(req,res,u,b) {
  const body = (b && b.body) || req.body;

  return res.json(body)
  //return ""
}
export default {

  // 支持值为 Object 和 Array
  'GET  /api/currentUsera': {
    name: '刘鑫超',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'vxj555@qq.com',
    signature: '生活就像一盒巧克力',
  },
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
  'POST  /api/users':updateUser,
};
