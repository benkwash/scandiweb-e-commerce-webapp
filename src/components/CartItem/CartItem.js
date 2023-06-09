import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import './CartItem.css';
//components
import Attributes from '../ProductAttributes';
import ImageCarousal from '../ImageCarousal';

//services
import { getAmount } from '../../services/helpers/generalHelper';
import { updateProduct, removeProduct } from '../../services/redux/cartSlice';

//icons
import quantityAdd from '../../assets/icons/cart-plus.svg';
import quantityMinus from '../../assets/icons/cart-minus.svg';

function Cart({
   product,
   cart,
   removeProduct,
   updateProduct,
   currency,
   cartIndex,
   isCartTab
}) {
   const updateProductQuantity = (cartIndex, action) => {
      const product = cloneDeep(cart[cartIndex]);
      product.quantity += action === 'add' ? 1 : -1;
      if (product.quantity < 1) {
         removeProduct({ cartIndex });
      } else {
         updateProduct({ cartIndex, update: product });
      }
   };
   const { quantity, productDetails } = product;
   let amount = getAmount(productDetails.prices, currency);
   amount = Number.parseFloat(amount).toFixed(2);
   return (
      <div className="cart-item-container">
         <div className="left-items">
            <h2 className="item-brand">{productDetails.brand}</h2>
            <h1 className="item-name">{productDetails.name}</h1>
            <h3 className="item-amount">
               {currency}
               {amount}
            </h3>
            {productDetails.attributes.map((attribute, index) => {
               const selectedAttribute = productDetails.selectedAttributes.find(
                  (attr) => attribute.id === attr.id
               )?.selectedAttribute;
               return (
                  <Attributes
                     key={`${selectedAttribute}-${index}`}
                     attributes={attribute}
                     selectedAttribute={selectedAttribute}
                     isCartPage={true}
                  />
               );
            })}
         </div>

         <div className="right-items">
            <div className="cart-quantity-controls">
               <img
                  className="cursor-pointer"
                  onClick={() => updateProductQuantity(cartIndex, 'add')}
                  src={quantityAdd}
                  alt="increase-quantity-ico"
               />
               <h4 className="quantity">{quantity}</h4>
               <img
                  className="cursor-pointer"
                  onClick={() => updateProductQuantity(cartIndex, 'subtract')}
                  src={quantityMinus}
                  alt="reduce-quantity-ico"
               />
            </div>
            <ImageCarousal
               gallery={productDetails.gallery}
               isCartTab={isCartTab}
            />
         </div>
      </div>
   );
}
const mapStateToProps = ({ currency, cart }) => ({ currency, cart });
const mapDispatchToProps = {
   updateProduct,
   removeProduct
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
