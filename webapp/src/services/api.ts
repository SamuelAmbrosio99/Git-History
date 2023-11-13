const BASE_URL = 'http://localhost:3000/';

export const getData = async (endpoint: string) => {
    try {
        
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        const data = await response.json();
        return data;

    } catch (error: any) {
        
        console.log('Error: ', error);
        throw new Error(error);

    }
}