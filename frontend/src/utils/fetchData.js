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
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'b09b433e7fmsh170aab7e065e20cp1670ecjsn55b522452c0a',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  console.log(res)
  const data = await res.json();
  console.log(data)
  return data;
};
