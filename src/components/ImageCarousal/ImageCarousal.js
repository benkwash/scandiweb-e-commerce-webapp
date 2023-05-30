import { useState } from 'react';
import './ImageCarousal.css';

import arrowLeft from '../../assets/icons/c-left.svg';
import arrowRight from '../../assets/icons/c-right.svg';

function ImageCarousal({ isCartTab = false, gallery }) {
   const [selectedImg, setSelectedImg] = useState(0);

   const moveImg = (isLeft) => {
      let imgIndex;
      if (isLeft) {
         imgIndex = selectedImg === 0 ? gallery.length - 1 : selectedImg - 1;
      } else {
         imgIndex = selectedImg < gallery.length - 1 ? selectedImg + 1 : 0;
      }

      setSelectedImg(imgIndex);
   };

   return (
      <div className="carousal-img-container">
         <img
            className="carousal-img  element-transition show"
            src={gallery[selectedImg]}
            alt="current-carousal"
         />
         <div className="img-overlay"></div>
         {!isCartTab && gallery.length > 1 && (
            <div className="arrow-group">
               <img
                  className="arrow-left-icon cursor-pointer hover-effect"
                  src={arrowLeft}
                  alt="arrow left icon"
                  onClick={() => moveImg(true)}
               />
               <img
                  className="arrow-right-icon  cursor-pointer hover-effect"
                  src={arrowRight}
                  alt="arrow right icon"
                  onClick={() => moveImg(false)}
               />
            </div>
         )}
      </div>
   );
}

export default ImageCarousal;
