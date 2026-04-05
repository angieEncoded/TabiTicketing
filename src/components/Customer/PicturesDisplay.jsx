import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Loading from '../LoadingScreens/Loading.jsx'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage.jsx'

const PicturesDisplay = ({recordType, id}) => {

  const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [pictureData, setPictureData] = useState(false);

    // Grab items from the slices
    const urls = useSelector(state => state.urls.urls);



    // Initially populate the data
    useEffect(() => {
        const getTableData = async () => {
            try {
                setHasError(false);
                setErrorMessage("");
                setIsPending(true);
                const pictureData = await fetch(`${urls.getPictureData}/${id}`);
                if (!pictureData.ok) throw new Error("Failed to fetch data. Please check the server.");
                const pictureDataJson = await pictureData.json();
                setPictureData(pictureDataJson);
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
                setHasError(true);
                setErrorMessage(error.message);
                toast.error(error.message);
            }
        }
        getTableData();
    }, []);


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

                  {pictureData.length < 1 && <p className="text-center">No Pictures recorded for this customer.</p>}

                  {pictureData && pictureData.length >= 1 &&
                  <>

                    <Carousel interval={null}  data-bs-theme="dark">
                            {pictureData.map(picture => (
                              <Carousel.Item key={picture.id}>
                                <div onClick={() => openPicture(picture.url)}>
                                    <CarouselImage url={picture.url}/>
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

export default PicturesDisplay





