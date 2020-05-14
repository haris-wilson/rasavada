
const functions = require('firebase-functions');
//const firebase = require('firebase');

//const cors = require('cors')({origin: true});


var admin = require("firebase-admin");
let defaultAppConfig = {
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "e0-rasvada",
    "private_key_id": "0f1bebe5d863e3d9619743fe1566faf1acb05494",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCljuziav/Z2pYD\nU52qKuzNVtCR+b26BYlX0Byi8NY44ni7YiAAtUCLvi3QGQBT3xI1DFk8NxXTDiXt\n+dd1cAMxYPtod6Ybg2x01Olhg0V+sKATVj/zD7iLus2FSJHHE5rGXg2Kzvw+aiQi\n5W4RI8Y2GjqwVvBjR4xzRrHu+pv2kIqeEw6QVhTO56rK0N2yQIMyzHk6vGkT9bsg\nkmS+dBbvdVEpdQHJY/UuN2DWkFYvlhvVVXVWm6PjLEIa2rZAhjn183wZ4hAZSsv2\nqFjY0VKc+axr1aZKvn0pnqDfpxsVKJciHZZrBIw4Tb9k3mmQe3Iy8golFIIi5alM\nCdtCqQbtAgMBAAECggEABFYcUJHmCtEIBgCRh3ymDg0aW7h1vXB1ZjCPj3UEAtlr\nuUXkHmnFhL7vnWYKPnFJVDpg2/nDGt09Jan+wZb9fmtSvL5TQleDeN42NYw4Y3tl\n/xuqFbYDtACpuEiQmzZF9UMF98g4synP+se56k/etcd+qy13NUcRVrOhDFX2X9N1\nchXtqXDCdgWi2kZBIT7QofpkiGAzGXn3DLLDKewq6oP0gO967x0Ue0kB2OpO5rtb\nwgddK5r8LBgJ+4FOZH6EEqE+k6ds5R8r3ZfMyWdOTF0Ew5myp2l7PmK60Esg3mOF\n1AQVJJOxoMi0lqwLdjtsXj3zZqqsZqkRlo5XVzFZwQKBgQDSyvh2OG8+vFLw0Ieu\n67A8PLks+TEs9+Grv9UaDgz12mYyd7ngPb8adKfQhx3G96OTVBO4/QJqKH16Ygk8\nq0DFEdNvj5B4bnBuSWCQxok1ap8k1kBpVwqcwKxGssITWS5jmTmf8aJUmJKN1ab4\n8Igrj+1aXE3p2/0f7oc2Cj/kZwKBgQDJEHhf2gMPArcx+vkUbqAEtmQjR1CYv8wO\nYlgSQbeJasm6FmC7fdYWJ1t++s0XEvdGbFamF0ZBMgtGV1kIOmB4z4+tYud/TFWd\n511pzzMxyLKmK8yM5Jk7nWdD6IO02EwQqddZD2p+4a8ksuoVRUW4wNca0DisMJ4E\nen7eWC4FiwKBgQCw9nsObKRf66RJzRcLr4v9lhDzg6RYFyYalOqnfAI/aAGB/udK\nLSxBXov/0V8bSYzGw7/m/mlHjASDeMg+aZrvlt6FeuYTZMv4mpt6D2LjOEawmznp\n9YvQOySmGa46phT+woURFL9t+8SVVDdgKDZ5M9RUlsdGPExNwWc74/DtowKBgQCo\nx8Ckhbfnk9oAhLMuKab+DbWFv8myT96VfIx91tig7Bmmsj5FZV6ffi5aK2KaKfuV\nDEC4b/UzqTS5uX0tYQO2plXvsISv4X5FbQCHX72T3uvIfh/ZbdQLrRgQc1CMML25\nhzkUs9Ir7Hs/jUjeziW273oiMgRA1xbun318W/1V/QKBgDHLSt+nTYs2PAdx92Is\noYfp+Do/0IfAeP2YSf0oYOZOdcRuhaep3YGNMiF5ZYe7e7NOrPGq1NszP5C5WKpU\noZW9yFItEUagx33kghrPFB4MV/IvUh0xdxF7gREK4ztC7IYN0e6+ZaTX/VpT1wVU\nwgwww6WzxtnDIo9ZSWFZry8D\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xu58q@e0-rasvada.iam.gserviceaccount.com",
    "client_id": "108713969418717526210",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xu58q%40e0-rasvada.iam.gserviceaccount.com"
  }),  
  databaseURL: "https://e0-rasvada.firebaseio.com"
}
//var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp(defaultAppConfig);


const db = admin.firestore();
//const moment = require('moment');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const {Storage}=require('@google-cloud/storage');
const storage = new Storage();

//import * as storageAPI from `@google-cloud/storage`

//const storage = gcs(); // Auto initialize in Google environments
exports.filesUpload = functions.https.onRequest((req, res) =>{
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        // Cloud functions impose this restriction anyway
        fileSize: 10 * 1024 * 1024,
      }
    });
  
    const fields = {};
    const files = [];
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();
  
    busboy.on('field', (key, value) => {
      // You could do additional deserialization logic here, values will just be
      // strings
      fields[key] = value;
    });
  
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(tmpdir, filename);
      console.log(`Handling file upload field ${fieldname}: ${filename} (${filepath})`);
      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);
  
      fileWrites.push(new Promise((resolve, reject) => {
        file.on('end', () => writeStream.end());
        writeStream.on('finish', () => {
          fs.readFile(filepath, (err, buffer) => {
            const size = Buffer.byteLength(buffer);
            console.log(`${filename} is ${size} bytes`);
            if (err) {
              return reject(err);
            }
  
            files.push({
              fieldname,
              originalname: filename,
              encoding,
              mimetype,
              buffer,
              size,
            });
  
            try {
              fs.unlinkSync(filepath);
            } catch (error) {
              return reject(error);
            }
  
            resolve();
          });
        });
        writeStream.on('error', reject);
      }));
    });
  
    busboy.on('finish', () => {
      Promise.all(fileWrites)
        .then(r => {
          req.body = fields;
          req.files = files;
          return console.log("qqqqqqqqqqqqq"+req.body.cksanlda)

          //next();
        })
        .catch(er =>{
            console.error("Error writing document: ", er);
            return res.send("REALfinishedERROR")
    
        })
    });
    //console.log("qqqqqqqqqqqqq"+req.body.cksanlda)
    res.send(req.body)
    busboy.end(req.rawBody);
  })


exports.uploadtest = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        const busboy = new Busboy({ headers: req.headers });
        // This object will accumulate all the uploaded files, keyed by their name
        //const uploads = {}

        // This callback will be invoked for each file uploaded
        const fields = {};
        
        // This object will accumulate all the uploaded files, keyed by their name.
        const uploads = {};
      
        // This code will process each non-file field in the form.
        busboy.on('field', (fieldname, val) => {
          // TODO(developer): Process submitted field values here
          console.log(`Processed field ${fieldname}: ${val}.`);
          fields[fieldname] = val;
        });

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only 
            // be used for files small enough to fit in memory.
            const filepath = path.join(os.tmpdir(), fieldname);
            uploads[fieldname] = { file: filepath }
            console.log(`Saving '${fieldname}' to ${filepath}`);
            file.pipe(fs.createWriteStream(filepath));
        });

        // This callback will be invoked after all uploaded files are saved.
        busboy.on('finish', () => {
            for (const name in uploads) {
                const upload = uploads[name];
                const file = upload.file;
                res.write(`${file}\n`);
                fs.unlinkSync(file);
            }
            //res.end();
        });
        console.log("Inside _________ "+req.cbasjcbsjcb)
        console.log("______________________________________________________ _________ "+fields)

        // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
        // a callback when it's finished.
        busboy.end(req.rawBody);
        //console.log("Outside _________ "+req.rawBody)
        console.log("Inside _________ "+req.rawBody.cbasjcbsjcb)
        console.log("Inside _________ "+req.cbasjcbsjcb)



    } else {
        // Client error - only support POST
        res.status(405).end();
    }
})


exports.helloWorld = functions.https.onRequest((req, res) => {  
    console.log("testestest " + req.body.UserId)

    if (req.method !== 'POST') {
            // Return a "method not allowed" error
            return res.status(405).end();
          }
          const busboy = new Busboy({headers: req.headers});
          const tmpdir = os.tmpdir();
        
          // This object will accumulate all the fields, keyed by their name
          const fields = {};
        
          // This object will accumulate all the uploaded files, keyed by their name.
          const uploads = {};
        
          // This code will process each non-file field in the form.
          busboy.on('field', (fieldname, val) => {
            // TODO(developer): Process submitted field values here
            console.log(`Processed field ${fieldname}: ${val}.`);
            fields[fieldname] = val;
          });


          const fileWrites = [];

            busboy.on('file', (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`${fieldname} Processed file ${filename} `);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
   });

          busboy.on('finish', async () => {
                 await Promise.all(fileWrites);
                const bucket= "gs://e0-rasvada.appspot.com/"//+fields.UserId
                var folder=String(fields.UserId)
               folder= folder.concat('/')

                //  const bucket = admin.storage().bucket();
                //  const stream = bucket.file(uploads[test]).createWriteStream();
                //     stream.end(bytes)

                 await storage.bucket(bucket).upload(uploads.DrivingLicience, {
                  destination: folder+"DrivingLicience",
                })
                await storage.bucket(bucket).upload(uploads.ProfilePic, {
                  destination: folder+"ProfilePic",
                })
            //     // TODO(developer): Process saved files here
            //   //  for (const file of uploads) {
            //     //  fs.unlinkSync(file);
            //     //}
            //     res.send("hello");
                // const admin =require("firebase-admin");
                // //admin.initializeApp(functions.config().firebase);
                // const db = admin.firestore();
                         fields.Points = 0
                         fields.PackAdd=0
                         fields.PlaceAdd=0
                        fields.PhotoAdd=0
                        fields.Verified=false
                db.collection('user').doc(fields.UserId).set(fields)
                .then(ref =>{
                   storage.bucket(bucket).upload(uploads.DrivingLicience, {
                    destination: folder+"DrivingLicience",
                  })
                   storage.bucket(bucket).upload(uploads.ProfilePic, {
                    destination: folder+"ProfilePic",
                  })
                   console.log("Document successfully written!");
                            return res.send("REALfinished")

                        }).catch(er =>{
                            console.error("Error writing document: ", er);
                            return res.send("REALfinishedERROR")
                    
                        })
                        //res.send("finished")
                        

        });
            
               busboy.end(req.rawBody);

    //res.send(req.body.UserId)
})



exports.Register = functions.https.onRequest((req, res) => {  
  console.log("testestest " + req.body.UserId)

  if (req.method !== 'POST') {
          // Return a "method not allowed" error
          return res.status(405).end();
        }
        const busboy = new Busboy({headers: req.headers});
        const tmpdir = os.tmpdir();
      
        // This object will accumulate all the fields, keyed by their name
        const fields = {};
      
        // This object will accumulate all the uploaded files, keyed by their name.
        const uploads = {};
      
        // This code will process each non-file field in the form.
        busboy.on('field', (fieldname, val) => {
          // TODO(developer): Process submitted field values here
          console.log(`Processed field ${fieldname}: ${val}.`);
          fields[fieldname] = val;
        });



        busboy.on('finish', async () => {
              db.collection('user').doc(fields.UserId).get()
              .then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                  return res.send(false)
                } else {
                  console.log('Document data:', doc.data());
                  return res.send(true)

                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
                      //res.send("finished")

      });
          
             busboy.end(req.rawBody);

  //res.send(req.body.UserId)
})














exports.PageHome = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);

    db.collection("user").doc(fields.UserId).get()
    .then(ref =>{
        r=ref.data();
        r.Name=ref.data().Name;
        r.Points=ref.data().Points;
        if(r.Points<=100){
            r.low=0;
            r.high=100;
            r.level=0;
        }
        else{
            r.low=100;
            r.high=400;
            r.level=1;
        }
        res.json(r);
        return console.log("Document successfully written!");

    }).catch(er =>{
        return console.error("Error writing document: ", er);

    })
});
            
busboy.end(req.rawBody);


});


exports.PageLeaderboard = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
      // Return a "method not allowed" error
      return res.status(405).end();
    }
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
  
    // This object will accumulate all the fields, keyed by their name
    const fields = {};
  
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = {};
  
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
      // TODO(developer): Process submitted field values here
      console.log(`Processed field ${fieldname}: ${val}.`);
      fields[fieldname] = val;
    });


    const fileWrites = [];

      busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
file.on('end', () => {
  writeStream.end();
});
writeStream.on('finish', resolve);
writeStream.on('error', reject);
});
fileWrites.push(promise);
});

    busboy.on('finish', async () => {
           await Promise.all(fileWrites);
           db.collection('user').orderBy('Points', 'desc').limit(15).get()
           .then(snapshot => {
             board =[]
             rank=1
             score=0
             i=1
             snapshot.forEach(doc => {
              r={}
              r.Name=doc.data().Name
              r.Points=doc.data().Points
              r.ImageURL=doc.data().ProfilePic

              r.Rank=rank++





              board.push(r)

            })
            return res.json({
              "Leaderboard" : board
            })
          })
          .catch(err => {
            console.log('Error getting documents', err);
            
         })    

  

  })
          
busboy.end(req.rawBody);


});



// exports.PageProfile = functions.https.onRequest((req, res) => {

//     db.collection("user").doc(req.UserId).get()
//     .then(ref =>{
//         res.json(ref.data());
//         return console.log("Document successfully written!");

//     }).catch(er =>{
//         return console.error("Error writing document: ", er);

//     })


// });


exports.PageExpEnter = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = [];
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`${fieldname} Processed file ${filename} `);
const filepath = path.join(tmpdir, filename);
uploads.push(filepath);

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);
            //  const bucket= "gs://e0-rasvada.appspot.com/"//+fields.UserId
            //  var folder=String(fields.UserId)
            // folder= folder.concat('/Experience/')

             
            // async function myFunction(a, b, c, d) {
            //   await storage.bucket(d).upload(a, {
            //     destination: c+b,
            //   })            }
            //   var imgstr="Image";
            //   for(i=0;i<Number(uploads.length);i++){
            //     imgstr="Image".concat(String(i))
            //     myFunction(uploads[i],imgstr,folder,bucket)
            // //    storage.bucket(bucket).upload(uploads[i], {
            // //    destination: folder+imgstr,
            // //  })
            // }
            // res.send("Exp Added")
            // i=0
            // uploads.forEach(doc=>{
            //   imgstr="Image".concat(String(i++))
            //   storage.bucket(bucket).upload(doc, {
            //     destination: folder+imgstr,
            //   })
            // })
             fields.Images=[];

             await db.collection("user").doc(fields.UserId).collection("Experience").add(fields)
             .then(ref =>{
                         console.log("Exp Added Document successfully written!");
                        //return res.send("Exp Added")
                        const bucket= "gs://e0-rasvada.appspot.com/"//+fields.UserId
             var folder=String(fields.UserId)
            folder= folder.concat('/Experience/')
            folder= folder.concat(String(ref.id))
            folder= folder.concat('/')
            async function myFunction(a, b, c, d) {
              await storage.bucket(d).upload(a, {
                destination: c+b,
              })            }
              var imgstr="Image";
              for(i=0;i<Number(uploads.length);i++){
                imgstr="Image".concat(String(i))
                myFunction(uploads[i],imgstr,folder,bucket)
            //    storage.bucket(bucket).upload(uploads[i], {
            //    destination: folder+imgstr,
            //  })

            }
            return console.log("Storage successfully written!");

                
                    }).catch(er =>{
                      return console.error("Exp Added Error writing document: ", er);
                        //return res.send("Exp Added ERROR")
                
                    })
                    photono = Number(uploads.length)*1
                    console.log("Photos added   :-"+photono)
                  await  db.collection("user").doc(fields.UserId).update({
                   PlaceAdd: admin.firestore.FieldValue.increment(1),
                   PhotoAdd:admin.firestore.FieldValue.increment(photono),
                   Points:admin.firestore.FieldValue.increment(1)
                  })
             .then(ref =>{
                        console.log("Document successfully written!");
                        return res.send("Exp Added")
                
                    }).catch(er =>{
                        console.error("Error writing document: ", er);
                        return res.send("Exp Added ERROR")
                
                    })


});
            
busboy.end(req.rawBody);


});
exports.PageExpUpdate = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
      // Return a "method not allowed" error
      return res.status(405).end();
    }
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
  
    // This object will accumulate all the fields, keyed by their name
    const fields = {};
  
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = [];
  
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
      // TODO(developer): Process submitted field values here
      console.log(`Processed field ${fieldname}: ${val}.`);
      fields[fieldname] = val;
    });


    const fileWrites = [];

      busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`${fieldname} Processed file ${filename} `);
const filepath = path.join(tmpdir, filename);
uploads.push(filepath);

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
file.on('end', () => {
  writeStream.end();
});
writeStream.on('finish', resolve);
writeStream.on('error', reject);
});
fileWrites.push(promise);
});

    busboy.on('finish', async () => {
           await Promise.all(fileWrites);
          //  const bucket= "gs://e0-rasvada.appspot.com/"//+fields.UserId
          //  var folder=String(fields.UserId)
          // folder= folder.concat('/Experience/')

           
          // async function myFunction(a, b, c, d) {
          //   await storage.bucket(d).upload(a, {
          //     destination: c+b,
          //   })            }
          //   var imgstr="Image";
          //   for(i=0;i<Number(uploads.length);i++){
          //     imgstr="Image".concat(String(i))
          //     myFunction(uploads[i],imgstr,folder,bucket)
          // //    storage.bucket(bucket).upload(uploads[i], {
          // //    destination: folder+imgstr,
          // //  })
          // }
          // res.send("Exp Added")
          // i=0
          // uploads.forEach(doc=>{
          //   imgstr="Image".concat(String(i++))
          //   storage.bucket(bucket).upload(doc, {
          //     destination: folder+imgstr,
          //   })
          // })
           fields.Images=[];

           await db.collection("user").doc(fields.UserId).collection("Experience").doc(fields.docId).update(fields)
           .then(ref =>{
                       console.log("Exp Added Document successfully written!");
                      //return res.send("Exp Added")
                      const bucket= "gs://e0-rasvada.appspot.com/"//+fields.UserId
           var folder=String(fields.UserId)
          folder= folder.concat('/Experience/')
          folder= folder.concat(String(ref.id))
          folder= folder.concat('/')
          async function myFunction(a, b, c, d) {
            await storage.bucket(d).upload(a, {
              destination: c+b,
            })            }
            var imgstr="Image";
            for(i=0;i<Number(uploads.length);i++){
              imgstr="Image".concat(String(i))
              myFunction(uploads[i],imgstr,folder,bucket)
          //    storage.bucket(bucket).upload(uploads[i], {
          //    destination: folder+imgstr,
          //  })

          }
          return console.log("Storage successfully written!");

              
                  }).catch(er =>{
                    return console.error("Exp Added Error writing document: ", er);
                      //return res.send("Exp Added ERROR")
              
                  })
                  photono = Number(uploads.length)*1
                  console.log("Photos added   :-"+photono)
                await  db.collection("user").doc(fields.UserId).update({
                 PhotoAdd:admin.firestore.FieldValue.increment(photono),
                })
           .then(ref =>{
                      console.log("Document successfully written!");
                      return res.send("Exp Added")
              
                  }).catch(er =>{
                      console.error("Error writing document: ", er);
                      return res.send("Exp Added ERROR")
              
                  })


});
          
busboy.end(req.rawBody);


});



exports.downloadurl = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  temp=filePath.split("/")
  console.log(temp)
  if(temp[1]==="Experience"){
    storage.bucket(fileBucket).file(filePath).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(async (signedUrls) => {
     await db.collection("user").doc(temp[0]).collection("Experience").doc(temp[2]).update({
        Images: admin.firestore.FieldValue.arrayUnion(signedUrls[0]),
        Picture:signedUrls[0]
      })
      

      return console.log(signedUrls)
      // signedUrls[0] contains the file's public URL
    }).catch(er =>{
      return console.error("Error", er);
    

  });


  }
  else if(temp[1]==="ProfilePic"){
    storage.bucket(fileBucket).file(filePath).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(async (signedUrls) => {
     await db.collection("user").doc(temp[0]).update({
        ProfilePic:signedUrls[0]
      })
      

      return console.log(signedUrls)
      // signedUrls[0] contains the file's public URL
    }).catch(er =>{
      return console.error("Error", er);
    

  });

  }

});






 exports.PageExpDisplay = functions.https.onRequest((req, res) => {

    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);
                expdata=[];
                db.collection("user").doc(fields.UserId).collection("Experience").get()
    .then(snapshot => {
        //console.log("test2");

        snapshot.forEach(doc => {
           //sentjson = sentjson  + doc.id + ":"+ JSON.stringify(doc.data()) +",";
           //console.log("testloop");
           var temp = doc.data().Seasons.split("\"")
      console.log("Experience ID SPLIT  "+temp)

      
                var temp2 =[]

             for(i=0;i<temp.length;i++){
                if(i%2 === 1){
                    temp2.push(temp[i]);
                }
             }
           r = Object.assign({}, doc.data());
           
           r.docID = doc.id;
           r.Seasons=temp2

           expdata.push(
               //"docID" : doc.id,
                r,
           );
        });
        //console.log("test3");

        //sentjson=sentjson+"}";
        //data1 = { "questions" : forumdata }
        //console.log(data1)
       return res.json({
           "Experience" : expdata,
       });

      })
      .catch(err => {
        console.log('Error getting documents', err);
        res.json({
          "msg" : "Something Wrong Dis not first"
       });
      });



            });
            
            busboy.end(req.rawBody);
 
})




exports.PagePackAdd = functions.https.onRequest((req, res) => {

    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);

             await db.collection("user").doc(fields.UserId).collection("Package").add(fields)
             .then(ref =>{
              return console.log("Pack Added Document successfully written!");
              //return res.send("Exp Added")
      
          }).catch(er =>{
            return console.error("Pack Added Error writing document: ", er);
              //return res.send("Exp Added ERROR")
      
          })
        await  db.collection("user").doc(fields.UserId).update({
         PackAdd: admin.firestore.FieldValue.increment(1),
         Points:admin.firestore.FieldValue.increment(1)
        })
   .then(ref =>{
              console.log("Document successfully written!");
              return res.send("Pack Added")
      
          }).catch(er =>{
              console.error("Error writing document: ", er);
              return res.send("Pack Added ERROR")
      
          })


            });
            
            busboy.end(req.rawBody);
 
})



exports.PagePackDisplay = functions.https.onRequest((req, res) => {

    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);
                packdata=[];
                db.collection("user").doc(fields.UserId).collection("Package").get()
    .then(snapshot => {
        //console.log("test2");

        snapshot.forEach(doc => {
           //sentjson = sentjson  + doc.id + ":"+ JSON.stringify(doc.data()) +",";
           //console.log("testloop");

           r = Object.assign({}, doc.data());
           
           r.docID = doc.id;
           var temp = r.ExpID.split("\"")
      console.log("Experience ID SPLIT  "+temp)

      
                r.ExpID = []

             for(i=0;i<temp.length;i++){
                if(i%2 === 1){
                    r.ExpID.push(temp[i]);
                }
             }
             

           packdata.push(
                r,
           );
        });
        
       return res.json({
           "Package" : packdata,
       });

      })
      .catch(err => {
        console.log('Error getting documents', err);
        res.json({
          "msg" : "Something Wrong Dis not first"
       });
      });



            });
            
            busboy.end(req.rawBody);
 
})



exports.PageSinglePackDisplay = functions.https.onRequest((req, res) => {

  if (req.method !== 'POST') {
      // Return a "method not allowed" error
      return res.status(405).end();
    }
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
  
    // This object will accumulate all the fields, keyed by their name
    const fields = {};
  
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = {};
  
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
      // TODO(developer): Process submitted field values here
      console.log(`Processed field ${fieldname}: ${val}.`);
      fields[fieldname] = val;
    });


    const fileWrites = [];

      busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
file.on('end', () => {
  writeStream.end();
});
writeStream.on('finish', resolve);
writeStream.on('error', reject);
});
fileWrites.push(promise);
});

    busboy.on('finish', async () => {
           await Promise.all(fileWrites);
              packdata=[];
              db.collection("user").doc(fields.UserId).collection("Package").doc(fields.docId).get()
  .then(pack => {
      //console.log("test2");
      promises=[]
      var temp = pack.data().ExpID.split("\"")
      console.log("Experience ID SPLIT  "+temp)

      
                var temp2 =[]

             for(i=0;i<temp.length;i++){
                if(i%2 === 1){
                    temp2.push(temp[i]);
                }
             }

             for(i=0;i<temp2.length;i++){
               console.log("Experience ID   "+temp2[i])
               console.log("Experience ID TYPE   "+temp2[i])

               //p = db.collection('user').doc(fields.UserId).collection("Experience").doc(temp2[i]).get()

               p = db.collection('user').doc(fields.UserId).collection("Experience").doc(String(temp2[i]).trim()).get()
               

               
               
              promises.push(p);

             }
             return Promise.all(promises);
            })
            .then(snapshot =>{
              packdata=[];
      snapshot.forEach(snap => {
         //sentjson = sentjson  + doc.id + ":"+ JSON.stringify(doc.data()) +",";
         //console.log("testloop");


         var temp = snap.data().Seasons.split("\"")
      console.log("Experience ID SPLIT  "+temp)

      
                var temp2 =[]

             for(i=0;i<temp.length;i++){
                if(i%2 === 1){
                    temp2.push(temp[i]);
                }
             }




        guide = snap.data()
         r = Object.assign({}, guide);
         console.log("document data    "+guide)
         r.docID = snap.id;
         r.Seasons=temp2


         packdata.push(r);

      });
      
     return res.json({
         "Experience" : packdata,
     });

    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.json({
        "msg" : "Something Wrong Dis not first"
     });
    });



          });
          
          busboy.end(req.rawBody);

})



exports.PagePackUpdateDisplay = functions.https.onRequest((req, res) => {

  if (req.method !== 'POST') {
      // Return a "method not allowed" error
      return res.status(405).end();
    }
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
  
    // This object will accumulate all the fields, keyed by their name
    const fields = {};
  
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = {};
  
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
      // TODO(developer): Process submitted field values here
      console.log(`Processed field ${fieldname}: ${val}.`);
      fields[fieldname] = val;
    });


    const fileWrites = [];

      busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
file.on('end', () => {
  writeStream.end();
});
writeStream.on('finish', resolve);
writeStream.on('error', reject);
});
fileWrites.push(promise);
});

    busboy.on('finish', async () => {
           await Promise.all(fileWrites);
              //packdata=[];
              packdata=[];
              var temp2 =[]
              var temp = fields.ExpID.split("\"")
              Iddata=[]
              console.log("Experience ID SPLIT  "+temp)
   
              for(i=0;i<temp.length;i++){
                 if(i%2 === 1){
                     temp2.push(String(temp[i]).trim());
                 }
              }
              db.collection("user").doc(fields.UserId).collection("Experience").get()
            .then(snapshot =>{

              snapshot.forEach(snap => {
        
              guide = snap.data()
              r = Object.assign({}, guide);
              console.log("document data    "+guide)
              r.docID = snap.id;
      
   
                 
                for(i=0;i<temp2.length;i++){
                  console.log("document data Temp    "+temp2[i])
                  console.log("document data Snap   "+snap.id)

                  if(temp2[i].trim() === snap.id)
                  {
                    r.tick=true;
                    break;
                  }
                  else
                  {
                    r.tick=false;
                  }
                }


         packdata.push(r);

      });
      
     return res.json({
      
      "Experience" : packdata,
         
     });

    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.json({
        "msg" : "Something Wrong Dis not first"
     });
    });



          });
          
          busboy.end(req.rawBody);

})



exports.PagePackUpdateEntry = functions.https.onRequest((req, res) => {

  if (req.method !== 'POST') {
      // Return a "method not allowed" error
      return res.status(405).end();
    }
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
  
    // This object will accumulate all the fields, keyed by their name
    const fields = {};
  
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = {};
  
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
      // TODO(developer): Process submitted field values here
      console.log(`Processed field ${fieldname}: ${val}.`);
      fields[fieldname] = val;
    });


    const fileWrites = [];

      busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
file.on('end', () => {
  writeStream.end();
});
writeStream.on('finish', resolve);
writeStream.on('error', reject);
});
fileWrites.push(promise);
});

    busboy.on('finish', async () => {
           await Promise.all(fileWrites);
              //packdata=[];
              // packdata=[];
              // var temp2 =[]
              // var temp = fields.ExpID.split("\"")
              // console.log("Experience ID SPLIT  "+temp)
   
              // for(i=0;i<temp.length;i++){
              //    if(i%2 === 1){
              //        temp2.push(String(temp[i]).trim());
              //    }
              // }
              db.collection("user").doc(fields.UserId).collection("Package").doc(fields.docId).update(fields)
            .then(snapshot =>{
              console.log('Updated Package documents ', snapshot.id);
              return res.json({
                "msg" : "Package Updated"
             });
              

            })
            .catch(err => {
              console.log('Error getting documents', err);
              return res.json({
                "msg" : "Something Wrong Dis not first"
             });
            });
        
        
        
                  });
          
          busboy.end(req.rawBody);

})















































































































exports.TestArray = functions.https.onRequest((req, res) => {

    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
      }
      const busboy = new Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
    
      // This object will accumulate all the fields, keyed by their name
      const fields = {};
    
      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};
    
      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        // TODO(developer): Process submitted field values here
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
      });


      const fileWrites = [];

        busboy.on('file', (fieldname, file, filename) => {
// Note: os.tmpdir() points to an in-memory file system on GCF
// Thus, any files in it must fit in the instance's memory.
console.log(`Processed file ${filename}`);
const filepath = path.join(tmpdir, filename);
uploads[fieldname] = filepath;

const writeStream = fs.createWriteStream(filepath);
file.pipe(writeStream);

// File was processed by Busboy; wait for it to be written to disk.
const promise = new Promise((resolve, reject) => {
  file.on('end', () => {
    writeStream.end();
  });
  writeStream.on('finish', resolve);
  writeStream.on('error', reject);
});
fileWrites.push(promise);
});

      busboy.on('finish', async () => {
             await Promise.all(fileWrites);
                
             expid=[]
           
             var temp = fields.ExpID.split("\"")
             fields.ExpID=[]

             for(i=0;i<temp.length;i++){
                if(i%2 === 1){
                    fields.ExpID.push(temp[i])
                }
             }
             res.json({
                 arra : fields.ExpID,
                
             })
                


            });
            
            busboy.end(req.rawBody);
 
})





// const functions = require("firebase-functions")

// //const functions = require('firebase-functions');
// //const firebase = require('firebase');

// //const cors = require('cors')({origin: true});
// const admin =require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

// /**
//  * Parses a 'multipart/form-data' upload request
//  *
//  * @param {Object} req Cloud Function request context.
//  * @param {Object} res Cloud Function response context.
//  */
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// // Node.js doesn't have a built-in multipart/form-data parsing library.
// // Instead, we can use the 'busboy' library from NPM to parse these requests.
// const Busboy = require('busboy');


















// // const app = express();

// // // enable files upload
// // app.use(fileUpload({
// //     createParentPath: true
// // }));

// // //add other middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({extended: true}));
// // app.use(morgan('dev'));

// // /* Express with CORS & automatic trailing '/' solution */
// // const app3 = express()
// // app3.use(cors({ origin: true }))
// // app3.post("*", (request, response) => {
// //   response.send(
// //     "Hello from Express on Firebase with CORS! No trailing '/' required!"
// //   )
// // })
// // const port = process.env.PORT || 3000;

// // /* app.listen(port, () => 
// //   console.log(`App is listening on port ${port}.`)
// // ) */
// // app.post('/upload-avatar', async (request, response) => {
// //     console.log("file not three")

// //         if(!request.files) {
// //             console.log("file not three")
// //             response.send({
// //                 status: false,
// //                 message: 'No file uploaded'
// //             });
// //         } else {
// //             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
// //             let avatar = request.files.hello;
// //             console.log("file three")

// //             //Use the mv() method to place the file in upload directory (i.e. "uploads")
// //             avatar.mv('./uploads/' + avatar.name);

// //             //send response
// //             response.send({
// //                 status: true,
// //                 message: 'File is uploaded',
// //                 data: {
// //                     name: avatar.name,
// //                     mimetype: avatar.mimetype,
// //                     size: avatar.size
// //                 }
// //             });
// //         }
  
// // });


// // // not as clean, but a better endpoint to consume
// // const api = functions.https.onRequest(app);
// // exports.test =functions.https.onRequest((req, res) => {
// //     if (req.method === 'PUT') {
// //         return res.status(403).send('Forbidden!');
// //       }
// //       return fileUpload(req, res, () => {

// //         if(!req.files) {
// //             console.log("file not three")
// //             res.send({
// //                 status: false,
// //                 message: 'No file uploaded'
// //             });
// //         } else {
// //             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
// //             let avatar = req.files.hello;
// //             console.log("file three")

// //             //Use the mv() method to place the file in upload directory (i.e. "uploads")
// //             //avatar.mv('./uploads/' + avatar.name);

// //             //send response
// //             res.send({
// //                 status: true,
// //                 message: 'File is uploaded',
// //                 data: {
// //                     name: avatar.name,
// //                     mimetype: avatar.mimetype,
// //                     size: avatar.size
// //                 }
// //             });
// //         }

// //       })
// // })

// // const api3 = functions.https.onRequest(app3);
//     //(request, response) => {
//   //if (!request.path) {
//     //request.url = `/${request.url}` // prepend '/' to keep query params if any
//   //}
//   //return app3(request, response)
// //})

// /* module.exports = {
//   api3,
//   api
  
// } */




// exports.uploadFile = functions.https.onRequest((req, res) =>{
//   if (req.method !== 'POST') {
//     // Return a "method not allowed" error
//     return res.status(405).end();
//   }
//   const busboy = new Busboy({headers: req.headers});
//   const tmpdir = os.tmpdir();

//   // This object will accumulate all the fields, keyed by their name
//   const fields = {};

//   // This object will accumulate all the uploaded files, keyed by their name.
//   const uploads = {};

//   // This code will process each non-file field in the form.
//   busboy.on('field', (fieldname, val) => {
//     // TODO(developer): Process submitted field values here
//     console.log(`Processed field ${fieldname}: ${val}.`);
//     fields[fieldname] = val;
//   });
//   console.log("qwertyuiop[fghjkl    "+(req.body.UserId).toString())
// console.log("testttttttttttt   " +  String(fields.HomeLat))
//     // var docdata={
//     //     HomeLat:fields[HomeLat],
//     //     HomeLong:fields[HomeLong],
//     //     LocationLat:fields[LocationLat],
//     //     LocationLong:fields[LocationLong],
//     //     Name:fields[Name],
//     //     PhoneNo:fields[PhoneNo],
//     //     Age:fields[Age],
//     //     Gender:fields[Gender],
//     //     Cemail:fields[CEmail],
//     //     Vechicle:fields[Vechicle],
//     //     VechicleType:fields[VechicleType],
       
//     //     Points : 0,
//     //     PackAdd:0,
//     //     PlaceAdd:0,
//     //     PhotoAdd:0,




//     // }
//     // db.collection('user').doc(fields[UserId]).update(docdata)
//     // .then(ref =>{
//     //     return console.log("Document successfully written!");

//     // }).catch(er =>{
//     //     return console.error("Error writing document: ", er);

//     // })
//   const fileWrites = [];

//   // This code will process each file uploaded.
//   busboy.on('file', (fieldname, file, filename) => {
//     // Note: os.tmpdir() points to an in-memory file system on GCF
//     // Thus, any files in it must fit in the instance's memory.
//     console.log(`Processed file ${filename}`);
//     const filepath = path.join(tmpdir, filename);
//     uploads[fieldname] = filepath;

//     const writeStream = fs.createWriteStream(filepath);
//     file.pipe(writeStream);

//     // File was processed by Busboy; wait for it to be written to disk.
//     const promise = new Promise((resolve, reject) => {
//       file.on('end', () => {
//         writeStream.end();
//       });
//       writeStream.on('finish', resolve);
//       writeStream.on('error', reject);
//     });
//     fileWrites.push(promise);
//   });

//   // Triggered once all uploaded files are processed by Busboy.
//   // We still need to wait for the disk writes (saves) to complete.
//   busboy.on('finish', async () => {
//     await Promise.all(fileWrites);

//     // TODO(developer): Process saved files here
//   //  for (const file of uploads) {
//     //  fs.unlinkSync(file);
//     //}
//     res.send("hello");
//   });

//   busboy.end(req.rawBody);
// });


