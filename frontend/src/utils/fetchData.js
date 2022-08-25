export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.REACT_APP_RapidAPI_HOST_YT,
    'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_KEY_YT,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  console.log(res)
  const data = await res.json();
  console.log(data)
  return data;
};
