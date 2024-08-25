const express = require('express');
const student_route = express();
const router = express.Router();
const studentController = require('../controller/studentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cors = require('cors');

const app = express();
app.use(cors());

// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });
student_route.use(express.static('public'));
const bodyParser = require('body-parser');
student_route.use(bodyParser.json());
student_route.use(bodyParser.urlencoded({extended:true}))


//  Ensure the directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uplaods', express.static(uploadsDir));
app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + path.extname(file.originalname));
    },
    limits: {fileSize: 10000000}
});

const upload = multer({ storage: storage });








router.get('/captcha',studentController.captcha)




router.get('/', studentController.getAllStudents);
router.get('/student', studentController.getStudents);

router.post('/registration', studentController.registerStudent);
// router.post('/', studentController.registration);
// router.post('/apply', studentController.getAllStudents);

router.get('/student_List', studentController.getAllStudents);

router.post('/signup',studentController.Signup);





router.post('/login',studentController.login);

router.post('/search',studentController.Profile);



router.post('/getbasicdetails',studentController.getbasicdetails);

router.post('/postbasicdetails',studentController.postbasicdetails);




// for admin api 
router.get('/getVacancyApplyStudentDetails',studentController.getVacancyApplyStudentDetails);
router.post('/VacancyApplicationStudentDetail',studentController.VacancyApplicationStudentDetail);

router.post('/VacancyApply',upload.single('file'),studentController.VacancyApply);





 

// this api is return join data 
router.post('/getstudentdetails',studentController.getstudentdetails);
// router.get('/users',studentController.users);




// file upload
router.post('/upload',upload.single('photo'),studentController.uploadfile)


// this api is return gender table
router.get('/getGender',studentController.getGender);
router.get('/getSubjects',studentController.getSubjects);
router.get('/getDegree_type',studentController.getDegree_type);
router.get('/getDegree_program',studentController.getDegree_program);

//added by roshni
router.get('/salutationenglish', studentController.getSalutation_English);
router.get('/salutationhindi', studentController.getSalutation_Hindi);
router.get('/registrationtype', studentController.getRegistrationType);

//11/06/2024
router.post('/SkillDetails', studentController.SkillDetails);
router.post('/ExperienceDetails', studentController.ExperienceDetails);
router.post('/AcademicDetails', studentController.AcademicDetails);

router.get('/admissionyear', studentController.Admissionyear);

router.get('/getskill', studentController.getSkill);
router.post('/getskillid', studentController.getSkills);

router.get('/getexperience', studentController.getExperience);
router.post('/getexperienceid', studentController.getExperienceId);

router.get('/getacademic', studentController.getAcademic);
router.post('/AcademicId', studentController.getAcademicId);


router.get('/college', studentController.College);
router.get('/passingoutyear', studentController.PassingOutYear);

// router.post('/add', studentController.postAddstudent);
// router.get('/edit/:id', studentController.getEditstudent);
// router.post('/edit/:id', studentController.postEditstudent);
// router.get('/delete/:id', studentController.deletestudent);



// this api created for next round form data save
//router.post('/NextRoutdDetails',studentController.NextRoutdDetails);




// add by anil data on 19-07-2023
// reason for cout total company
router.get('/totalstudent', studentController.getAllStudents);
// reason for cout total company
// add by anil data on 19-07-2023



// this api created for next round form data save
router.post('/NextRoutdDetails',studentController.NextRoutdDetails);
router.get('/application', studentController.getAllApplications);

// this api created for next round form data save

//for Skill Certificate uplaod 
router.post('/uploadcertificate', upload.single('Skill_Certificate_Url'), (req, res, next) => {
  const file = req.file;
 // console.log(file);
  if (!file) {
    return next("No file found");
  }
  res.json({ Skill_Certificate_Url: `/uploads/${file.filename}` });
});



//Create a GEt API endpoint to retrieve file
router.get('/uploads/:filename', (req, res, next) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadsDir, filename);

  //Debugging: log the file path
  console.log(`Retrieving file from: ${filepath} `);

  res.sendFile(filepath, err => {
    if(err) {
      next(err);
    }
  });
});

//for makksheet upload 
router.post('/uploadmarksheet', upload.single('Marksheet_Url'), (req, res, next) => {
  const file = req.file;
  if(!file) {
    return next("No file found");
  }
  res.json({ Marksheet_Url: `/uploads/${file.filename}`});
});

//Router to uplaod image 
router.post('/uploads', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uplaoded.');
  }

  //Insert image metadata into the database 
  const query = `INSERT INTO Image (imagePath, imageName) VALUES ('${file.path}', '${file.filename}')`;
  sql.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send('File uploaded and saved to database');
  });
});

//Rpute to get images
router.get('/images', (req, res) => {
  const query = 'SELECT * FROM Image';
  sql.query(query, (err, result) => {
    if (err) console.log(err);
    else res.json(result.recordset);
  });
});


module.exports = router;
