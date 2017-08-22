/**
 * Created by admin on 2017/8/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import errImg from '../../assets/notFound.jpeg'

const Img = ({src,alt}) => {
  let errorLoad = (e) => {
    e.target.src=errImg;
  }
  return (
    <img src={src} alt={alt} onError={errorLoad}/>
  )
}


Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};
export default Img;
