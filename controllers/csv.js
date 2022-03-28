const fs = require('fs')
const fastcsv = require('fast-csv')
const { v4: uuidv4 } = require('uuid')

exports.generateCSV = (req, res) => {

  let fileId = uuidv4()

  let ws = fs.createWriteStream(`public/data-${fileId}.csv`)
  fastcsv.write(req.body, { headers: true })
  .on('error', err => res.send(err))
  .on("finish", function() {
    res.send(fileId)
  })
  .pipe(ws)
}