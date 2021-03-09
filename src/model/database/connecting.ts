
export default function connect_mongo(name, data) {
    //lets require/import the mongodb native drivers.
    // var result = Object.keys(data).map((key) => [Number(key), data[key]]);
    var mongodb = require('mongodb');
  
    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;
  
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/my_database_name';
  
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);
  
        // Get the documents collection
        var collection = db.collection(name);
  

        // Insert some users
        collection.insert(data, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
          }
          //Close connection
          db.close();
        });
      }
    });
}