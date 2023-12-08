import {useNavigate, useParams} from 'react-router';
import {Category, RouterPaths} from '@/core/types';
import { useContext } from 'react';
import { PriceContext } from '@/core/context';
import { formatDescription } from '@/core/components/Details/helpers.ts';
import DOMPurify from 'dompurify';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const priceList: Category[] = useContext(PriceContext);

  const spice = priceList
  .map(({ spices }) => spices).flat()
  .find((spice) => spice.id.toString() === id);

  if (!spice) {
    navigate(RouterPaths.ROOT);
    return;
  }

  const description = formatDescription(spice.description);

  return (
    <section className="card">
      <div className="container">
        <div className="card-top">
          <div className="card-img">
            <img src={ `/images/products/${ spice.imagePath }` } alt="product"/>
          </div>
          <div className="card-sidebar">
            <div className="title">{ spice.name }</div>
            <div className="price">
              <span>Ціна:</span> <b>{ spice.price }<small>₴</small></b>
            </div>
            { spice.weight && <div className="weight">
              <span>Кількість грам в упаковці</span> <b>{ spice.weight }</b>
            </div> }
          </div>
        </div>
        { description && <div className="card-bottom">
            <div className="card-info">
                <h2 className="tab">Опис</h2>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}></p>
            </div>
        </div> }
      </div>
    </section>
  );
};

export default Details;