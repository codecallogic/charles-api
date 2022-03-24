exports.hello = (req, res) => {
  console.log('Hello')
  console.log(req.body)
  res.send('Server API running on port 3001, testing connection for route /test/hello, server can be configured for authorized users only.')
}