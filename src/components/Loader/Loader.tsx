import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.Loader}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )
}