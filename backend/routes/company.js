const express = require('express');
const companyRouter = express.Router();
const companyController = require('../controller/companyController');
const sql = require('../config/db');


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));


const bodyParser = require('body-parser');
companyRouter.use(bodyParser.json());
companyRouter.use(bodyParser.urlencoded({extended:true}))

//  Ensure the directory exists
// const uploadDir = path.join(__dirname, '../public/com');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
 

companyRouter.use(express.static('public'));

companyRouter.post('/add_vacancy',companyController.addVacancy);

companyRouter.post('/getdata_update_vacancy',companyController.Updatejobdataget);

companyRouter.post('/update_vacancy', companyController.updateJob);

companyRouter.get('/vacancies', companyController.getVacanciesDetils);

companyRouter.post('/getdata_All_Company_id',companyController.getdata_All_Company_id);



// companyRouter.post('/getdata_student_list_by_Company_id',companyController);

// added by roshni
companyRouter.get('/', companyController.getAllCompany);

companyRouter.post('/registerCompany',companyController.registerCompany);

companyRouter.post('/getcompanyinformation',companyController.getcompanyinformation);




companyRouter.get('/companycategory', companyController.getCompany_category);

companyRouter.get('/companytype', companyController.getCompany_Type);

companyRouter.get('/state', companyController.getstate);

companyRouter.get('/district', companyController.getdistrict);

companyRouter.get('/block', companyController.getblock);



// companyRouter.post('/fileupload',upload.single('file'),companyController.fileupload);
// companyRouter.get('/fileupload',companyController.getfiles);











// another api for file uploads 

//fileUploads



// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));
app.use(express.static('uploads'));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 10000000 }
});


companyRouter.post('/uploadLogo', upload.single('Company_Logo_Url'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next("No file found");
  }
  res.json({ Company_Logo_Url: `/uploads/${req.file.filename}` });
});


// Create a GET API endpoint to retrieve images
companyRouter.get('/uploads/:filename', (req, res, next) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadsDir, filename);

  // Debugging: Log the file path
  console.log(`Retrieving file from: ${filepath}`);

  res.sendFile(filepath, err => {
    if (err) {
      next(err);
    }
  });
});
 




// all  files uploads
// companyRouter.post('/allfiles', upload.single('Company_Logo_Url'), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     return next("No file found");
//   }
//   res.json({ Company_Logo_Url: `/uploads/${req.file.filename}` });
// });

// all  files uploads








// Broucher file end point 


companyRouter.post('/uploadBroucher',upload.single('Company_Broucher'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
  const file = req.file;
  if(!file){
    return next("no file found")
  }    
  resp.json({Company_Broucher: `/uploads/${req.file.filename}`})
});















// Other File end piont

// companyRouter.post('/uploadOther',upload.single('Company_Other_Doc_Url'),(req, resp,next) => {   
// const file = req.file;
// if(!file){
//   return next("no file found")
// }
// resp.json({Company_Other_Doc_Url: `/other/images/${req.file.filename}`})
// });




companyRouter.post('/otherDocFile',upload.single('Company_Other_Doc_Url'),(req, resp,next) => {   
  const file = req.file;
  if(!file){
    return next("no file found")
  }    
  resp.json({Company_Other_Doc_Url: `/uploads/${req.file.filename}`})
});








// Route to upload images
companyRouter.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Insert image metadata into the database
  const query = `INSERT INTO Images (imagePath, imageName) VALUES ('${file.path}', '${file.filename}')`;
  sql.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send('File uploaded and saved to database');
  });
});

// Route to get images
companyRouter.get('/images', (req, res) => {
  const query = 'SELECT * FROM Images';
  sql.query(query, (err, result) => {
    if (err) console.log(err);
    else res.json(result.recordset);
  });
});





// add by anil data on 19-07-2023
// reason for cout total company
companyRouter.get('/totalcompany', companyController.getAllCompany);
// reason for cout total company
// add by anil data on 19-07-2023



// for files upload
companyRouter.post('/allfiles',companyController.postCompanyfiles);
companyRouter.get('/allfiles',companyController.getCompanyfiles);
// for files upload




module.exports = companyRouter;