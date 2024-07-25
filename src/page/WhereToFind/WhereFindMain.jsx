import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import MainComponent from './Components/MainComponent'
import Page from '../../components/page'
import Overlay from '../.../../../../src/components/Image_Overlay/Overlay'
import { useSelector } from 'react-redux'
const WhereFindMain = ({nameProp}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const images = useSelector((state) => state?.homeImage?.findUs?.payload);
  const about = images?.length > 0 ? images[0]?.header_image : '';

  return (
    <>

      <Page title={nameProp}>
        <Overlay title="Where To Find Us" imageUrl={about} />
        <MainComponent />
      </Page>
    </>
  )
}

export default WhereFindMain