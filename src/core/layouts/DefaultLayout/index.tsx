import { Outlet, useNavigate } from 'react-router';
import { Category, RouterPaths } from '@/core/types';
import { useContext, useState } from 'react';
import { PriceContext } from '@/core/context';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const priceList: Category[] = useContext(PriceContext);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <div className="wrapper">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" onClick={ () => navigate(`${ RouterPaths.ROOT }`) } id="logoLink">
              <img style={ { height: 50, width: 200 } } src="/images/logo.png" alt="logo"/>
              <span>Додамо перчинки в ваше життя!</span>
            </a>
            <button className="navbar-toggler" type="button" onClick={() => setIsMenuActive(!isMenuActive)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Каталог
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    { priceList.map((category) => (
                      <a key={ category.id }
                         className="dropdown-item"
                         onClick={ () => navigate(`${ RouterPaths.ROOT }#${ category.id }`) }>
                        { category.name }
                      </a>
                    )) }
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                     onClick={ () => navigate(`${ RouterPaths.ABOUT }`) }
                     id="aboutLink">
                    Про нас
                  </a>
                </li>
              </ul>
              <div className="menu-right">
                <div className="menu-contact">
                  <div className="first-number">
                    <a href="tel:+380986745050">
                      <img style={ { height: 20, width: 20 } } src="/images/phone.png" alt="phone"/>
                      <span>+38 (098) 674-50-50</span>
                    </a>
                  </div>
                  <div className="second-number">
                    <a href="tel:+380681970101">
                      <img style={ { height: 20, width: 20 } } src="/images/phone.png" alt="phone"/>
                      <span>+38 (068) 197-01-01</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="mobile-menu" style = {{display: isMenuActive ? 'block' : 'none'}}>
          <nav className="nav" id="nav" onClick={() => setIsMenuActive(false)}>
            <a className="nav__link" onClick={ () => navigate(`${ RouterPaths.ROOT }`) }>Каталог</a>
            { priceList.map((category) => (
                <a key={ category.id }
                   className="nav__link nav__link--small"
                   onClick={ () => navigate(`${ RouterPaths.ROOT }#${ category.id }`) }>
                  { category.name }
                </a>
            )) }
            <a className="nav__link" onClick={ () => navigate(`${ RouterPaths.ABOUT }`) }>Про нас</a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <div className="container">
          <div className="footer-wrapper">
            <div className="footer-left">
              <div className="phones">
                <div className="phone-item">
                  <span>Мобільний телефон</span>
                  <a href="tel:+380986745050">+38 (098) 674-50-50</a>
                  <a href="tel:+380681970101">+38 (068) 197-01-01</a>
                </div>
                <div className="phone-item">
                  <span>Viber</span>
                  <a href="tel:+380681970101">+38 (068) 197-01-01</a>
                </div>
                <div className="phone-item">
                  <span>Telegram</span>
                  <a href="tel:+380681970101">+38 (068) 197-01-01</a>
                </div>
              </div>
              <div className="work-email">
                <a href="mailto:perchynka_@ukr.net">Email: perchynka_@ukr.net</a>
              </div>
            </div>
            <div className="footer-right">
              <div className="work-time">
                Будні дні з 9:00 до 17:00
              </div>
            </div>
          </div>
          <div className="footer_bottom">
            <span>&copy; Перчинка - 2023</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;