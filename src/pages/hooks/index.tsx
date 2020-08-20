import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd-mobile';
import { HooksModelState, ConnectProps, connect, useRequest } from 'alita';
import { queryHeroList, getHeroDetails } from '@/services/api';
import styles from './index.less';

interface PageProps extends ConnectProps {
  hooks: HooksModelState;
}

const HooksPage: FC<PageProps> = ({ dispatch }) => {
  const [heroDetail, setHeroDetail] = useState([]);
  const { run } = useRequest(queryHeroList, {
    manual: true,
    formatResult: (e) => {
      return e;
    },
  });
  const detail = useRequest(
    () =>
      getHeroDetails({
        ename: 110,
      }),
    {
      onSuccess: (e) => {
        setHeroDetail(e);
      },
    },
  );

  console.log(detail);

  const initData = async () => {
    const data = await queryHeroList();
    console.log(data);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={styles.center}>
      <Button onClick={() => run()}>请求数据</Button>
      Hello {JSON.stringify(heroDetail)}
    </div>
  );
};

export default connect(({ hooks }: { hooks: HooksModelState }) => ({ hooks }))(HooksPage);
