var $credentials = {
    "accessKeyId": "AKIAIGBEVWGJNL2HYBMA",
    "secretAccessKey": "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",
    "region": "ap-south-1"
};

var DynamoDB = require('aws-dynamodb')($credentials);

function listTables(){
  DynamoDB.client.listTables(function(err, data) {
    console.log(data.TableNames);
});
console.log( DynamoDB.client );

DynamoDB.on('error', function( operation, error, payload ) {
    console.log("ERROR");
});
}

function onRequest(req,res) {
  var A = Math.random()*4000 + "abc";
DynamoDB.table('ArticlesViewLog')
    .insert({
      "ArticleId": A,
      "createdAt": Math.random()*300
    }, function(err,data) {
        console.log( err, data )
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Database updated!\n');
    res.end();
    listTables();
  }

  var http = require('http');
  var userCount = 0;
  var server = http.createServer(onRequest).listen(8080);
  console.log('server running...');
