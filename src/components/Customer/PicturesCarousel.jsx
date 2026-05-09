import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../LoadingScreens/Loading.jsx'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage.jsx';
import urls from "../../util/apiPaths.json";

const PicturesCarousel = ({recordType, id}) => {

  const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Grab items from the slices
    const selectedCustomer = useSelector(state => state.scust.customer);

    const openPicture = async (url) => {
       window.open(url, "_blank", "noopener,noreferrer");
      // toast.info(`This would open up the image at ${url}`)
    }


  return (
<>

            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&

                <>
                    <hr></hr>
                    <h5 className="text-center baskerville-font mb-3">Pictures</h5>

                  {selectedCustomer.pictures && selectedCustomer.pictures.length < 1 && <p className="text-center">No Pictures recorded for this customer.</p>}

                  {selectedCustomer.pictures && selectedCustomer.pictures.length >= 1 &&
                  <>

                    <Carousel interval={null}  data-bs-theme="dark">
                            {selectedCustomer.pictures.map(picture => (
                              <Carousel.Item key={picture.id}>
                                <div onClick={() => openPicture(`${urls.uploadsAPI}/pictures/${selectedCustomer.customer_name}/${picture.picture_file}`)}>
                                    <CarouselImage url={`${urls.uploadsAPI}/pictures/${selectedCustomer.customer_name}/${picture.picture_file}`}/>
                                    <Carousel.Caption>
                                      <h3>{picture.title}</h3>
                                      <p>{picture.notes}</p>
                                    </Carousel.Caption>
                                </div>
                              </Carousel.Item>
                            ))}
                    </Carousel>

                  </>
                  }

                </>
            }

        </>
  )
}

export default PicturesCarousel





