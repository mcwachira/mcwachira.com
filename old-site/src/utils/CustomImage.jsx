import Image from 'next/image'

const CustomImage = ({src,alt, priority}) = {
    const prty = priority ? true:false;

    return (
        <div style={{width:100%; height:100%}}>

<Image 
style={{
    margin:0 auto;
}}
src={src} alt={alt} wisth={650} height={650}
priority={prty}/>


        </div>
    )
}