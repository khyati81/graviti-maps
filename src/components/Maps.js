import React from 'react';
import Button from '@mui/material/Button';
import './style.css';
import { useRef,useState } from 'react';
import {useJsApiLoader,GoogleMap,MarkerF,Autocomplete,DirectionsRenderer} from '@react-google-maps/api'

 
const center = {lat : 18.940984042257476,lng: 72.83538718814057}

const Maps = () => {
 
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  
  /** @type React.MutableRefObject<HTMLInputElements */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElements */
  const destinationRef = useRef();

  const [ libraries ] = useState(['places']);

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
    libraries, 
  })

  if(!isLoaded){
    return "Loading";
  }

  const initialPlaces = (placesRef) =>{
    return (placesRef.current.value).slice(0,(placesRef.current.value).indexOf(','))
  }

  
  async function calculateRoute() {
    if(originRef.current.value === '' || destinationRef.current.value === ''){
      return 
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING

    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)

  }


  return (
    <>
    <div className="form__container">
			<div className='form__container__inputs'>
            <div>
            <p>Origin</p>
            <Autocomplete>
              <div className='input__container'>
                <span><img src="/images/redPin.svg" alt="" /></span><input ref={originRef} />
              </div>
            </Autocomplete>
            
            <p className='input__para'>Destination</p>
            <Autocomplete>
              <div className="input__container">
              <span><img src="/images/redPin.svg" alt="" /></span><input ref={destinationRef} />
              </div>
            </Autocomplete>
          </div>

          <div>
            <Button
              variant="contained"
              style={{
                background: '#1B31A8',
                padding: '15px 40px',
                borderRadius: '50px',
                textTransform: 'none',
                fontFamily: "'Work Sans', sans-serif",

                
              }}
              className='btn'
              onClick={calculateRoute}
              >
              Calculate
            </Button>
          </div>
			
      </div>

			<div className='result__container'>
        <div>
				{distance && <p>Distance : <span className='result__blue'> {distance}</span></p>}
        </div>
        <div>

        { distance &&   
        <p>The distance between &nbsp;<span>{initialPlaces(originRef)} </span>&nbsp;and&nbsp;<span> {initialPlaces(destinationRef)}</span>
        &nbsp; is <span>{distance}</span>. </p>
}
        </div>
			</div>
		</div>

    <div className='map'>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%' , height:'100%'}}
      options={{
        zoomControl:false,
        streetViewControl:false,
        mapTypeControl:false,
        fullscreenControl:false
      }}
     >
        <MarkerF position={center}/>
        {/* Displaying marker , direction */}
        {directionsResponse && <DirectionsRenderer  directions={directionsResponse}/>}      </GoogleMap>
    </div>
    </>
  )
}

export default Maps




