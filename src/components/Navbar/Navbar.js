import { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

import './Navbar.css';

import { setCurrency } from '../../services/redux/currencySlice';
import { resetCart } from '../../services/redux/cartSlice';
import { getCartDetails } from '../../services/helpers/generalHelper';

import aLogo from '../../assets/icons/a-logo.svg';
import emptyCart from '../../assets/icons/empty-cart.svg';
import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

import Cart from '../../pages/Cart';
import { PrimaryButton, SecondaryButton } from '../../components/Button';

function Navbar({
   categories,
   currencies = [],
   currency: selectedCurrency,
   cart = [],
   resetCart,
   setNavIndex,
   selectedNav,
   setCurrency
}) {
   const { totalQuantity, totalCost } = getCartDetails(cart, selectedCurrency);

   const [showCurrencyTab, setShowCurrencyTab] = useState(false);
   const [showCart, setShowCart] = useState(false);

   const currencyDropdownRef = useRef();
   const cartDropdownRef = useRef();

   const selectCurrency = (selectedCurrency) => {
      setCurrency(selectedCurrency);
      setShowCurrencyTab(false);
   };

   const listenToOutsideClick = (stateValue, ref) => {
      const handleOutsideClick = (event) => {
         if (!ref?.current?.contains(event.target)) {
            if (stateValue === 'showCurrencyTab') setShowCurrencyTab(false);
            if (stateValue === 'showCart') setShowCart(false);

            document.removeEventListener('mousedown', handleOutsideClick);
         }
      };
      document.addEventListener('mousedown', handleOutsideClick);
   };

   const navBarLinks = categories.map((category, index) => {
      return (
         <div className="nav-item" key={`${index}-${category}`}>
            <NavLink
               onClick={() => setNavIndex(index)}
               to={`/products/${category}`}
               className={({ isActive }) =>
                  `nav-text ff-raleway ${
                     isActive || (index != null && index === selectedNav)
                        ? 'nav-selected'
                        : ''
                  }`
               }
            >
               {category.toUpperCase()}
            </NavLink>
         </div>
      );
   });
   const arrowDownIco = (
      <img className="arrow-icon" src={arrowDown} alt="arrow down icon" />
   );
   const arrowUpIco = (
      <img className="arrow-icon" src={arrowUp} alt="arrow up icon" />
   );

   const currencyList = (
      <ul>
         {currencies.map(({ symbol, label }, index) => (
            <li
               className="ff-raleway"
               key={`${index}-${label}`}
               onClick={() => selectCurrency(symbol)}
            >
               {`${symbol} ${label}`}
            </li>
         ))}
      </ul>
   );

   const currencyTab = (
      <div ref={currencyDropdownRef} className="currency-group">
         <div
            className="hover-effect currency-btn-group"
            onClick={(e) => {
               setShowCurrencyTab(!showCurrencyTab);
               setShowCart(false);
               listenToOutsideClick('showCurrencyTab', currencyDropdownRef);
            }}
         >
            <h4 className="ff-raleway">{selectedCurrency}</h4>
            <div className="currency-ico">
               {!showCurrencyTab && arrowDownIco}
               {showCurrencyTab && arrowUpIco}
            </div>
         </div>

         <div
            className={clsx({
               'currency-list': true,
               'element-transition': true,
               show: showCurrencyTab
            })}
         >
            {currencyList}
         </div>
      </div>
   );

   const cartTab = (
      <div ref={cartDropdownRef} className="cart-group">
         <div
            className="cart-btn-group  hover-effect"
            onClick={() => {
               setShowCart(!showCart);
               setShowCurrencyTab(false);
               listenToOutsideClick('showCart', cartDropdownRef);
            }}
         >
            <img className="cart-icon" src={emptyCart} alt="cart icon" />

            <div
               className={clsx({
                  'cart-badge': true,
                  'element-transition': true,
                  show: cart.length > 0,
                  'ff-roboto': true
               })}
            >
               {totalQuantity}
            </div>
         </div>

         <div
            className={clsx({
               'cart-tab': true,
               'element-transition': true,
               show: showCart
            })}
         >
            <div className="cart-content">
               {/* cart tab info comes here */}
               {cart.length > 0 && (
                  <div className="cart-detail">
                     <h4 className="title ff-roboto">My Bag, </h4>
                     <h4 className="value ff-raleway">{totalQuantity} items</h4>
                  </div>
               )}
               {cart.length > 0 && <Cart isCartTab={true} />}
               {cart.length === 0 && <p>You have an empty cart.</p>}
            </div>
            <div className="cart-total">
               <h4 className="title ff-roboto">Total</h4>
               <h4 className="value ff-raleway">
                  {selectedCurrency}
                  {totalCost}
               </h4>
            </div>
            <div className="cart-tab-buttons">
               <div className="cart-tab-btn">
                  <Link to={'/cart'}>
                     <SecondaryButton
                        onClick={() => {
                           setShowCurrencyTab(false);
                           setShowCart(!showCart);
                        }}
                     >
                        VIEW BAG
                     </SecondaryButton>
                  </Link>
               </div>

               <div className="cart-tab-btn">
                  <PrimaryButton
                     onClick={() => {
                        //checkout function
                        //send data to api
                        //then
                        resetCart();
                     }}
                  >
                     CHECK OUT
                  </PrimaryButton>
               </div>
            </div>
         </div>
      </div>
   );
   return (
      <>
         <nav>
            <div className="navigation">{navBarLinks}</div>
            <div className="img-container">
               <img className="logo-icon-home" src={aLogo} alt="logo icon" />
            </div>
            <div className="actions-tab">
               {currencyTab}
               {cartTab}
            </div>
         </nav>
         <div
            className={clsx({
               'main-body-overlay': true,
               'element-transition': true,
               show: showCart
            })}
         ></div>
      </>
   );
}
const mapStateToProps = ({ currency, cart }) => ({ currency, cart });
const mapDispatchToProps = { setCurrency, resetCart };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
