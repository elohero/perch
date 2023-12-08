import { useLocation, useNavigate } from 'react-router';
import { Category, RouterPaths } from '@/core/types';
import React, { useContext } from 'react';
import { PriceContext } from '@/core/context';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;
  const priceList: Category[] = useContext(PriceContext);

  return (
    <section className="home-products">
      <div className="container">
        <div className="products-wrapper">
          { priceList.map((category) => (!hash || hash === `#${category.id}`) && <React.Fragment key={ category.id }>
            <h3 className="all-products">{ category.name }</h3>
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
                  <b>{ spice.price }<small>₴</small></b> {spice.weight && <span>Вага { spice.weight }</span>}
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