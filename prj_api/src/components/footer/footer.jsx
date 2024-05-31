import React from 'react';
import { Container, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import BusinessStore from '../../stores/businessDetails'
import './footer.css'

const Footer = () => {
  return (
    <footer >
      <div className='div-footer'>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <ul className='ul_in_the_footer'>
                <div className='title_row'>קצת עלינו:</div>
                <li><a href="#">מי אנחנו</a></li>
                <li><a href="#">תנאי השירות</a></li>
                <li><a href="#">מדניות</a></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className='title_row'>תעקבו אחרינו:</div>
              <a href="#"><FacebookIcon className="icon" /></a>
              <a href="#"><InstagramIcon className="icon" /></a>
              <a href="#"><PinterestIcon className="icon" /></a>
              <a href="#"><TwitterIcon className="icon" /></a>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ul className='ul_in_the_footer'>
                <div className='title_row'>צורו קשר:</div>
                <li><a>שאלות נפוצות</a></li>
                <li><a>קריירה</a></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <div>
                  <div className='title_row'>שירות לקוחות</div>
                  <div><PhoneIphoneRoundedIcon />{BusinessStore.businessDetails.phone}</div>
                  <div><LocationOnRoundedIcon />{BusinessStore.businessDetails.address}</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>

        <div className="container_bottom">
          האתר נבנה ע"י ציפי ואביטל © כל הזכויות שמורות
        </div>
      </div>
    </footer>
  );
};

export default Footer;