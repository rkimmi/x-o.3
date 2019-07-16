const initialState = {
  start: false,
  img: 'https://apod.nasa.gov/apod/image/1808/GCenter_MeerKAT_1080.jpg',
  desc: 'initial star',
  res: ''
}

const start = (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return { start: true }
    case 'RECEIVE_IMG':
      return { start: true, img: action.img, des: action.desc, res: action.res }
    default:
      return state
  }
}

export default start
