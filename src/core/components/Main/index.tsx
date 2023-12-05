import { useLocation, useNavigate } from 'react-router';
import { Category, RouterPaths } from '@/core/types';
import React, { RefObject, useContext, useEffect, useMemo } from 'react';
import { PriceContext } from '@/core/context';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priceList: Category[] = useContext(PriceContext);

  const refs = useMemo(() => {
    return priceList.reduce((category: { [key: string]: RefObject<HTMLHeadingElement> }, value) => {
      category[value.id] = React.createRef();
      return category;
    }, {});
  }, [priceList]);

  useEffect(() => {
    if (location.hash) {
      refs[location.hash.slice(1)]?.current?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    }
  }, [refs, location]);

  return (
    <section className="home-products">
      <div className="container">
        <div className="products-wrapper">
          { priceList.map((category) => <React.Fragment key={ category.id }>
            <h3 className="all-products" ref={ refs[category.id] }>{ category.name }</h3>
            { category.spices.map((spice) => <React.Fragment key={ spice.id }>
              <div className="product" onClick={ () => navigate(`${ RouterPaths.DETAILS }/${ spice.id }`) }>
                <div>
                  <div className="img">
                    <img src={ `/images/products/${ spice.imagePath }` } alt="product" loading="lazy"/>
                  </div>
                  <span className="title">
                    { spice.name }
                  </span>
                </div>
                <div className="price">
                  <b>{ spice.price }<small>₴</small></b> <span>Вага { spice.weight }</span>
                </div>
              </div>
            </React.Fragment>) }
          </React.Fragment>) }
        </div>
      </div>
    </section>
  );
};

export default Main;