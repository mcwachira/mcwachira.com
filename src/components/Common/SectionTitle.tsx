
const SectionTitle = ({
title,
paragraph,
width='100%', //570px,
center,
mb='100px',
}:{
    title:string;
    paragraph:string;
    width?:string;
    center?:boolean;
    mb?:string;
}) => {

    return (

        <>
        <div className={`wow fadeInUp w-full -mt-2  ${center ? "mx-auto text-center": ""}`}
         style={{ maxWidth: width, marginBottom: mb }}
        >

<h2 className="mb-4 text-xl font-bold !leading-light text-black dark:text-white sm:text-2xl md:text-[35px]">

    {title}
</h2>

<p className="text-4xl   font-bold !leading-relaxed text-body-color md:text-3xl">
          {paragraph}
        </p>
        </div>
        </>
    )
}

export default SectionTitle