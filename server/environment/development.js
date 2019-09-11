const path = require('path');

const pass = encodeURIComponent('2VqrS7tIyFFcoNlv');

module.exports= {
    dbUrl: 'mongodb+srv://lucasSBTXappClient:'+pass+'@cluster0-xppuo.gcp.mongodb.net/test?retryWrites=true&w=majority',
    cert: path.join( __dirname, '../ssl/localhost.crt'),
    key: path.join( __dirname, '../ssl/localhost.key')
}