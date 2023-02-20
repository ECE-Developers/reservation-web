import axios from 'axios';

const findUserId = (userId) =>{
  axios.post(`${process.env.REACT_APP_API_URL}/auth/${localStorage.getItem('id')}`)
  .then(function(response){
    if(response.data.id){
      userId(response.data.id)
    }
  }).catch(function(error){
    console.log(error);
  });
}

export default findUserId;