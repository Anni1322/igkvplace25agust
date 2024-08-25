// controller.js
const Student = require('../model/studentModel');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const sql = require('../config/db');
//const svgCaptcha = require('svg-captcha');


 
// get ip
const os = require('os');
// end


// function generateEmpId(empNum) {
//     // Format empNum to have leading zeros if necessary
//     const paddedEmpNum = empNum.toString().padStart(2, '0');
//     // Concatenate 'igkv' with paddedEmpNum
//     const empId = 'igkv' + paddedEmpNum; 
//     return empId;
// }

// // Example usage:
// const empNum = 1;
// const empId = generateEmpId(empNum);
// console.log(empId); // Output: igkv01
//  get captcha code 
const svgCaptcha = require('svg-captcha');
const session = require('express-session');
const express = require('express');
const app = express();

// Set up express-session middleware
app.use(session({
    secret: 'your_secret_key',  
    resave: false,
    saveUninitialized: true
}));


// Generate CAPTCHA
const captcha = async (req, res) => {
    console.log(req.session); // Add this line to debug

    // Generate CAPTCHA code
    const captcha = svgCaptcha.create();

    console.log(captcha.text);

    // Store CAPTCHA code in session
    req.session = captcha.text;

    // Send CAPTCHA image to the client
    res.json({ image: captcha.data, capvalue: captcha.text });
};
 



// // // for decription 
 function decryptData(encryptedData,secretKey ) {    
     try {
         const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
         const originalText = bytes.toString(CryptoJS.enc.Utf8);
         return originalText;
     } catch (error) {
         console.error('Error decrypting data:', error);
         return null;
     }
 };




 


//  jwt token use 
const login = async (req, res) => {
    const { username, password   } = req.body;
    console.log("this is from frontend",username, password);



    // if (captcha !== req.session) {
    //     return res.status(400).json({ error: 'CAPTCHA validation failed' });
    //   }






        // drcipt start
           
            // const secretKey = 'anil';  
            // const decryptedData = decryptData(password, secretKey);
            // if (decryptedData) {
            //     res.status(200).json({ decryptedData });
            // } else {
            //     res.status(400).json({ error: 'Failed to decrypt data' });
            // }
        // drcipt end

    try {
        const request = new sql.Request();
        const usernameCheckQuery = `
        SELECT l.id, l.Emp_Id, l.username, l.password, l.role, 
               s.Student_First_Name_E, s.Student_Middle_Name_E, s.Student_Last_Name_E, 
               s.Father_Name_E, s.Mobile_No, s.Email_Id, s.DOB
        FROM dbo.login_table AS l
        FULL JOIN student_registration AS s ON l.Emp_Id = s.UE_ID
        WHERE l.username = @username`;

        request.input('username', sql.VarChar, username);

        const result = await request.query(usernameCheckQuery);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            console.log(isPasswordValid);

            if (isPasswordValid) {
                // Password matches, return success along with user details
                return res.status(200).json({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    eid: user.Emp_Id,
                    fname: user.Student_First_Name_E,
                    mname: user.Student_Middle_Name_E,
                    lname: user.Student_Last_Name_E,
                    FatherName: user.Father_Name_E,
                    mno: user.Mobile_No,
                    email: user.Email_Id,
                    dob: user.DOB,
                    fullname: `${user.Student_First_Name_E} ${user.Student_Middle_Name_E} ${user.Student_Last_Name_E}`,
                    message: 'Username login successful'
                });
            } else {
                // Password does not match
                return res.status(400).json({ error: 'Incorrect password' });
            }
        } else {
            // Username does not exist
            return res.status(400).json({ error: 'Username does not exist' });
        }
    } catch (error) {
        console.error('Error checking Username existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};







// Decrypt function
// function decryptData(encryptedData, secretKey) {    
//     try {
//         const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//         const originalText = bytes.toString(CryptoJS.enc.Utf8);
//         return originalText;
//     } catch (error) {
//         console.error('Error decrypting data:', error);
//         return null;
//     }
// }

// Login function
// const login = async (req, res) => {
//     const { username, password } = req.body;
//     console.log("Received from frontend:", username, password);

//     // Decrypt the password from the frontend
//     const secretKey = 'anil';  
//     const decryptedPassword = decryptData(password, secretKey);

//     if (!decryptedPassword) {
//         return res.status(400).json({ error: 'Failed to decrypt data' });
//     }

//     console.log("Decrypted password:", decryptedPassword);

//     try {
//         const request = new sql.Request();
//         const usernameCheckQuery = `
//         SELECT l.id, l.Emp_Id, l.username, l.password, l.role, 
//                s.Student_First_Name_E, s.Student_Middle_Name_E, s.Student_Last_Name_E, 
//                s.Father_Name_E, s.Mobile_No, s.Email_Id, s.DOB
//         FROM dbo.login_table AS l
//         FULL JOIN student_registration AS s ON l.Emp_Id = s.UE_ID
//         WHERE l.username = @username`;

//         request.input('username', sql.VarChar, username);

//         const result = await request.query(usernameCheckQuery);

//         if (result.recordset.length > 0) {
//             const user = result.recordset[0];
//             const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);

//             if (isPasswordValid) {
//                 // Password matches, return success along with user details
//                 return res.status(200).json({
//                     id: user.id,
//                     username: user.username,
//                     role: user.role,
//                     eid: user.Emp_Id,
//                     fname: user.Student_First_Name_E,
//                     mname: user.Student_Middle_Name_E,
//                     lname: user.Student_Last_Name_E,
//                     FatherName: user.Father_Name_E,
//                     mno: user.Mobile_No,
//                     email: user.Email_Id,
//                     dob: user.DOB,
//                     fullname: `${user.Student_First_Name_E} ${user.Student_Middle_Name_E} ${user.Student_Last_Name_E}`,
//                     message: 'Username login successful'
//                 });
//             } else {
//                 // Password does not match
//                 return res.status(400).json({ error: 'Incorrect password' });
//             }
//         } else {
//             // Username does not exist
//             return res.status(400).json({ error: 'Username does not exist' });
//         }
//     } catch (error) {
//         console.error('Error checking username existence in SQL Server:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



















// for Signup
// Define the generateEmpId function
function generateEmpId(empNum) {
    // Check if empNum is null or undefined
    if (empNum === null || empNum === undefined) {
        console.error("empNum is null or undefined");
        return null; 
    }

    // Format empNum to have leading zeros if necessary
    const paddedEmpNum = empNum.toString().padStart(2, '0');
    // Concatenate 'igkv' with paddedEmpNum
    const empId = 'IGKV' + paddedEmpNum;
    return empId;
}
function generateEmpIdcompay(empNum) {
    // Check if empNum is null or undefined
    if (empNum === null || empNum === undefined) {
        console.error("empNum is null or undefined");
        return null; 
    }

    // Format empNum to have leading zeros if necessary
    const paddedEmpNum = empNum.toString().padStart(2, '0');
    // Concatenate 'igkv' with paddedEmpNum
    const empId = 'COM' + paddedEmpNum;
    return empId;
}


const Signup = async (req, res) => {
    try {
        // Access the request body
        const {name, username, password, role } = req.body;
        console.log("Data=>", name, username, password, role);

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if password is a string
        if (typeof password !== 'string') {
            return res.status(400).json({ error: 'Password must be a string' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password=>", hashedPassword);

        // Set up SQL request
        const request = new sql.Request();

        // Check if username already exists
        const usernameCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.login_table WHERE username = @username';
        request.input('username', sql.VarChar, username);
        const usernameResult = await request.query(usernameCheckQuery);
        if (usernameResult.recordset[0].count > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Retrieve the maximum id from login_table
        const maxIdQuery = 'SELECT MAX(id) AS max_id FROM dbo.login_table';
        const maxIdResult = await request.query(maxIdQuery);
        const maxId = maxIdResult.recordset[0].max_id || 0;
        console.log("Max ID:", maxId);

        let empId;

        if (role == 2) {
            empId = generateEmpIdcompay(maxId + 1); // Assuming this function generates company employee ID
        } else {
            empId = generateEmpId(maxId + 1); // Assuming this function generates regular employee ID
        }

        console.log("Generated Emp Id:", empId);

        // Create a new instance of sql.Request() for the insert operation
        const insertRequest = new sql.Request();
        const insertQuery = 'INSERT INTO dbo.login_table (name, username, password, Emp_Id, role) VALUES (@name, @username, @password, @Emp_Id, @role)';
        insertRequest.input('name', sql.VarChar, name);
        insertRequest.input('username', sql.VarChar, username); // Use insertRequest here, not request
        insertRequest.input('password', sql.VarChar, hashedPassword);
        insertRequest.input('Emp_Id', sql.VarChar, empId);
        insertRequest.input('role', sql.Int, role);

        await insertRequest.query(insertQuery);
        res.status(200).json({ empId: empId, message: 'User registered successfully' });

    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};











const Profile = async (req, res) => {
    const { eid } = req.body;
    // if (!eid) {
    //     return res.status(400).json({ error: 'eid is required' });
    // }
    try {
        const request = new sql.Request();
        request.input('eid', sql.VarChar(50), eid);

        const query = 'SELECT * FROM dbo.student_registration WHERE UE_ID = @eid';
        console.log('Executing query:', query, 'with eid:', eid);
        const result = await request.query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error checking existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};






// login
// const login = async (req, res) => {
//     try {
//         // Access the request body
//         const { username, password } = req.body;
//         console.log("Login Data=>", username, password);

//         // Validate required fields
//         if (!username || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Check if password is a string
//         if (typeof password !== 'string') {
//             return res.status(400).json({ error: 'Password must be a string' });
//         }

//         // Set up SQL request
//         const request = new sql.Request();
    
//         const userCheckQuery = `
//         SELECT l.id, l.Emp_Id, l.username, l.password, l.role s.*
//         FROM dbo.login_table AS l
//         FULL JOIN student_registration AS s ON l.Emp_Id = s.UE_ID
//         WHERE l.username = @username`;
        
//         request.input('username', sql.VarChar, username);

//         // Check if the user exists
//         const userResult = await request.query(userCheckQuery);
//         if (userResult.recordset.length === 0) {
//             return res.status(400).json({ error: 'Invalid username or password' });
//         }

//         const user = userResult.recordset[0];
//         console.log("User Data=>", user);

//         // Compare the provided password with the stored hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ error: 'Invalid username or password' });
//         }

//         // Successful login
//         res.status(200).json({ message: 'Login successful', empId: user.Emp_Id, role: user.role });
//     } catch (err) {
//         console.error('Error: ', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// api for get update basic detils
const getbasicdetails = async (req, res) => {
    const { eid } = req.body;
    // if (!eid) {
    //     return res.status(400).json({ error: 'eid is required' });
    // }
    try {
        const request = new sql.Request();
        request.input('eid', sql.VarChar(50), eid);

        const query = 'SELECT * FROM dbo.student_registration WHERE UE_ID = @eid';
        console.log('Executing query:', query, 'with eid:', eid);
        const result = await request.query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error checking existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// api for post update basic details
const postbasicdetails = async (req, res)=>{
        // Access the request body
        const {
            UE_ID,
            Registration_Type,
            Salutation_E,
            Salutation_H,
            Student_First_Name_E,
            Student_Middle_Name_E,
            Student_Last_Name_E,
            Student_First_Name_H,
            Student_Middle_Name_H,
            Student_Last_Name_H,
            DOB,
            Gender_Id,
            Mobile_No,
            Email_Id,
            Father_Name_E,
            Mother_Name_E,
            Father_Name_H,
            Mother_Name_H,
            Guardian_Name_E,
            Spouse_Name_E,
            Modified_By,
            Modified_Date,
            Delete_Flag,
            Public_IP_Address,
            Private_IP_Address
        } = req.body;
        
        try {
            const pool = await sql.connect(); // Connect to the database using the exported sql object
            const request = pool.request(); // Create a request object from the pool
    
            // Check if the student with the provided UE_ID exists
            const checkQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE UE_ID = @UE_ID';
            request.input('UE_ID', sql.VarChar(50), UE_ID);
    
            const checkResult = await request.query(checkQuery);
    
            if (checkResult.recordset[0].count === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
    
            // Update the student data
            const updateQuery = `UPDATE dbo.student_registration SET
                    Registration_Type = @Registration_Type,
                    Salutation_E = @Salutation_E,
                    Salutation_H = @Salutation_H,
                    Student_First_Name_E = @Student_First_Name_E,
                    Student_Middle_Name_E = @Student_Middle_Name_E,
                    Student_Last_Name_E = @Student_Last_Name_E,
                    Student_First_Name_H = @Student_First_Name_H,
                    Student_Middle_Name_H = @Student_Middle_Name_H,
                    Student_Last_Name_H = @Student_Last_Name_H,
                    DOB = @DOB,
                    Gender_Id = @Gender_Id,
                    Mobile_No = @Mobile_No,
                    Email_Id = @Email_Id,
                    Father_Name_E = @Father_Name_E,
                    Mother_Name_E = @Mother_Name_E,
                    Father_Name_H = @Father_Name_H,
                    Mother_Name_H = @Mother_Name_H,
                    Guardian_Name_E = @Guardian_Name_E,
                    Spouse_Name_E = @Spouse_Name_E,
                    Modified_By = @Modified_By,
                    Modified_Date = @Modified_Date,
                    Delete_Flag = @Delete_Flag,
                    Public_IP_Address = @Public_IP_Address,
                    Private_IP_Address = @Private_IP_Address
                WHERE UE_ID = @UE_ID`;
    
            // Bind the updated values
            request.input('Registration_Type', sql.Char, Registration_Type);
            request.input('Salutation_E', sql.TinyInt, Salutation_E);
            request.input('Salutation_H', sql.TinyInt, Salutation_H);
            request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
            request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
            request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
            request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
            request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
            request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
            request.input('DOB', sql.Date, DOB);
            request.input('Gender_Id', sql.Char, Gender_Id);
            request.input('Mobile_No', sql.VarChar(12), Mobile_No);
            request.input('Email_Id', sql.VarChar(50), Email_Id);
            request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
            request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
            request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
            request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
            request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
            request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
            request.input('Modified_By', sql.VarChar(20), Modified_By);
            request.input('Modified_Date', sql.DateTime, Modified_Date);
            request.input('Delete_Flag', sql.Char, Delete_Flag);
            request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
            request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);
    
            await request.query(updateQuery);
    
            // Respond with success message
            res.status(200).json({ message: 'Student details updated successfully' });
        } catch (err) {
            console.error('Error updating student details: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    


// post api for apply vacancy
const VacancyApply = async (req, res) => {
    const {
        Vacancy_ID,
        Company_ID,
        Company_Name,
        Student_ID,
        Full_Name,
        Post_Name,
        Fathers_Name,
        Email,
        Mobile,
        Status,
        Created_Date
       // Modified_By,
       // Delete_Flag,
       // Public_IP_Address,
       // Private_IP_Address
    } = req.body;

    // console.log(Post_Name);

    const file = req.file; // Get the file from the request
    const Resume_Path = file ? file.path : null; // Get the file path

    try {
        const pool = await sql.connect(); // Connect to the database using the exported sql object
        const request = pool.request(); // Create a request object from the pool

        // Check if the Vacancy_ID already exists
        const checkQuery = `
            SELECT COUNT(*) as count 
            FROM tnp_student_application_details 
            WHERE Vacancy_ID = @Vacancy_ID AND Student_ID = @Student_ID`;

        request.input('Vacancy_ID', sql.NVarChar(50), Vacancy_ID);
        request.input('Student_ID', sql.NVarChar(50), Student_ID);

        const result = await request.query(checkQuery);
        const count = result.recordset[0].count;

        if (count > 0) {
            console.log(count);
            // Vacancy_ID already exists for the given Student_ID, return a response indicating that the form is already submitted
            return res.status(400).json({ message: 'Form already submitted for this vacancy.' });
        }

        // Insert new student application details
        const insertQuery = `
            INSERT INTO tnp_student_application_details 
                (Vacancy_ID, Company_ID, Company_Name, Student_ID, Full_Name, Post_Name, Fathers_Name, Email, Mobile, Status, Resume_Path, Created_Date)
            VALUES 
                (@Vacancy_ID, @Company_ID, @Company_Name, @Student_ID, @Full_Name, @Post_Name, @Fathers_Name, @Email, @Mobile, @Status, @Resume_Path, @Created_Date)`;

        // Bind the remaining values
        request.input('Company_ID', sql.NVarChar(50), Company_ID);
        request.input('Company_Name', sql.NVarChar(50), Company_Name);
        request.input('Full_Name', sql.NVarChar(100), Full_Name);
        request.input('Post_Name', sql.NVarChar(100), Post_Name);
        request.input('Fathers_Name', sql.NVarChar(100), Fathers_Name);
        request.input('Email', sql.NVarChar(100), Email);
        request.input('Mobile', sql.NVarChar(13), Mobile);
        request.input('Status', sql.NVarChar(20), Status);
        request.input('Resume_Path', sql.NVarChar(2000), Resume_Path);
        request.input('Created_Date', sql.NVarChar(20), Created_Date);
      //  request.input('Modified_By', sql.NVarChar(50), Modified_By);
      //  request.input('Delete_Flag', sql.Char(1), Delete_Flag);
      //  request.input('Public_IP_Address', sql.NVarChar(20), Public_IP_Address);
      //  request.input('Private_IP_Address', sql.NVarChar(20), Private_IP_Address);

        await request.query(insertQuery);

        // Respond with success message
        res.status(200).json({ message: 'Student application details inserted successfully' });
    } catch (err) {
        console.error('Error inserting student application details: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






// for admin api 
const getVacancyApplyStudentDetails = async(req, res)=>{
    var request = new sql.Request();
    var query = "SELECT * FROM dbo.tnp_student_application_details";

    // Execute the SQL query
    request.query(query, function(err, records) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error executing the query' });
            return;
        }
        // Send the fetched records as JSON response
        res.json(records.recordset);
    });

}



// this api retun join data
const VacancyApplicationStudentDetail = async (req, res) => {
    const eid = req.body.eid; // Assuming 'eid' is a field in the request body
    console.log(eid);

    try {
        var request = new sql.Request();
        request.input('eid', sql.VarChar, eid); // Adjust the SQL data type as necessary

        var query = 'SELECT * FROM dbo.tnp_student_application_details WHERE Student_ID = @eid';

        // Execute the SQL query
        request.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.json(result.recordset);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unexpected server error' });
    }
};








// const nodemailer = require('nodemailer');

const postAllStudents = async(req, res)=>{
    try{  
        const email = req.body.email;
        const existmail = await Student.findOne({email: email });
        if (existmail) {
            // alert('This Email Allready exist');
            res.render('login',{message:'This Email Allready exist '});
        } else {
            
        // const spassword = await securePassword(req.body.password);
        const student = new Student({
            name:req.body.name,
            email:req.body.email,
            dob:req.body.dob,
            gender:req.body.gender,
            mobile:req.body.mobile,
            address:req.body.address,
            // image:req.file.filename,
            password:password,
            // password:spassword,
            is_admin:0,
        });

        const studentData = await student.save();
        if(studentData){
            // sendvarifyMail(req.body.name, req.body.email, userData._id);
            res.render('login',{message:'Your registration has been successflly, Please varify your email'})
        }else{
            res.render('registration',{message:'Your registration has been failed'})
        }
    }
     }catch(error){
         console.log(error.message)
     }
}


// for adnroid
const getStudents = async(req, res)=>{
    var request = new sql.Request();
    var query = "SELECT * FROM dbo.students";

    // Execute the SQL query
    request.query(query, function(err, records) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error executing the query' });
            return;
        }
        // Send the fetched records as JSON response
        res.json(records.recordset);
    });
}




const getAllStudents = async(req, res)=>{
    var request = new sql.Request();
    var query = "SELECT * FROM dbo.student_registration";

    // Execute the SQL query
    request.query(query, function(err, records) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error executing the query' });
            return;
        }
        // Send the fetched records as JSON response
 
      const totalCount = records.recordset.length;
      res.json({ data: records.recordset, totalCount });
    });
}












// const registerStudent = async (req, res) => {
//     // Access the request body
//     const { name, email, age, gender } = req.body;

//     console.log("Data=>", name, email, age, gender);
    
//     // Validate required fields
//     if (!name || !email || !age || !gender ) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
    
//     // Create a new request object
//     const request = new sql.Request();
    
//     // SQL query to check if the email exists in the students table
//     const emailCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.students WHERE email = @email';
//     request.input('email', sql.VarChar, email);

//     request.query(emailCheckQuery, (err, result) => {
//         if (err) {
//             console.error('Error checking email existence in SQL Server: ', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // If count is greater than 0, email exists
//         if (result.recordset[0].count > 0) {
//             // Email exists, return an error
//             return res.status(400).json({ error: 'Email already exists' });
//         } else {
//             // Email doesn't exist, proceed with inserting data
//             // Insert data into SQL Server
//             const insertQuery = 'INSERT INTO dbo.students (name, email, age, gender) VALUES (@name, @email, @age, @gender)';
//             request.input('name', sql.VarChar, name);
//             request.input('age', sql.Int, age);
//             request.input('gender', sql.VarChar, gender);

//             request.query(insertQuery, (err, results) => {
//                 if (err) {
//                     console.error('Error inserting into SQL Server: ', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//                 // Handle successful insertion
//                 res.status(200).json({ message: 'Student registered successfully' });
//             });
//         }
//     });
// };



 

// const registerStudent = async (req, res) => {
//     // Access the request body
//     const {
//         user_id,
//         Registration_Type,
//         Salutation_E,
//         Salutation_H,
//         Student_First_Name_E,
//         Student_Middle_Name_E,
//         Student_Last_Name_E,
//         Student_First_Name_H,
//         Student_Middle_Name_H,
//         Student_Last_Name_H,
//         DOB,
//         Gender_Id,
//         Mobile_No,
//         Email_Id,
//         Father_Name_E,
//         Mother_Name_E,
//         Father_Name_H,
//         Mother_Name_H,
//         Guardian_Name_E,
//         Spouse_Name_E,
//         Created_By,
//         Created_Date,
//         Modified_By,
//         Modified_Date,
//         Delete_Flag,
//         Public_IP_Address,
//         Private_IP_Address    
//     } = req.body;
    
//     // Validate required fields
//     // if (!name || !email || !age || !gender ) {
//     //     return res.status(400).json({ error: 'All fields are required' });
//     // }

//     console.log("this id check"+ user_id);
    
//     // Create a new request object
//     const request = new sql.Request();
    
//     // SQL query to check if the email exists in the students table
//     const emailCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE Email_Id = @Email_Id';
//     request.input('Email_Id', sql.VarChar(50), Email_Id);

//     request.query(emailCheckQuery, (err, result) => {
//         if (err) {
//             console.error('Error checking email existence in SQL Server: ', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // If count is greater than 0, email exists
//         if (result.recordset[0].count > 0) {
//             // Email exists, return an error
//             return res.status(400).json({ error: 'Email already exists' });

//         } else {
//             // Email doesn't exist, proceed with inserting data
            
//             // Insert data into SQL Server
//             const insertQuery = `INSERT INTO dbo.student_registration (
//                     UE_ID,
//                     Registration_Type,
//                     Salutation_E,
//                     Salutation_H,
//                     Student_First_Name_E,
//                     Student_Middle_Name_E,
//                     Student_Last_Name_E,
//                     Student_First_Name_H,
//                     Student_Middle_Name_H,
//                     Student_Last_Name_H,
//                     DOB,
//                     Gender_Id,
//                     Mobile_No,
//                     Email_Id,
//                     Father_Name_E,
//                     Mother_Name_E,
//                     Father_Name_H,
//                     Mother_Name_H,
//                     Guardian_Name_E,
//                     Spouse_Name_E,
//                     Created_By,
//                     Created_Date,
//                     Modified_By,
//                     Modified_Date,
//                     Delete_Flag,
//                     Public_IP_Address,
//                     Private_IP_Address
//                 ) VALUES (
//                     @UE_ID,
//                     @Registration_Type,
//                     @Salutation_E,
//                     @Salutation_H,
//                     @Student_First_Name_E,
//                     @Student_Middle_Name_E,
//                     @Student_Last_Name_E,
//                     @Student_First_Name_H,
//                     @Student_Middle_Name_H,
//                     @Student_Last_Name_H,
//                     @DOB,
//                     @Gender_Id,
//                     @Mobile_No,
//                     @Email_Id,
//                     @Father_Name_E,
//                     @Mother_Name_E,
//                     @Father_Name_H,
//                     @Mother_Name_H,
//                     @Guardian_Name_E,
//                     @Spouse_Name_E,
//                     @Created_By,
//                     @Created_Date,
//                     @Modified_By,
//                     @Modified_Date,
//                     @Delete_Flag,
//                     @Public_IP_Address,
//                     @Private_IP_Address
//                 )`;
//                     request.input('UE_ID', sql.VarChar(50), user_id);
//                     request.input('Registration_Type', sql.Char, Registration_Type);
//                     request.input('Salutation_E', sql.TinyInt, Salutation_E);
//                     request.input('Salutation_H', sql.TinyInt, Salutation_H);
//                     request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//                     request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//                     request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//                     request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//                     request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//                     request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//                     request.input('DOB', sql.Date, DOB);
//                     request.input('Gender_Id', sql.Char, Gender_Id);
//                     request.input('Mobile_No', sql.VarChar(12), Mobile_No);
                   
//                     request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//                     request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//                     request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//                     request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//                     request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//                     request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//                     request.input('Created_By', sql.VarChar(20), Created_By);
//                     request.input('Created_Date', sql.DateTime, Created_Date);
//                     request.input('Modified_By', sql.VarChar(20), Modified_By);
//                     request.input('Modified_Date', sql.DateTime, Modified_Date);
//                     request.input('Delete_Flag', sql.Char, Delete_Flag);
//                     request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//                     request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

//             request.query(insertQuery, (err, results) => {
//                 if (err) {
//                     console.error('Error inserting into SQL Server: ', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//                 // Handle successful insertion
//                 res.status(200).json({ message: 'Student registered successfully' });
//             });
//         }
//     });
// };








// update
// const registerStudent = async (req, res) => {
//     // Access the request body
//     const {
//         user_id,
//         Registration_Type,
//         Salutation_E,
//         Salutation_H,
//         Student_First_Name_E,
//         Student_Middle_Name_E,
//         Student_Last_Name_E,
//         Student_First_Name_H,
//         Student_Middle_Name_H,
//         Student_Last_Name_H,
//         DOB,
//         Gender_Id,
//         Mobile_No,
//         Email_Id,
//         Father_Name_E,
//         Mother_Name_E,
//         Father_Name_H,
//         Mother_Name_H,
//         Guardian_Name_E,
//         Spouse_Name_E,
//         Created_By,
//         Created_Date,
//         Modified_By,
//         Modified_Date,
//         Delete_Flag,
//         Public_IP_Address,
//         Private_IP_Address
//     } = req.body;

//     // Validate required fields
//     // if (!name || !email || !age || !gender) {
//     //     return res.status(400).json({ error: 'All fields are required' });
//     // }

//     console.log("this id check" + user_id);

//     try {
//         // Create a new request object
//         const request = new sql.Request();

//         // SQL query to check if the user_id exists in the students table
//         const userIdCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE UE_ID = @UE_ID';
//         request.input('UE_ID', sql.VarChar(50), user_id);

//         const userIdCheckResult = await request.query(userIdCheckQuery);

//         // If count is greater than 0, user_id exists
//         if (userIdCheckResult.recordset[0].count > 0) {
//             // User ID exists, update the record
//             const updateQuery = `
//                 UPDATE dbo.student_registration
//                 SET
//                     Registration_Type = @Registration_Type,
//                     Salutation_E = @Salutation_E,
//                     Salutation_H = @Salutation_H,
//                     Student_First_Name_E = @Student_First_Name_E,
//                     Student_Middle_Name_E = @Student_Middle_Name_E,
//                     Student_Last_Name_E = @Student_Last_Name_E,
//                     Student_First_Name_H = @Student_First_Name_H,
//                     Student_Middle_Name_H = @Student_Middle_Name_H,
//                     Student_Last_Name_H = @Student_Last_Name_H,
//                     DOB = @DOB,
//                     Gender_Id = @Gender_Id,
//                     Mobile_No = @Mobile_No,
//                     Email_Id = @Email_Id,
//                     Father_Name_E = @Father_Name_E,
//                     Mother_Name_E = @Mother_Name_E,
//                     Father_Name_H = @Father_Name_H,
//                     Mother_Name_H = @Mother_Name_H,
//                     Guardian_Name_E = @Guardian_Name_E,
//                     Spouse_Name_E = @Spouse_Name_E,
//                     Created_By = @Created_By,
//                     Created_Date = @Created_Date,
//                     Modified_By = @Modified_By,
//                     Modified_Date = @Modified_Date,
//                     Delete_Flag = @Delete_Flag,
//                     Public_IP_Address = @Public_IP_Address,
//                     Private_IP_Address = @Private_IP_Address
//                 WHERE UE_ID = @UE_ID
//             `;

//             request.input('Registration_Type', sql.Char, Registration_Type);
//             request.input('Salutation_E', sql.TinyInt, Salutation_E);
//             request.input('Salutation_H', sql.TinyInt, Salutation_H);
//             request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//             request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//             request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//             request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//             request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//             request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//             request.input('DOB', sql.Date, DOB);
//             request.input('Gender_Id', sql.Char, Gender_Id);
//             request.input('Mobile_No', sql.VarChar(12), Mobile_No);
//             request.input('Email_Id', sql.VarChar(50), Email_Id);
//             request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//             request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//             request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//             request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//             request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//             request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//             request.input('Created_By', sql.VarChar(20), Created_By);
//             request.input('Created_Date', sql.DateTime, Created_Date);
//             request.input('Modified_By', sql.VarChar(20), Modified_By);
//             request.input('Modified_Date', sql.DateTime, Modified_Date);
//             request.input('Delete_Flag', sql.Char, Delete_Flag);
//             request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//             request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

//             await request.query(updateQuery);

//             res.status(200).json({ message: 'Student updated successfully' });
//         } else {
//             // User ID does not exist, insert a new record
//             const insertQuery = `
//                 INSERT INTO dbo.student_registration (
//                     UE_ID,
//                     Registration_Type,
//                     Salutation_E,
//                     Salutation_H,
//                     Student_First_Name_E,
//                     Student_Middle_Name_E,
//                     Student_Last_Name_E,
//                     Student_First_Name_H,
//                     Student_Middle_Name_H,
//                     Student_Last_Name_H,
//                     DOB,
//                     Gender_Id,
//                     Mobile_No,
//                     Email_Id,
//                     Father_Name_E,
//                     Mother_Name_E,
//                     Father_Name_H,
//                     Mother_Name_H,
//                     Guardian_Name_E,
//                     Spouse_Name_E,
//                     Created_By,
//                     Created_Date,
//                     Modified_By,
//                     Modified_Date,
//                     Delete_Flag,
//                     Public_IP_Address,
//                     Private_IP_Address
//                 ) VALUES (
//                     @UE_ID,
//                     @Registration_Type,
//                     @Salutation_E,
//                     @Salutation_H,
//                     @Student_First_Name_E,
//                     @Student_Middle_Name_E,
//                     @Student_Last_Name_E,
//                     @Student_First_Name_H,
//                     @Student_Middle_Name_H,
//                     @Student_Last_Name_H,
//                     @DOB,
//                     @Gender_Id,
//                     @Mobile_No,
//                     @Email_Id,
//                     @Father_Name_E,
//                     @Mother_Name_E,
//                     @Father_Name_H,
//                     @Mother_Name_H,
//                     @Guardian_Name_E,
//                     @Spouse_Name_E,
//                     @Created_By,
//                     @Created_Date,
//                     @Modified_By,
//                     @Modified_Date,
//                     @Delete_Flag,
//                     @Public_IP_Address,
//                     @Private_IP_Address
//                 )
//             `;

//             request.input('UE_ID', sql.VarChar(50), user_id);
//             request.input('Registration_Type', sql.Char, Registration_Type);
//             request.input('Salutation_E', sql.TinyInt, Salutation_E);
//             request.input('Salutation_H', sql.TinyInt, Salutation_H);
//             request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//             request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//             request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//             request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//             request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//             request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//             request.input('DOB', sql.Date, DOB);
//             request.input('Gender_Id', sql.Char, Gender_Id);
//             request.input('Mobile_No', sql.VarChar(12), Mobile_No);
//             request.input('Email_Id', sql.VarChar(50), Email_Id);
//             request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//             request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//             request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//             request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//             request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//             request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//             request.input('Created_By', sql.VarChar(20), Created_By);
//             request.input('Created_Date', sql.DateTime, Created_Date);
//             request.input('Modified_By', sql.VarChar(20), Modified_By);
//             request.input('Modified_Date', sql.DateTime, Modified_Date);
//             request.input('Delete_Flag', sql.Char, Delete_Flag);
//             request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//             request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

//             await request.query(insertQuery);

//             res.status(200).json({ message: 'Student registered successfully' });
//         }
//     } catch (err) {
//         console.error('Error interacting with SQL Server: ', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
 
// for insertion 



// add by anil for registration user 
// const registerStudent = async (req, res) => {
//     // Access the request body
//     const {
//         UE_ID,
//         Registration_Type,
//         Salutation_E,
//         Salutation_H,
//         Student_First_Name_E,
//         Student_Middle_Name_E,
//         Student_Last_Name_E,
//         Student_First_Name_H,
//         Student_Middle_Name_H,
//         Student_Last_Name_H,
//         DOB,
//         Gender_Id,
//         Mobile_No,
//         Email_Id,
//         Father_Name_E,
//         Mother_Name_E,
//         Father_Name_H,
//         Mother_Name_H,
//         Guardian_Name_E,
//         Spouse_Name_E,
//         Created_By,
//         Created_Date,
//         Modified_By,
//         Modified_Date,
//         Delete_Flag,
//         Public_IP_Address,
//         Private_IP_Address    
//     } = req.body;
    
//     // Validate required fields
//     // if (!name || !email || !age || !gender ) {
//     //     return res.status(400).json({ error: 'All fields are required' });
//     // }

//     console.log("this id check "+ UE_ID);
    
//     // Create a new request object
//     const request = new sql.Request();
    
//     // SQL query to check if the email exists in the students table
//     const emailCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE UE_ID = @UE_ID';
//     request.input('UE_ID', sql.VarChar(50), UE_ID);

//     request.query(emailCheckQuery, async (err, result) => {
//         if (err) {
//             console.error('Error checking user_id existence in SQL Server: ', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // If count is greater than 0, email exists
//         if (result.recordset[0].count > 0) {
//             // user_id exists, return an error

//             const updateQuery = `
//                 UPDATE dbo.student_registration
//                 SET
//                     Registration_Type = @Registration_Type,
//                     Salutation_E = @Salutation_E,
//                     Salutation_H = @Salutation_H,
//                     Student_First_Name_E = @Student_First_Name_E,
//                     Student_Middle_Name_E = @Student_Middle_Name_E,
//                     Student_Last_Name_E = @Student_Last_Name_E,
//                     Student_First_Name_H = @Student_First_Name_H,
//                     Student_Middle_Name_H = @Student_Middle_Name_H,
//                     Student_Last_Name_H = @Student_Last_Name_H,
//                     DOB = @DOB,
//                     Gender_Id = @Gender_Id,
//                     Mobile_No = @Mobile_No,
//                     Email_Id = @Email_Id,
//                     Father_Name_E = @Father_Name_E,
//                     Mother_Name_E = @Mother_Name_E,
//                     Father_Name_H = @Father_Name_H,
//                     Mother_Name_H = @Mother_Name_H,
//                     Guardian_Name_E = @Guardian_Name_E,
//                     Spouse_Name_E = @Spouse_Name_E,
//                     Created_By = @Created_By,
//                     Created_Date = @Created_Date,
//                     Modified_By = @Modified_By,
//                     Modified_Date = @Modified_Date,
//                     Delete_Flag = @Delete_Flag,
//                     Public_IP_Address = @Public_IP_Address,
//                     Private_IP_Address = @Private_IP_Address
//                 WHERE UE_ID = @UE_ID
//             `;

//             request.input('Registration_Type', sql.Char, Registration_Type);
//             request.input('Salutation_E', sql.TinyInt, Salutation_E);
//             request.input('Salutation_H', sql.TinyInt, Salutation_H);
//             request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//             request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//             request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//             request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//             request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//             request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//             request.input('DOB', sql.Date, DOB);
//             request.input('Gender_Id', sql.Char, Gender_Id);
//             request.input('Mobile_No', sql.VarChar(12), Mobile_No);
//             request.input('Email_Id', sql.VarChar(50), Email_Id);
//             request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//             request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//             request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//             request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//             request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//             request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//             request.input('Created_By', sql.VarChar(20), Created_By);
//             request.input('Created_Date', sql.DateTime, Created_Date);
//             request.input('Modified_By', sql.VarChar(20), Modified_By);
//             request.input('Modified_Date', sql.DateTime, Modified_Date);
//             request.input('Delete_Flag', sql.Char, Delete_Flag);
//             request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//             request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

//             await request.query(updateQuery);
//             res.status(200).json({ message: 'Student updated successfully' });

//         } else {
//             // Email doesn't exist, proceed with inserting data
            
//             // Insert data into SQL Server
//             const insertQuery = `INSERT INTO dbo.student_registration (
//                     UE_ID,
//                     Registration_Type,
//                     Salutation_E,
//                     Salutation_H,
//                     Student_First_Name_E,
//                     Student_Middle_Name_E,
//                     Student_Last_Name_E,
//                     Student_First_Name_H,
//                     Student_Middle_Name_H,
//                     Student_Last_Name_H,
//                     DOB,
//                     Gender_Id,
//                     Mobile_No,
//                     Email_Id,
//                     Father_Name_E,
//                     Mother_Name_E,
//                     Father_Name_H,
//                     Mother_Name_H,
//                     Guardian_Name_E,
//                     Spouse_Name_E,
//                     Created_By,
//                     Created_Date,
//                     Modified_By,
//                     Modified_Date,
//                     Delete_Flag,
//                     Public_IP_Address,
//                     Private_IP_Address
//                 ) VALUES (
//                     @UE_ID,
//                     @Registration_Type,
//                     @Salutation_E,
//                     @Salutation_H,
//                     @Student_First_Name_E,
//                     @Student_Middle_Name_E,
//                     @Student_Last_Name_E,
//                     @Student_First_Name_H,
//                     @Student_Middle_Name_H,
//                     @Student_Last_Name_H,
//                     @DOB,
//                     @Gender_Id,
//                     @Mobile_No,
//                     @Email_Id,
//                     @Father_Name_E,
//                     @Mother_Name_E,
//                     @Father_Name_H,
//                     @Mother_Name_H,
//                     @Guardian_Name_E,
//                     @Spouse_Name_E,
//                     @Created_By,
//                     @Created_Date,
//                     @Modified_By,
//                     @Modified_Date,
//                     @Delete_Flag,
//                     @Public_IP_Address,
//                     @Private_IP_Address
//                 )`;
//                     request.input('UE_ID', sql.VarChar(50), UE_ID);
//                     request.input('Registration_Type', sql.Char, Registration_Type);
//                     request.input('Salutation_E', sql.TinyInt, Salutation_E);
//                     request.input('Salutation_H', sql.TinyInt, Salutation_H);
//                     request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//                     request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//                     request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//                     request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//                     request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//                     request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//                     request.input('DOB', sql.Date, DOB);
//                     request.input('Gender_Id', sql.Char, Gender_Id);
//                     request.input('Mobile_No', sql.VarChar(12), Mobile_No);
                   
//                     request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//                     request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//                     request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//                     request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//                     request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//                     request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//                     request.input('Created_By', sql.VarChar(20), Created_By);
//                     request.input('Created_Date', sql.DateTime, Created_Date);
//                     request.input('Modified_By', sql.VarChar(20), Modified_By);
//                     request.input('Modified_Date', sql.DateTime, Modified_Date);
//                     request.input('Delete_Flag', sql.Char, Delete_Flag);
//                     request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//                     request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

//             request.query(insertQuery, (err, results) => {
//                 if (err) {
//                     console.error('Error inserting into SQL Server: ', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//                 // Handle successful insertion
//                 res.status(200).json({ message: 'Student registered successfully' });
//             });
//         }
//     });
// };




 
// const registerStudent = async (req, res) => {
//     try {
//         const {
//             UE_ID,
//             Registration_Type,
//             Salutation_E,
//             Salutation_H,
//             Student_First_Name_E,
//             Student_Middle_Name_E,
//             Student_Last_Name_E,
//             Student_First_Name_H,
//             Student_Middle_Name_H,
//             Student_Last_Name_H,
//             DOB,
//             Gender_Id,
//             Mobile_No,
//             Email_Id,
//             Father_Name_E,
//             Mother_Name_E,
//             Father_Name_H,
//             Mother_Name_H,
//             Guardian_Name_E,
//             Spouse_Name_E,
//             Created_By,
//             Created_Date,
//             Modified_By,
//             Modified_Date,
//             Delete_Flag,
//             Private_IP_Address,
//             Public_IP_Address,
//             user_id,
//             username,
//             RegistrationType
//         } = req.body;

//         const request = new sql.Request();

//         // SQL query to check if the UE_ID exists in the students table
//         const checkQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE UE_ID = @UE_ID';
//         request.input('UE_ID', sql.VarChar(50), UE_ID);

//         const checkResult = await request.query(checkQuery);

//         if (checkResult.recordset[0].count > 0) {
//             // UE_ID exists, return an error
//             return res.status(400).json({ error: 'UE_ID already exists' });
//         }

//         // Insert the record if UE_ID does not exist
//         const insertQuery = `INSERT INTO dbo.student_registration (
//             UE_ID,
//             Registration_Type,
//             Salutation_E,
//             Salutation_H,
//             Student_First_Name_E,
//             Student_Middle_Name_E,
//             Student_Last_Name_E,
//             Student_First_Name_H,
//             Student_Middle_Name_H,
//             Student_Last_Name_H,
//             DOB,
//             Gender_Id,
//             Mobile_No,
//             Email_Id,
//             Father_Name_E,
//             Mother_Name_E,
//             Father_Name_H,
//             Mother_Name_H,
//             Guardian_Name_E,
//             Spouse_Name_E,
//             Created_By,
//             Created_Date,
//             Modified_By,
//             Modified_Date,
//             Delete_Flag,
//             Private_IP_Address,
//             Public_IP_Address,
//             user_id,
//             username,
//             RegistrationType
//         ) VALUES (
//             @UE_ID,
//             @Registration_Type,
//             @Salutation_E,
//             @Salutation_H,
//             @Student_First_Name_E,
//             @Student_Middle_Name_E,
//             @Student_Last_Name_E,
//             @Student_First_Name_H,
//             @Student_Middle_Name_H,
//             @Student_Last_Name_H,
//             @DOB,
//             @Gender_Id,
//             @Mobile_No,
//             @Email_Id,
//             @Father_Name_E,
//             @Mother_Name_E,
//             @Father_Name_H,
//             @Mother_Name_H,
//             @Guardian_Name_E,
//             @Spouse_Name_E,
//             @Created_By,
//             @Created_Date,
//             @Modified_By,
//             @Modified_Date,
//             @Delete_Flag,
//             @Private_IP_Address,
//             @Public_IP_Address,
//             @user_id,
//             @username,
//             @RegistrationType
//         )`;

//         request.input('Registration_Type', sql.Char, Registration_Type);
//         request.input('Salutation_E', sql.TinyInt, Salutation_E);
//         request.input('Salutation_H', sql.TinyInt, Salutation_H);
//         request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
//         request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
//         request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
//         request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
//         request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
//         request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
//         request.input('DOB', sql.Date, DOB);
//         request.input('Gender_Id', sql.Char, Gender_Id);
//         request.input('Mobile_No', sql.VarChar(12), Mobile_No);
//         request.input('Email_Id', sql.VarChar(50), Email_Id);
//         request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
//         request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
//         request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
//         request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
//         request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
//         request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
//         request.input('Created_By', sql.VarChar(20), Created_By);
//         request.input('Created_Date', sql.DateTime, Created_Date);
//         request.input('Modified_By', sql.VarChar(20), Modified_By);
//         request.input('Modified_Date', sql.DateTime, Modified_Date);
//         request.input('Delete_Flag', sql.Char, Delete_Flag);
//         request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);
//         request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
//         request.input('user_id', sql.VarChar(50), user_id);
//         request.input('username', sql.VarChar(50), username);
//         request.input('RegistrationType', sql.Char, RegistrationType);

//         await request.query(insertQuery);
//         res.status(200).json({ message: 'Student registered successfully' });

//     } catch (err) {
//         console.error('Error in registerStudent:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

 





const registerStudent = async (req, res) => {
    try {
        const {
            UE_ID,
            Registration_Type,
            Salutation_E,
            Salutation_H,
            Student_First_Name_E,
            Student_Middle_Name_E,
            Student_Last_Name_E,
            Student_First_Name_H,
            Student_Middle_Name_H,
            Student_Last_Name_H,
            DOB,
            Gender_Id,
            Mobile_No,
            Email_Id,
            Father_Name_E,
            Mother_Name_E,
            Father_Name_H,
            Mother_Name_H,
            Guardian_Name_E,
            Spouse_Name_E,
            Created_By,
            Created_Date,
            Modified_By,
            Modified_Date,
            Delete_Flag,
            Public_IP_Address,
            Private_IP_Address    
        } = req.body;

        const request = new sql.Request();

        // Check if the UE_ID already exists
        const emailCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.student_registration WHERE UE_ID = @UE_ID';
        request.input('UE_ID', sql.VarChar(50), UE_ID);
        const emailCheckResult = await request.query(emailCheckQuery);

        if (emailCheckResult.recordset[0].count > 0) {
            // UE_ID exists, update the record
            const updateQuery = `
                UPDATE dbo.student_registration
                SET
                    Registration_Type = @Registration_Type,
                    Salutation_E = @Salutation_E,
                    Salutation_H = @Salutation_H,
                    Student_First_Name_E = @Student_First_Name_E,
                    Student_Middle_Name_E = @Student_Middle_Name_E,
                    Student_Last_Name_E = @Student_Last_Name_E,
                    Student_First_Name_H = @Student_First_Name_H,
                    Student_Middle_Name_H = @Student_Middle_Name_H,
                    Student_Last_Name_H = @Student_Last_Name_H,
                    DOB = @DOB,
                    Gender_Id = @Gender_Id,
                    Mobile_No = @Mobile_No,
                    Email_Id = @Email_Id,
                    Father_Name_E = @Father_Name_E,
                    Mother_Name_E = @Mother_Name_E,
                    Father_Name_H = @Father_Name_H,
                    Mother_Name_H = @Mother_Name_H,
                    Guardian_Name_E = @Guardian_Name_E,
                    Spouse_Name_E = @Spouse_Name_E,
                    Created_By = @Created_By,
                    Created_Date = @Created_Date,
                    Modified_By = @Modified_By,
                    Modified_Date = @Modified_Date,
                    Delete_Flag = @Delete_Flag,
                    Public_IP_Address = @Public_IP_Address,
                    Private_IP_Address = @Private_IP_Address
                WHERE UE_ID = @UE_ID
            `;
            
            request.input('Registration_Type', sql.Char, Registration_Type);
            request.input('Salutation_E', sql.TinyInt, Salutation_E);
            request.input('Salutation_H', sql.TinyInt, Salutation_H);
            request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
            request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
            request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
            request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
            request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
            request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
            request.input('DOB', sql.Date, DOB);
            request.input('Gender_Id', sql.Char, Gender_Id);
            request.input('Mobile_No', sql.VarChar(12), Mobile_No);
            request.input('Email_Id', sql.VarChar(50), Email_Id);
            request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
            request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
            request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
            request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
            request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
            request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
            request.input('Created_By', sql.VarChar(20), Created_By);
            request.input('Created_Date', sql.DateTime, Created_Date);
            request.input('Modified_By', sql.VarChar(20), Modified_By);
            request.input('Modified_Date', sql.DateTime, Modified_Date);
            request.input('Delete_Flag', sql.Char, Delete_Flag);
            request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
            request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

            await request.query(updateQuery);
            res.status(200).json({ message: 'Student updated successfully' });
        } else {
            // UE_ID doesn't exist, insert the record
            const insertQuery = `INSERT INTO dbo.student_registration (
                UE_ID,
                Registration_Type,
                Salutation_E,
                Salutation_H,
                Student_First_Name_E,
                Student_Middle_Name_E,
                Student_Last_Name_E,
                Student_First_Name_H,
                Student_Middle_Name_H,
                Student_Last_Name_H,
                DOB,
                Gender_Id,
                Mobile_No,
                Email_Id,
                Father_Name_E,
                Mother_Name_E,
                Father_Name_H,
                Mother_Name_H,
                Guardian_Name_E,
                Spouse_Name_E,
                Created_By,
                Created_Date,
                Modified_By,
                Modified_Date,
                Delete_Flag,
                Public_IP_Address,
                Private_IP_Address
            ) VALUES (
                @UE_ID,
                @Registration_Type,
                @Salutation_E,
                @Salutation_H,
                @Student_First_Name_E,
                @Student_Middle_Name_E,
                @Student_Last_Name_E,
                @Student_First_Name_H,
                @Student_Middle_Name_H,
                @Student_Last_Name_H,
                @DOB,
                @Gender_Id,
                @Mobile_No,
                @Email_Id,
                @Father_Name_E,
                @Mother_Name_E,
                @Father_Name_H,
                @Mother_Name_H,
                @Guardian_Name_E,
                @Spouse_Name_E,
                @Created_By,
                @Created_Date,
                @Modified_By,
                @Modified_Date,
                @Delete_Flag,
                @Public_IP_Address,
                @Private_IP_Address
            )`;

            request.input('Registration_Type', sql.Char, Registration_Type);
            request.input('Salutation_E', sql.TinyInt, Salutation_E);
            request.input('Salutation_H', sql.TinyInt, Salutation_H);
            request.input('Student_First_Name_E', sql.VarChar(50), Student_First_Name_E);
            request.input('Student_Middle_Name_E', sql.VarChar(50), Student_Middle_Name_E);
            request.input('Student_Last_Name_E', sql.VarChar(50), Student_Last_Name_E);
            request.input('Student_First_Name_H', sql.VarChar(50), Student_First_Name_H);
            request.input('Student_Middle_Name_H', sql.VarChar(50), Student_Middle_Name_H);
            request.input('Student_Last_Name_H', sql.VarChar(50), Student_Last_Name_H);
            request.input('DOB', sql.Date, DOB);
            request.input('Gender_Id', sql.Char, Gender_Id);
            request.input('Mobile_No', sql.VarChar(12), Mobile_No);
            request.input('Email_Id', sql.VarChar(50), Email_Id);
            request.input('Father_Name_E', sql.VarChar(50), Father_Name_E);
            request.input('Mother_Name_E', sql.VarChar(50), Mother_Name_E);
            request.input('Father_Name_H', sql.VarChar(50), Father_Name_H);
            request.input('Mother_Name_H', sql.VarChar(50), Mother_Name_H);
            request.input('Guardian_Name_E', sql.VarChar(50), Guardian_Name_E);
            request.input('Spouse_Name_E', sql.VarChar(50), Spouse_Name_E);
            request.input('Created_By', sql.VarChar(20), Created_By);
            request.input('Created_Date', sql.DateTime, Created_Date);
            request.input('Modified_By', sql.VarChar(20), Modified_By);
            request.input('Modified_Date', sql.DateTime, Modified_Date);
            request.input('Delete_Flag', sql.Char, Delete_Flag);
            request.input('Public_IP_Address', sql.VarChar(20), Public_IP_Address);
            request.input('Private_IP_Address', sql.VarChar(20), Private_IP_Address);

            await request.query(insertQuery);
            res.status(200).json({ message: 'Student registered successfully' });
        }
    } catch (err) {
        console.error('Error in registerStudent:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};










// this api retun join data
const getstudentdetails = async (req, res) => {
    const eid = req.body.eid; // Assuming 'eid' is a field in the request body
    console.log(eid);

    try {
        var request = new sql.Request();
        request.input('eid', sql.VarChar, eid); // Adjust the SQL data type as necessary

        var query = 'SELECT * FROM dbo.student_registration WHERE UE_ID = @eid';

        // Execute the SQL query
        request.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.json(result.recordset);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unexpected server error' });
    }
};


const getAllApplications = async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect();
        const request = pool.request();

        // Query to get all records from VacancyApplication table
        const query = `
            SELECT 
                Vacancy_ID, 
                Company_ID, 
                Company_Name,
                Student_ID, 
                Full_Name, 
                Post_Name, 
                Fathers_Name, 
                Email, 
                Mobile, 
                Status, 
                Application_Submission_Date 
            FROM 
                VacancyApplication`;

        const result = await request.query(query);

        // Check if any records were found
        if (result.recordset.length > 0) {
            // Respond with the records
            res.status(200).json(result.recordset);
        } else {
            // Respond with a message if no records are found
            res.status(404).json({ message: 'No applications found' });
        }
    } catch (err) {
        // Handle any errors
        console.error('Error fetching applications: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// post api for apply Next Round 
const NextRoutdDetails = async (req, res) => {
    const {
        Vacancy_ID,
        Company_ID,
        Company_Name,
        Student_ID,
        Full_Name,
        Job_Title,
        Fathers_Name,
        Email,
        Mobile,
        Status,
        Application_Submission_Date
    } = req.body;

    try {
        // Connect to the database using the exported sql object
        const pool = await sql.connect();
        const request = pool.request(); // Create a request object from the pool

        // Check if the Vacancy_ID already exists
        const checkQuery = `
            SELECT COUNT(*) as count 
            FROM VacancyApplication 
            WHERE Vacancy_ID = @Vacancy_ID AND Student_ID = @Student_ID`;

        // Bind the inputs
        request.input('Vacancy_ID', sql.NVarChar(50), Vacancy_ID);
        request.input('Student_ID', sql.NVarChar(50), Student_ID);

        const result = await request.query(checkQuery);
        const count = result.recordset[0].count;

        if (count > 0) {
            // Vacancy_ID already exists for the given Student_ID, return a response indicating that the form is already submitted
            return res.status(400).json({ message: 'Form already submitted for this vacancy.' });
        }

        // Insert new student application details
        const insertQuery = `
            INSERT INTO VacancyApplication 
                (Vacancy_ID, Company_ID, Company_Name, Student_ID, Full_Name, Post_Name, Fathers_Name, Email, Mobile, Status, Application_Submission_Date)
            VALUES 
                (@Vacancy_ID, @Company_ID, @Company_Name, @Student_ID, @Full_Name, @Post_Name, @Fathers_Name, @Email, @Mobile, @Status, @Application_Submission_Date)`;

        // Bind the remaining values
        request.input('Company_ID', sql.NVarChar(50), Company_ID);
        request.input('Company_Name', sql.VarChar(50), Company_Name);
        request.input('Full_Name', sql.NVarChar(100), Full_Name);
        request.input('Post_Name', sql.NVarChar(100), Job_Title);
        request.input('Fathers_Name', sql.NVarChar(100), Fathers_Name);
        request.input('Email', sql.NVarChar(100), Email);
        request.input('Mobile', sql.NVarChar(13), Mobile);
        request.input('Status', sql.NVarChar(20), Status);

        // Convert and bind the date value
        const formattedDate = new Date(Application_Submission_Date);
        request.input('Application_Submission_Date', sql.Date, formattedDate);

        await request.query(insertQuery);

        // Respond with success message
        res.status(200).json({ message: 'Student application details inserted successfully' });
    } catch (err) {
        console.error('Error inserting student application details: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// add by anil 29-05-2024
const uploadfile = async (req, res) => {
    const file = req.file;
    const { name, email } = req.body;
  
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
    if (!name || !email) {
      return res.status(400).send('Name and email are required.');
    }
  
    // Store file metadata and user information in the database
    const query = `
      INSERT INTO Users (name, email, photoOriginalName, photoMimeType, photoDestination, photoFileName, photoPath, photoSize)
      VALUES (@name, @email, @photoOriginalName, @photoMimeType, @photoDestination, @photoFileName, @photoPath, @photoSize)
    `;
  
    try {
        var request = new sql.Request();
      request.input('name', sql.VarChar, name);
      request.input('email', sql.VarChar, email);
      request.input('photoOriginalName', sql.VarChar, file.originalname);
      request.input('photoMimeType', sql.VarChar, file.mimetype);
      request.input('photoDestination', sql.VarChar, file.destination);
      request.input('photoFileName', sql.VarChar, file.filename);
      request.input('photoPath', sql.VarChar, file.path);
      request.input('photoSize', sql.BigInt, file.size);
  
      await request.query(query);
    //   const photoPath = file.path; 
      const photoPath = file.path; 
      res.status(200).json({ message: 'User data and file uploaded successfully.', photoPath: photoPath});
    } catch (err) {
      console.error('Error inserting data: ', err);
      res.status(500).send('Server error.');
    }
  };


// added by roshni
//  master table api start
//function to fetched data from gender 
const getGender = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.gender;`;
        
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.error('Error executing the query:', err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching Gender details: ', error);   
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//function to fetched data from degree_program table
const getDegree_program = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.degree_program;`;
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.error('Error executing the query: ', err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //Send the fetched records as JSON response 
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching Degree program details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//function to fetched data from degree_type table
const getDegree_type = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.degree_type;`;
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });
    } catch (error) {
        console.error('Error fetching degree type details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//function to fetched data from subjects 
const getSubjects = async(req, res)=>{
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.subjects;`
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.log(error);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });
    } catch (error) {
        console.error('Error fetching subjects details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// added master api 


// function to fetched data from salutation_e table 
const getSalutation_English = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.salutation_e;`;
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response 
            res.status(200).json(result.recordset);
            //res.status(200).json({ message: 'Salutatione details' });
        });
    } catch (error) {
        console.error('Error fetching salutation details', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// function to fetched data from salutation_h table 
const getSalutation_Hindi = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.salutation_h';
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error executing the query' });
                return; // Stop further execution
            }
            
            // Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching salutationh details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//function to fetch data from registration type table
const getRegistrationType = async (req, res) => {
    try {
        const request = new sql.Request();
        const query = 'SELECT * FROM dbo.registration_type';

        request.query(query, (err, result) => {
            if (err) {
                console.error('Error executing the query: ', err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            // Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching Registrationtype details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//function to fetch data from admission year table
const Admissionyear = async (req, res) => {
    try {
        const request = new sql.Request();
        const query = 'SELECT * FROM dbo.admission_session';

        request.query(query, (err, result) => {
            if (err) {
                console.error('Error executing the query: ', err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //Send the fetched record as JSON response 
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching Admission year details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });

    } 
};


//get api //added by roshni 
//function to fetch data from college table 
const College = async (req, res) => {
    try {
        // Create a new SQL request
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.college';

        // Execute the query using await
        const result = await request.query(selectQuery);

        // Send the fetched record as JSON response
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error executing the query: ', err);
        res.status(500).json({ error: 'Error executing the query' });
    }
};

//function to fetch data from passing out year table
const PassingOutYear = async (req, res) => {
    try {
        // Create a new SQL request
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.passing_out_year';

        // Execute the query using await
        const result = await request.query(selectQuery);

        // Send the fetched record as JSON response
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error executing the query: ', err);
        res.status(500).json({ error: 'Error executing the query' });
    }
};

//  master table api end

//post api/added by roshni 

const SkillDetails = async (req, res) => {
    const {
      Student_ID,
      Registration_No,
      Skill_Id,
      Skill_Certificate_Url 
    } = req.body;
  
    try {
      // Create a new connection
      var request = new sql.Request();
        request.input('Student_ID', sql.VarChar(50), Student_ID)
        request.input('Registration_No', sql.VarChar(50), Registration_No)
        request.input('Skill_Id', sql.Int, Skill_Id)
        request.input('Skill_Certificate_Url', sql.VarChar(1000), Skill_Certificate_Url )
       // request.input('Created_Date', sql.Date, Created_Date)
        const result = await request.query(`
          INSERT INTO tnp_student_skills (Student_ID, Registration_No, Skill_Id, Skill_Certificate_Url)
          VALUES (@Student_ID, @Registration_No, @Skill_Id, @Skill_Certificate_Url);
        `);

     // Check if any rows were affected
    if (result.rowsAffected[0] > 0) {
        return res.status(200).json({ message: 'Skill details submitted successfully!' });
      } else {
        return res.status(500).json({ message: 'Failed to submit skill details' });
      }
    } catch (error) {
      console.error('Error inserting skill details:', error);
      return res.status(500).json({ message: 'Failed to submit skill details', error });
    } 
  };
//skill certificate url can pass the empty value 
 

  const ExperienceDetails = async (req, res) => {
    const {
      Student_ID,
      Registration_No,
      Organization_Name,
      Post_Name,
      WorkPlace_Address,
      WorkPlace_District_Id,
      WorkPlace_State_Id,
      WorkPlace_Country_Id,
      City_Name,
      Description,
      Period_From,
      Period_To,
      Is_Currently_working_YN,
      Salary
    } = req.body;
  
    try {
      // Create a new connection
      var request = new sql.Request();
        request.input('Student_ID', sql.VarChar(50), Student_ID)
        request.input('Registration_No', sql.NVarChar(20), Registration_No)
        request.input('Organization_Name', sql.VarChar(20), Organization_Name)
        request.input('Post_Name', sql.VarChar(100), Post_Name)
        request.input('WorkPlace_Address', sql.VarChar(250), WorkPlace_Address)
        request.input('WorkPlace_District_Id', sql.SmallInt, WorkPlace_District_Id)
        request.input('WorkPlace_State_Id', sql.SmallInt, WorkPlace_State_Id)
        request.input('WorkPlace_Country_Id', sql.VarChar(50), WorkPlace_Country_Id)
        request.input('City_Name', sql.VarChar(50), City_Name)
        request.input('Description', sql.VarChar(250), Description)
        request.input('Period_From', sql.Date, Period_From)
        request.input('Period_To', sql.Date, Period_To)
        request.input('Is_Currently_working_YN', sql.Char(1), Is_Currently_working_YN)
        request.input('Salary', sql.Decimal(10,2), Salary)
       // request.input('Created_Date', sql.DateTime, Created_Date)
        const result = await request.query(`
          INSERT INTO tnp_student_experience (
            Student_ID,
            Registration_No,
            Organization_Name,
            Post_Name,
            WorkPlace_Address,
            WorkPlace_District_Id,
            WorkPlace_State_Id,
            WorkPlace_Country_Id,
            City_Name,
            Description,
            Period_From,
            Period_To,
            Is_Currently_working_YN,
            Salary
          ) VALUES (
            @Student_ID,
            @Registration_No,
            @Organization_Name,
            @Post_Name,
            @WorkPlace_Address,
            @WorkPlace_District_Id,
            @WorkPlace_State_Id,
            @WorkPlace_Country_Id,
            @City_Name,
            @Description,
            @Period_From,
            @Period_To,
            @Is_Currently_working_YN,
            @Salary
          );
        `);
  
      // Check if any rows were affected
      if (result.rowsAffected[0] > 0) {
        return res.status(200).json({ message: 'Experience details submitted successfully!' });
      } else {
        return res.status(500).json({ message: 'Failed to submit experience details' });
      }
    } catch (error) {
      console.error('Error inserting experience details:', error);
      return res.status(500).json({ message: 'Failed to submit experience details', error });
    } 
  };

  
  
  const AcademicDetails = async (req, res) => {
    const {
      Student_ID,
      Registration_No,
      Student_Enroll_Id,
      Degree_Programme_Type_Id,
      Degree_programme_Id,
      College_Name,
      Subject_Id,
      OGPA,
      Marksheet_Url,
      Admission_Year_Id,
      Passingout_Year_Id
      //Created_Date
    } = req.body;
  
    try {
      // Create a new connection
      var request = new sql.Request();
      request.input('Student_ID', sql.VarChar(50), Student_ID)
      request.input('Registration_No', sql.VarChar(50), Registration_No)
      request.input('Student_Enroll_Id', sql.VarChar(1), Student_Enroll_Id)
      request.input('Degree_Programme_Type_Id', sql.TinyInt, Degree_Programme_Type_Id)
      request.input('Degree_programme_Id', sql.SmallInt, Degree_programme_Id)
      request.input('College_Name', sql.VarChar(50), College_Name)
      request.input('Subject_Id', sql.SmallInt, Subject_Id)
      request.input('OGPA', sql.Float, OGPA)
      request.input('Marksheet_Url', sql.VarChar(1000), Marksheet_Url)
      request.input('Admission_Year_Id', sql.SmallInt, Admission_Year_Id)
      request.input('Passingout_Year_Id', sql.SmallInt, Passingout_Year_Id)
     // request.input('Created_Date', sql.DateTime, Created_Date)
      const result = await request.query(`
          INSERT INTO tnp_student_academic_details_array (
            Student_ID,
            Registration_No,
            Student_Enroll_Id,
            Degree_Programme_Type_Id,
            Degree_programme_Id,
            College_Name,
            Subject_Id,
            OGPA,
            Marksheet_Url,
            Admission_Year_Id,
            Passingout_Year_Id
           
          ) VALUES (
            @Student_ID,
            @Registration_No,
            @Student_Enroll_Id,
            @Degree_Programme_Type_Id,
            @Degree_programme_Id,
            @College_Name,
            @Subject_Id,
            @OGPA,
            @Marksheet_Url,
            @Admission_Year_Id,
            @Passingout_Year_Id
         
          );
        `);
  
      // Check if any rows were affected
      if (result.rowsAffected[0] > 0) {
        return res.status(200).json({ message: 'Academic details submitted successfully!' });
      } else {
        return res.status(500).json({ message: 'Failed to submit academic details' });
      }
    } catch (error) {
      console.error('Error inserting academic details:', error);
      return res.status(500).json({ message: 'Failed to submit academic details', error });
    }
  };
 //Degree programme Id can pass the null value  

//function to fetch data from skill details table 
    const getSkill = async (req, res) => {
        try {
            const request = new sql.Request();
            const query = 'SELECT * FROM dbo.tnp_student_skills';

            request.query(query, (err, result) => {
                if (err) {
                    console.error('Error executing the query: ', err);
                    res.status(500).json({ error: 'Error executing the query' });
                    return;
                }
                //Send the fetched record as JSON response 
                res.status(200).json(result.recordset);
            });

        } catch (error) {
            console.error('Error fetching skills details: ', error);
            res.status(500).json({ error: 'Internal Server Error' });

       } 
    };

    const getSkills = async (req, res) => {
        const { eid } = req.body;
        if (!eid) {
            return res.status(400).json({ error: 'eid is required' });
        }
        try {
            const request = new sql.Request();
            request.input('eid', sql.VarChar(50), eid);
    
            const query = 'SELECT * FROM dbo.tnp_student_skills WHERE Student_ID = @eid';
            console.log('Executing query:', query, 'with eid:', eid);
            const result = await request.query(query);
            if (result.recordset.length > 0) {
                res.json(result.recordset);  // Send the entire recordset
            } else {
                return res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            console.error('Error checking existence in SQL Server: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    

//function to fetch data from experience details table
    const getExperience = async (req, res) => {
        try {
            const request = new sql.Request();
            const query = 'SELECT * FROM dbo.tnp_student_experience';

            request.query(query, (err, result) => {
                if (err) {
                    console.error('Error executing the query: ', err);
                    res.status(500).json({ error: 'Error executing the query' });
                    return;
                }
                //Send the fetched records as JSON response
                res.status(200).json(result.recordset);
            });
        
        } catch (error) {
            console.error( 'Error fetching experience details: ', error);
            res.status(500).json({ error: 'Internal Server Error' });

        }
    };

    const getExperienceId = async (req, res) => {
        const { eid } = req.body;
    
        if (!eid) {
            return res.status(400).json({ error: 'eid is required' });
        }
    
        try {
            const request = new sql.Request();
            request.input('eid', sql.VarChar(50), eid);
    
            const query = 'SELECT * FROM dbo.tnp_student_experience WHERE Student_ID = @eid';
            console.log('Executing query:', query, 'with eid:', eid);
    
            const result = await request.query(query);
            if (result.recordset.length > 0) {
                res.json(result.recordset);
            } else {
                return res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            console.error('Error checking existence in SQL Server: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
   
//function to fetch data from academic details table 
const getAcademic = async (req, res) => {
    try {
        const request = new sql.Request();
        const query = 'SELECT * FROM dbo.tnp_student_academic_details_array';

        request.query(query, (err, result) => {
            if (err) {
                console.error('Error executing the query: ', err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //Send the fetched records as JSON response
            res.status(200).json(result.recordset);
        });
    
    } catch (error) {
        console.error( 'Error fetching experience details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};


const getAcademicId = async (req, res) => {
    const { eid } = req.body;

    if (!eid) {
        return res.status(400).json({ error: 'eid is required' });
    }

    try {
        const request = new sql.Request();
        request.input('eid', sql.VarChar(50), eid);

        const query = 'SELECT * FROM dbo.tnp_student_academic_details_array WHERE Student_ID = @eid';
        console.log('Executing query:', query, 'with eid:', eid);

        const result = await request.query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset); // This will return an array of records
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error checking existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//get api for nextround form 








//end 


// get id address 
function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceKey in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceKey];
    for (const address of networkInterface) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '127.0.0.1'; // Default to localhost if no external IP found
}

console.log('Local IP Address:', getLocalIpAddress());



function getPrivateIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceKey in networkInterfaces) {
      const networkInterface = networkInterfaces[interfaceKey];
      for (const address of networkInterface) {
        if (address.family === 'IPv6' && !address.internal) {
          return address.address;
        }
      }
    }
    return null; // Return null if no private IP found
  }
  
  // Example usage
  console.log('Private IP Address:', getPrivateIpAddress());
          
module.exports ={
    getAllStudents,
    registerStudent,
    Signup,
    login,
    getStudents,
    Profile,
    getbasicdetails,
    postbasicdetails,
    VacancyApply,
    getVacancyApplyStudentDetails,
    VacancyApplicationStudentDetail,
    getstudentdetails,
    uploadfile,
    // for master table
    getGender,
    getSubjects,
    getDegree_type,
    getDegree_program,
    getSalutation_English,
    getSalutation_Hindi,
    getRegistrationType,
    captcha,
    //
    SkillDetails,
    ExperienceDetails,
    AcademicDetails,
    Admissionyear,

    getSkill,
    getExperience,
    getAcademic,

    getSkills,
    getExperienceId,
    getAcademicId,

    College,
    PassingOutYear,

    NextRoutdDetails,
    getAllApplications


}
