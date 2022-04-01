const axios = require('axios')
const request = require('request')
const Buffer = require('buffer/').Buffer

exports.requestToken = async (req, res) => {
  let code = req.body.code

  let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.CLIENT_URL,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET
        ).toString('base64'))
      },
      withCredentials: true,
      json: true
  }

  request.post(authOptions, function(error, response, body) {
    if(error) return res.status(403).json('Error occurred you do not have access')
    if(response.body.error) return res.status(403).json(response.body)

    let access_token = body.access_token

    return res.json(access_token)
  })
  
}

exports.search = async (req, res) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${req.body.search}&type=${req.body.type}&include_external=audio&offset=0&limit=10`, {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        ContentType: 'application/json'
      }
    })
    
    return res.json(response.data)
    
  } catch (error) {
    console.log(error)
    return res.json(error.response.data)
  }
}

exports.playlist = async (req, res) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${req.body.id}`, { 
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        ContentType: 'application/json'
      }
    })
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.status(403).json('Error getting playlist data')
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/12127262811`, {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        ContentType: 'application/json'
      }
    })
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.status(403).json('Error getting current user')
  }
}