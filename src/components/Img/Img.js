/**
 * 图片处理
 */
import React from 'react'
import PropTypes from 'prop-types'
import errImg from '../../assets/notFound.jpeg'

const Img = ({ src, alt, errSrc }) => {
  let errorLoad = (e) => {
    e.target.src = errSrc || errImg;
  }
  let loaded = () => {
    // console.log('img loaded success!')
  }
  return (
    <img className="comImg" src={ src } alt={ alt } onError={ errorLoad } onLoad={ loaded }/>
  )
}


Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  errSrc: PropTypes.string,
};
export default Img;
