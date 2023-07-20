import React from 'react'
import Image from 'next/legacy/image';
import styled from 'styled-components'


const ImageContainer = styled.span`
display: flex;
position: relative;
align-items: center;
margin:1rem auto;
/* left: 0px;
 top: 0px; */

`
const MdxImage = ({alt, src, width, height, children }) => {
  return (
    <ImageContainer>
      <Image src={src} alt={alt}  width={width} height={height} placeholder="blur" priority={true} />
      {children}
    </ImageContainer>
  )
}


MdxImage.defaultProps = {
  src:'',
  alt:'',
  width:650,
  height:650,

}
export default MdxImage
