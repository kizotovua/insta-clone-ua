import React from 'react';
import {gridGap} from "../styles";
import PropTypes from 'prop-types';

const NullItem = ({width, popupOpen}) => {

  return (
    <div
        onClick={popupOpen}
        style={{
        width: `calc(${width}px - ${gridGap}px)`,
        height:`calc(${width}px - ${gridGap}px)`,
        backgroundImage: `url(https://res.cloudinary.com/dlfw5rtkr/image/upload/v1605984978/insta_images/service/no-image_yraby4.jpg)`,
        border: "1px solid lightgrey",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: "pointer"
      }}>
    </div>
  );
};

export default NullItem;

NullItem.propTypes = {
  width: PropTypes.number.isRequired,
  popupOpen: PropTypes.bool
}

NullItem.defaultProps = {
  popupOpen: false
}