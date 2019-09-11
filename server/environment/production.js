const pass = encodeURIComponent('2VqrS7tIyFFcoNlv');

module.exports= {
    dbUrl: 'mongodb+srv://lucasSBTXappClient:'+pass+'@cluster0-xppuo.gcp.mongodb.net/test?retryWrites=true&w=majority',
    cert: '/etc/letsencrypt/live/www.app-sbtx.site/fullchain.pem',
    key: '/etc/letsencrypt/live/www.app-sbtx.site/privkey.pem'
}