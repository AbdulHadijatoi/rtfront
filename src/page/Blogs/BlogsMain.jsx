import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogCard from './Components/BlogCard'
import Page from '../../components/page'
import Overlay from '../../components/Image_Overlay/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogImage } from '../../store/actions/setting'
const BlogsMain = ({nameProp}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const images = useSelector((state) => state?.homeImage?.aboutImage?.payload);
  const about = images?.length > 0 ? images[0]?.image_url : '';


  const [imageAbout, setImageAbout] = useState([]);

  const dispatch =  useDispatch()
      useEffect(() => {
          (async () => {
            try {
              const result = await dispatch(getBlogImage());
              setImageAbout(result?.data?.payload || []);



            } catch (err) {
              console.log(err);
            }
          })();
        }, [dispatch]);


        const termsimage = imageAbout?.length > 0 ? imageAbout[0]?.image : '';


  return (
    <>
      <Page title={nameProp}>
<Overlay title="Our Blogs" imageUrl={termsimage}/>



        <BlogCard />
      </Page>


    </>
  )
}

export default BlogsMain