import { XmjbxxList, XmsxList, XmmxList } from './data/mockData.js';

let _XmjbxxList = XmjbxxList, _XmsxList = XmsxList, _XmmxList = XmmxList;

const ProjectMockHandler = {
    init(mock) {
      
    // 查询项目基本信息列表
    mock.onPost('/ams/api/xmjbxx/query').reply(config => {
      let {header, prjName} = JSON.parse(config.data);
      let {reqpageSize, reqpageIndex} = header;
      let mockJbxx = _XmjbxxList.filter(user => {
        if (prjName && user.prjName.indexOf(prjName) == -1) return false;
        return true;
      });
      let total = mockJbxx.length;
      mockJbxx = mockJbxx.filter((u, index) => index < reqpageSize * reqpageIndex && index >= reqpageSize * (reqpageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            xmjbxxList: mockJbxx,
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: total,
              rspReturnMsg: "【1130134024585609216】交易成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 1000);
      });
    });

    // 删除项目基本信息
    mock.onPost('/ams/api/xmjbxx/del').reply(config => {
      let { id } = JSON.parse(config.data);
      _XmjbxxList = _XmjbxxList.filter(r => r.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】项目删除成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 500);
      });
    });

    // 查询项目属性信息列表
    mock.onPost('/ams/api/xmsx/query').reply(config => {
      let {header, prjSN} = JSON.parse(config.data);
      let {reqpageSize, reqpageIndex} = header;
      let mockXmsx = _XmsxList.filter(user => {
        if (prjSN && user.prjSN.indexOf(prjSN) == -1) return false;
        return true;
      });
      let total = mockXmsx.length;
      mockXmsx = mockXmsx.filter((u, index) => index < reqpageSize * reqpageIndex && index >= reqpageSize * (reqpageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            xmsxList: mockXmsx,
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: total,
              rspReturnMsg: "【1130134024585609216】交易成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 1000);
      });
    });

    // 删除项目属性信息
    mock.onPost('/ams/api/xmjbxx/del').reply(config => {
      let { id } = JSON.parse(config.data);
      _XmsxList = _XmsxList.filter(r => r.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】项目属性删除成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 500);
      });
    });


    // 查询项目明细信息列表
    mock.onPost('/ams/api/xmmx/query').reply(config => {
      let {header, prjSN} = JSON.parse(config.data);
      let {reqpageSize, reqpageIndex} = header;
      let mockXmmx = _XmmxList.filter(user => {
        if (prjSN && user.prjSN.indexOf(prjSN) == -1) return false;
        return true;
      });
      let total = mockXmmx.length;
      mockXmmx = mockXmmx.filter((u, index) => index < reqpageSize * reqpageIndex && index >= reqpageSize * (reqpageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            xmmxList: mockXmmx,
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: total,
              rspReturnMsg: "【1130134024585609216】交易成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 1000);
      });
    });

    // 删除项目属性信息
    mock.onPost('/ams/api/xmmx/del').reply(config => {
      let { id } = JSON.parse(config.data);
      _XmmxList = _XmmxList.filter(r => r.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】项目明细删除成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 500);
      });
    });

  }
};

export default ProjectMockHandler;