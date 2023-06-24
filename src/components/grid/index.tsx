import { AtGrid } from 'taro-ui';
import './index.scss';

export default function CustomGrid({gridList, ...rest}) {
  return (
    <AtGrid data={gridList} {...rest} />
  );
}