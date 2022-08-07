import React from 'react';
import InputOrigin from '../../common/InputOrigin';
import Button from '@mui/material/Button';
import './style.css';
import { useRef,useState } from 'react';
import {useJsApiLoader,GoogleMap,Marker,Autocomplete} from '@react-google-maps/api'

const InputFormData = () => {

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')

	/** @type React.MutableRefObject<HTMLInputElements */
	const originRef = useRef();
	/** @type React.MutableRefObject<HTMLInputElements */
  const destinationRef = useRef();
  
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

  function clearRoute(){
    setDirectionsResponse(null)
    setDistance(null)
    originRef.current.value =""
    destinationRef.current.value =""
  }
	
	return (
		<div className="form__container">
			<div>
				<p>Origin</p>
				{/* <Autocomplete> */}
					<InputOrigin forwardRef={originRef} />
				{/* </Autocomplete> */}
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
          onClick={calculateRoute}
				>
					Calculate
				</Button>
			</div>
			<div>
				<p>Destination</p>
        <Autocomplete>
				<InputOrigin forwardRef={destinationRef} />
        </Autocomplete>
			</div>

			<div>
				<p>
					Distance : <span> 4253 kms</span>
				</p>
			</div>
		</div>
	);
};

export default InputFormData;
