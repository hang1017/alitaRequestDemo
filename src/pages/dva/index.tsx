import React, { FC, useEffect } from 'react';
import { DvaModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  dva: DvaModelState;
}

const DvaPage: FC<PageProps> = ({ dva, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'dva/fetch',
    });
  }, []);
  const { herolist = [] } = dva;
  return <div className={styles.center}>Hello {JSON.stringify(herolist)}</div>;
};

export default connect(({ dva }: { dva: DvaModelState }) => ({ dva }))(DvaPage);
