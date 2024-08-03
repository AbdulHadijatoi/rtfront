import { Avatar, Box, Button, Card, CardContent, Divider, Grid, LinearProgress, Rating, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ReviewsDetail = ({ data }) => {
  const [value, setValue] = useState(5);
  const [showAll, setShowAll] = useState(false); // State to track if all reviews should be shown
  const base = 'https://rtadmin.rahtourism.com/';

  // Calculate average rating
  const totalReviews = data?.reviews?.length || 0;
  const averageRating = data?.reviews?.reduce((acc, review) => acc + review?.rating, 0) / totalReviews || 0;

  // Ratings distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    return {
      star,
      count: data?.reviews?.filter(review => review?.rating === star).length,
    };
  });

  useEffect(() => {
    setValue(Math.round(averageRating));
  }, [averageRating]);

  // Determine reviews to show
  const reviewsToShow = showAll ? data?.reviews : data?.reviews?.slice(0, 3);

  return (
    <>
      <Box sx={{ padding: '25px 10px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.name} Reviews</Typography>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, md: 0 },
            width: '100%',
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'block' }, alignItems:'center', width: { xs: '100%', md: 'auto' }, textAlign: { xs: 'left', md: 'left' } }}>
            <Typography sx={{ fontSize: { xs: '14px', md: '24px' } }}>
              {averageRating.toFixed(1)}/5.02
            </Typography>
            <Rating name="average-rating" value={averageRating} readOnly />
          </Box>

          <Box sx={{ width: { xs: '100%', md: 'auto' }, textAlign: { xs: 'center', md: 'left', lg: 'left' } }}>
            {ratingDistribution.map(({ star, count }) => (
              <Box
                key={star}
                sx={{
                  gap:'5px',
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'start',
                  marginBottom: '8px',
                  width: '100%',
                }}
              >
                <Typography sx={{ fontSize: { xs: '10px', md: '14px' } }}>
                  {star} stars
                </Typography>
                <Rating size='small' name={`rating-${star}`} value={star} readOnly />
                <Typography sx={{ fontSize: { xs: '8px', md: '14px' }, marginLeft: { xs: 0, sm: '10px' } }}>
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '30%' }, paddingRight: { xs: 0, md: '30px' } }}>
            {ratingDistribution.map(({ star, count }) => (
              <Box key={star} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={(count / totalReviews) * 100}
                  sx={{ flexGrow: 1, marginRight: '10px' }}
                />
                <Typography sx={{ width: { xs: 'auto', md: '100px' } }}>
                  {count}/{totalReviews}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {reviewsToShow?.map((review, index) => (
          <Card key={index} sx={{ margin: '10px 0', padding: '20px' }}>
  <CardContent>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
        <Box sx={{ width: '100px', height: '100px', margin: '0 auto' }}>
          {review.user.profile_image ? (
            <img src={`${base}${review.user.profile_image}`} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <Avatar sx={{ width: '100px', height: '100px' }} />
          )}
        </Box>
      </Grid>

      <Grid item xs={12} sm={7}>
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>{review.user.first_name}</Typography>
        <Typography sx={{ fontSize: '14px', marginTop: '5px' }}>{review.comment}</Typography>
      </Grid>

      <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '14px' }}>{review.rating}.0/5.0</Typography>
        <Rating
          size="small"
          name={`review-rating-${index}`}
          value={review.rating}
          readOnly
        />
        <Typography sx={{ backgroundColor: review.rating === 5 ? 'green' : review.rating >= 4 ? 'green' : review.rating >= 3 ? 'yellow' : review.rating >= 2 ? 'orange' : 'red', fontSize: '14px', padding: '5px', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
          {review.rating === 5 ? 'Excellent' : review.rating >= 4 ? 'Very Good' : review.rating >= 3 ? 'Average' : review.rating >= 2 ? 'Poor' : 'Terrible'}
        </Typography>
      </Grid>
    </Grid>
  </CardContent>
</Card>

        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!showAll ? (
            <Button variant='contained' sx={{ textTransform: 'none', padding: '0.5rem 2rem' }} onClick={() => setShowAll(true)}>Show More</Button>
          ) : (
            <Button variant='contained' sx={{ textTransform: 'none', padding: '0.5rem 2rem' }} onClick={() => setShowAll(false)}>Show Less</Button>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ReviewsDetail;
