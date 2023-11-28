import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countriesListAPI, timeZoneAPI } from 'src/store';
import { Timer } from '.';

export const CountryDropdown = () => {
    const dispatch = useDispatch();
    const { countriesList } = useSelector(state => state?.directoryState);
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState('');

    const getCountriesByRegion = (countries) => {
        const result = {};
        countries.forEach(country => {
            const [region, state, city] = country.split('/');
            if (!result[region]) {
                result[region] = [];
            }
            result[region].push(state && city ? `${state}/${city}` : state ? state : region);
        });
        return result;
    };
    const onChangeHandler = (e) => {
        setCountry(e.target.value)
        dispatch(timeZoneAPI(e.target.value));
    }

    useEffect(() => {
        !countriesList && dispatch(countriesListAPI())
    }, [dispatch])
    useEffect(() => {
        if (countries && Array.isArray(countries) && countries.length > 0) {
            const countriesByRegion = getCountriesByRegion(countries);
            const selectElement = document.getElementById("locations");
            for (const continent in countriesByRegion) {
                if (countriesByRegion.hasOwnProperty(continent)) {
                    const optgroup = document.createElement("optgroup");
                    optgroup.label = continent;
                    countriesByRegion[continent].forEach(city => {
                        let parts = city.split('/');
                        let cityName = parts[1]?.replace('_', ' ');
                        let resultString = parts[0] && cityName ? `${parts[0]?.replace('_', ' ')} : ${cityName}` : `${parts[0]?.replace('_', ' ')}`;
                        const option = document.createElement("option");
                        option.value = `${continent}/${city}`;
                        option.text = resultString;
                        optgroup.appendChild(option);
                    });
                    selectElement.appendChild(optgroup);
                }
            }
            setCountry('America/Argentina/Salta');
            dispatch(timeZoneAPI('America/Argentina/Salta'));
        }
    }, [countries]);
    useEffect(() => {
        countriesList && setCountries(countriesList)
    }, [countriesList])

    return (
        <div className="country-wrapper flex flex-col sm:flex-row justify-between items-center">
            <select
                className='country_dropdown block w-[250px] h-[50px] rounded-md border border-[#000] p-2 my-2 md:my-0 md:mx-2 text-gray-900 shadow-none bg-transparent cursor-pointer'
                name="country"
                id="locations"
                value={country ? country : ''}
                onChange={(e) => onChangeHandler(e)}
            >
                {!countries && <option value={''}>Select Country</option>}
            </select>
            <Timer />
        </div>
    )
}