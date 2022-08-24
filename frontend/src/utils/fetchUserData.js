import Axios from "axios";

const fetchUserData = async () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedData)
    return Axios.get(`/user/${storedData.userId}`)
};

export default fetchUserData
  