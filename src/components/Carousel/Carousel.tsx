import { ReactNode } from 'react';
import { Carousel as AntCarousel } from 'antd';
import s from './Carousel.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface CarouselProps {
  dots?: boolean;
  arrows?: boolean;
  slidesToShow: number;
  slidesToScroll?: number;
  children: ReactNode;
}

export const Carousel = ({
  dots = true,
  arrows = true,
  slidesToShow,
  slidesToScroll = 1,
  children
}: CarouselProps) => {
  return (
    <div className={s.Carousel}>
      <AntCarousel
        dots={dots}
        arrows={arrows}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        prevArrow={<LeftOutlined style={{ fontSize: '24px'}} />}
        nextArrow={<RightOutlined style={{ fontSize: '24px'}} />}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 4 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } },
        ]}
      >
        {children}
      </AntCarousel>
    </div>
  )
}