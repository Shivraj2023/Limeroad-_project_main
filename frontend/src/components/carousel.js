import { useEffect } from "react";

const Carouselfeed = () => {
  useEffect(() => {
    document.querySelectorAll('.carousel').forEach(carouselElement => {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 4000,
        ride: "carousel",
        pause: false,
        wrap: true
      });
    });
  }, []);

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ width: '63%', marginLeft: '280px', gap: '2px' }}
    >
      {/* Carousel 1 */}
      <div id='carousel1' className='carousel slide' style={{ width: '50%' }}>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737985191609.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1738312997291.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737467216669.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1738313158166.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737372983809.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
        </div>
      </div>

      {/* Carousel 2 */}
      <div id='carousel2' className='carousel slide' style={{ width: '50%' }}>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1738312997291.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737467216669.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1738313158166.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737372983809.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
          <div className='carousel-item'>
            <img src='https://n-img1.junaroad.com/assets/images/mobileNotif/img-1737985191609.jpg?crsl_pos=4' className="d-block w-100" alt='...' height='175px' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carouselfeed;
