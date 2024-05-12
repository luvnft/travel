import axios, { AxiosResponse, AxiosError } from 'axios';

export interface Airport {
    id: string;
    name: string;
    detailedName: string;
    iataCode: string;
    geoCode: {
        latitude: number;
        longitude: number;
    };
    address: {
        cityName: string;
        cityCode: string;
        countryName: string;
        countryCode: string;
        regionCode: string;
    };
    analytics: {
        travelers: {
            score: number;
        };
    };
}

// API Response Interface
interface ApiResponse<T> {
    data: T;
    message: string[];
    error: string;
}

export const fetchAirports = async (keyword: string): Promise<Airport[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/flight/airports?keyword=${encodeURIComponent(keyword)}`;

    try {
        const response = await axios.get<ApiResponse<Airport[]>>(url);
        return response.data.data; 
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};
