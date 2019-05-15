import { Points } from './data/mockData.js';

let _Points = Points;

const MapMockHandler = {
    init(mock) {
      // 获取地图区域点
      mock.onPost('/map/getPoints').reply(config => {
        let points = _Points;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              points: points
            }]);
          }, 1000);
        });
      });
  
    }
};

export default MapMockHandler;