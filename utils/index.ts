import { manufacturers } from "@/constants";
import { CarProps, FilterProps } from "@/types";
import exp from "constants";
import { url } from "inspector";

export async function fetchCars(filters: FilterProps) {

    const { manufacturer, year, model, limit, fuel} = filters
    const headers = {
        'X-RapidAPI-Key':'45720d3564msh556c482d55b5791p12b55cjsn8fad417164f1',
		'X-RapidAPI-Host':'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response= await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {headers: headers,});

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageFactor + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage')

    const { make, year, model } = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const updateSearchParams = ( type: string, value: string) => {
    const SearchParams = new URLSearchParams(window.location.search);

    SearchParams.set(type, value)    

    const newPathname = `${window.location.pathname}?${SearchParams.toString()}`;

    return newPathname;
}