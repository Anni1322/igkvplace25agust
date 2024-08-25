const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = require('./routes/student')
const companyRouter = require('./routes/company')
const adminRouter = require('./routes/admin')
const multer = require('multer');
const sql = require('./config/db');
const cors = require('cors');




// morgun
// joy /- validation (query)



const app = express();

app.use(cors());
app.use(cors({origin: "*"}));

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });


app.use('/student', studentRouter);
app.use('/company', companyRouter);
app.use('/admin', adminRouter);
 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
