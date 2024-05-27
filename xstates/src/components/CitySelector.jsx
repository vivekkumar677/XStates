import React, { useEffect, useState } from "react";
// import styles from "../components/Home.module.css";
import styles from '../components/Country.module.css';

const CitySelector = () => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [message, setMessage] = useState('');
    const [isStyled, setIsStyled] = useState(false);

    useEffect(() => {
        // Fetch all contries on initial render
        try {
            fetch('https://crio-location-selector.onrender.com/countries')
            .then(response => response.json())
            .then(data => setCountries(data));
        } catch (error) {
            console.error("Error fetching countries: ", error);
        }
    }, []);

    useEffect(() => {
        // Fetch states for the seleced country

        if(selectedCountry) {
            try {
                fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => response.json())
                .then(data => setStates(data));
            } catch (error) {
                console.error("Error fetching states: ", error);
            }
        }
    }, [selectedCountry]);

    useEffect(() => {
        // Fetch all cities
        if(selectedCountry && selectedState) {
            try {
                fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => response.json())
                .then(data => setCities(data));
            } catch (error) {
                console.error("Error fetching cities: ", error);
            }
        }
    }, [selectedCountry, selectedState]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedCity();
        setStates([]);
        setCities([]);
        setMessage('');
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
        setCities([]);
        setMessage('');
        // setIsStyled(!isStyled)
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setMessage(`You selected ${e.target.value}, ${selectedState}, ${selectedCountry}`);
        // setIsStyled(!isStyled)
    };

    // const style = {
    //     fontWeight: isStyled ? 'bold' : 'normal',
    //     fontSize: isStyled ? 'Large' : 'normal',
    //     color: isStyled ? 'Black' : 'white',
        
    // }

    return (
        <div className={styles.home}>
            <h1>Select Country</h1>

            <div className={styles.form} >
                <select id="country" value={selectedCountry} className={styles.formSelect} onChange={handleCountryChange} style={{ width: "500px" }}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <select id="state" value={selectedState} className={styles.formSelect} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                <select id="city" value={selectedCity} className={styles.formSelect} onChange={handleCityChange} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CitySelector;
