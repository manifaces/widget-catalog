import { Result } from "antd"
import s from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
  title: string;
  subtitle: string;
}

export const ErrorMessage = ({
  title,
  subtitle
}: ErrorMessageProps) => {
  return (
    <div className={s.ErrorMessage}>
      <Result
        status="error"
        title={title}
        subTitle={subtitle}
      />
    </div>
    
  )
}