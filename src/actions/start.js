import axios from 'axios'

export const startTest = () => {
  return {
    type: 'START'
  }
}

export const getImage = () => {
  return dispatch => {
    return axios({
      url: `
      https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`,
      method: 'GET',
      headers: {}
    })
      .then(res => {
        dispatch(receiveImage(res.data))
        return res.data
      })
      .catch(error => {
        return error
      })
  }
}

export const receiveImage = data => {
  return {
    type: 'RECEIVE_IMG',
    img: data.url,
    desc: data.explanation,
    res: data
  }
}
