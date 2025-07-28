import axios from 'axios'

export function getDuffelFetchClient() {
  axios.defaults.baseURL = 'https://api.duffel.com/air/';
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${process.env.DUFFEL_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'Duffel-Version': 'v2',
  };

  axios.interceptors.response.use(response => {
    if (response.request.path.includes('offer_requests')) {
      response.data.data.slices = response.data.data.offers.map((slice: any) => {
        const random = Math.random() * (1.5 - 1) + 1;
        slice.base_amount = Math.round(slice.base_amount * random);
        slice.total_amount = Math.round(slice.total_amount * random);
        slice.tax_amount = Math.round(slice.tax_amount * random);
        return slice;
      });

    }

    return response;
  })

  return axios;
}
