export const API_KEY = 'AIzaSyBpGX7ayckqbcHZMdJFmawMS4kJmh_HvHs';
export const API_KEY_2 = 'AIzaSyD_cq0k8zTyEYlZYOhld9FSP9dYm_G_71A';
// export const API_KEY_2 = 'AIzaSyBpGX7ayckqbcHZMdJFmawMS4kJmh_HvHs';
export const GOOGLE_API = 'https://maps.googleapis.com/maps/api';
export const GOOGLE_PHOTOS_API = `${GOOGLE_API}/place/photo?maxwidth=110&maxheight=110&photoreference=`;
export const GOOGLE_PHOTOS_API_2 = `${GOOGLE_API}/place/photo?maxheight=240&photoreference=`;

export const GREEN = '227c3e';
export const BLUE = '40b8ea';
export const RED = '40b8ea';
export const YELLOW = 'fdc25e';
export const PINK = 'e2107b';

export const DISTANCE_API = (o, d) => {
  return `${GOOGLE_API}/distancematrix/json?units=metric&origins=${o}&destinations=${d}&key=${API_KEY}`;
};

export const PHOTO_API = refCode => {
  return `${GOOGLE_PHOTOS_API_2}${refCode}&key=${API_KEY_2}`;
};

export const DETAILS_API = palceId => {
  const fields = 'name,rating,formatted_phone_number,opening_hours,website,price_level';
  return `${GOOGLE_API}/place/details/json?placeid=${palceId}&fields=${fields}&key=${API_KEY_2}`;
};
