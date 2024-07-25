import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../../components/page';
import { IoMdInformationCircleOutline } from "react-icons/io";
import Overlay from '../../components/Image_Overlay/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { getGuideline } from '../../store/actions/setting';
const GuidLine = ({nameProp}) => {
    const theme = useTheme()
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const [imageAbout, setImageAbout] = useState([]);

const dispatch =  useDispatch()
    useEffect(() => {
        (async () => {
          try {
            const result = await dispatch(getGuideline());
            setImageAbout(result.data.payload || []);



          } catch (err) {
            console.log(err);
          }
        })();
      }, [dispatch]);


      const guidelineimage = imageAbout?.length > 0 ? imageAbout[0]?.image : '';



    const data1 = [
        {
            title: '1. How to Book',
            descriptions: [
                'To book any of our Tours and Safaris book online, or call us on +971 58 862 7171 or visit any of our Office.',
                'Purchase of any of our products or services is subject to our Conditions of Contract.',
            ]
        },
        {
            title: 'A Vehicles',
            descriptions: [
                'Our vehicle fleet ensures comfort and safety. By law, all passengers must wear seat belts while the vehicle is in motion.',
                'There are special considerations for children travelling in our safari vehicles. For the safety of our younger passengers in the vehicles, special seating is required and must be requested and booked in advance.',
                'Seating is not pre-allocated. During safaris, seating for passengers within one 4-wheel drive vehicle will be rotated. We recommend that all passengers read our safety card which is available with the driver/guide in the vehicle before the start of the excursion.'
            ]
        },
    ];

    const data2 = [
        {
            title: '2. Good To Know',
            descriptions: [
                'Our sightseeing tours are conducted in more than one language and are usually multilingual, however our safari is conducted in English only.',
                'Purchase of any of our products or services is subject to our Conditions of Contract.',
                'Our safaris involve off-road driving through at Lahbab Desert Area - which adds to the excitement of the excursion. However, because of the adventurous nature and the rough terrain, you should not participate if your health or any pre-existing medical conditions (including heart ailments neck or back problems) may be adversely affected.',
                'Additional guidelines for visitors to the UAE can be found on the websites below:'
            ],
            link: [
                'www.visitabudhabi.ae/ae-en/',
                'www.visitdubai.com/en',
                'www.visitrasalkhaimah.com',
                'www.visitsharjah.com',
            ]
        },

        {
            title: '3. Cultural awareness',
            descriptions: [
                'Photographing 	government buildings, military institutions and all oil and gas 	refineries is strictly prohibited',
                ' 	Don’t 	smoke indoors or in public areas',
                ' 	Always 	ask permission before taking pictures of Emiratis.',
                ' 	Avoid 	taking photographs of ladies dressed in traditional attire.',
                'As a mark of respect for local customs, please avoid public displays of 	affection.',
                ' 	The 	UAE has a reasonably relaxed dress code, but it is an Islamic 	country and modest clothing is recommended, particularly in shopping 	malls, souks, rural areas and during visits to mosques or places of 	worship. For ladies, shoulders and knees should be covered. Clothing 	should not be transparent, tight or revealing. Beachwear is 	acceptable at beach clubs, in the hotel, at the pool or on the 	beach. Light summer clothing is suitable for most of the year. 	Sweaters or jackets may be needed during the winter months, 	especially in the evenings and on desert and mountain safaris. Hats, 	sunblock and sunglasses are advised during daylight hours.'
            ],
        },
        {
            title: '4. Dress code for Sheikh Zayed Grand Mosque Visit',
            descriptions: [
                ' 	If 	your tour includes a visit to the Sheikh Zayed Grand Mosque, please 	read the dress code information 	at https://www.szgmc.gov.ae/en/mosque-manner.',
                ' 	No 	transparent (see through) clothing',
                ' 	No 	shorts or skirts',
                ' 	No 	sleeveless shirts',
                ' 	No 	clothing with profanity',
                ' 	No 	tight clothing, swimwear or beachwear'
            ],
        },
        {
            title: '5. Alcohol and entertainment',
            descriptions: [
                ' 		Serving 		of alcohol and performances of live entertainment are not permitted 		for a period of 24 hours starting at sunset on the eve of all 		religious holidays. The legal drinking age in the UAE is 21 years 		of age.',

            ],
        },
        {
            title: '6. Ramadan',
            descriptions: [
                ' 		 		Ramadan 		is the holy month during which the Islamic world commemorates the 		revelation of the Holy Quran and all Muslims are required to fast 		from dawn to dusk. Eating, drinking and smoking in public areas 		during daylight hours is strictly prohibited for all, throughout 		this month. Food is served at some restaurants and cafes, and in 		the hotels.',

            ],
        },
    ];

    const seatData = [
        { seatType: 'Infant Seat', applicableFor: 'Infant Seat (0-12 months and/or under 75cm)', vehicles: 'Exclusive Vehicle' },
        { seatType: 'Baby Seat', applicableFor: 'Baby Seat (1-3 years and/or 65cm – 95cm)', vehicles: 'Exclusive Vehicle' },
    ];


    return (
        <>
            <Page title={nameProp}>
                <Overlay title="Guidelines" imageUrl={guidelineimage} />


                <Box sx={{ padding: '10px 5%' }}>
                    {data1.map((val, ind) => (
                        <Box key={ind}>
                            <Typography sx={{ lineHeight: '1.5rem', fontSize: "20px", fontWeight: 700, color: theme.palette.primary.main, marginTop: '1.5rem' }}>{val.title}</Typography>
                            <ul style={{ padding: '10px' }}>
                                {val.descriptions.map((description, descIndex) => (
                                    <li key={descIndex} style={{ lineHeight: '1.5rem', color: '#506273', fontSize: '14px' }}>
                                        {description}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    ))}

                    <Table fullWidth sx={{ marginTop: '20px' }}>
                        <TableHead sx={{ backgroundColor: '#E3E3E3' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Seat Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Applicable For</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Vehicles</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {seatData.map((row, index) => (
                                <TableRow key={index} sx={{ '&:first-of-type': { backgroundColor: '#fbe0ce' } }}>
                                    <TableCell>{row.seatType}</TableCell>
                                    <TableCell>{row.applicableFor}</TableCell>
                                    <TableCell>{row.vehicles}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {data2.map((val, ind) => (
                        <Box key={ind}>
                            <Typography sx={{ fontSize: "20px", fontWeight: 700, marginTop: '2rem', color: theme.palette.primary.main }}>{val.title}</Typography>
                            <ul style={{ padding: '10px' }}>
                                {val.descriptions.map((description, descIndex) => (
                                    <li key={descIndex} style={{ color: '#506273', lineHeight: '1.5rem', fontSize: '14px' }}>
                                        {description}
                                    </li>
                                ))}
                                {val.link && val.link.map((link, linkIndex) => (
                                    <div key={linkIndex} style={{ marginLeft: '1rem', color: '#506273', fontSize: '16px', alignItems: 'center' }}>

                                        <IoMdInformationCircleOutline style={{ color: theme.palette.primary.main, fontSize: '1rem' }} />

                                        <a href={`http://${link}`} style={{
                                            lineHeight: '1.5rem',
                                            fontSize: '14px', textDecoration: 'none', marginLeft: '0.5rem', color: 'grey'
                                        }} target="_blank" rel="noopener noreferrer">{link}</a>
                                    </div>
                                ))}
                            </ul>
                        </Box>
                    ))}
                </Box>
            </Page>
        </>
    )
}

export default GuidLine;
