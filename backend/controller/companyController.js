// controller.js
const Student = require('../model/studentModel');
const bcrypt = require('bcrypt');
const sql = require('../config/db');


 
const { getGender, getSalutation_English, getSalutation_Hindi } = require('./studentController');





// API endpoint to insert vacancy
// const addVacancy = async (req, res) => {
//     try {
//         const pool = await sql.connect(); // Connect to the database using the exported sql object
//         const request = pool.request(); // Create a request object from the pool
//         const {
//             Vacancy_ID,
//             Company_Id,
//             Company_Registration_No,
//             Job_Title,
//             Job_Description,
//             Job_Selection,
//             Job_Location,
//             No_Of_Post,
//             Salary,
//             Last_Date_for_apply,
//             Min_Experience_in_Year,
//             Maximum_Age,
//             Preferred_Gender,
//             Prefered_Language,
//             Status,
//             Created_By,
//             Created_Date,
//             Modified_By,
//             Modified_Date,
//             Delete_Flag,
//             Public_IP_Address,
//             Private_IP_Address
//         } = req.body;

// console.log('Vacancy_ID:', Vacancy_ID);
// console.log('Company_Id:', Company_Id);
// console.log('Company_Registration_No:', Company_Registration_No);
// console.log('Job_Title:', Job_Title);
// console.log('Job_Description:', Job_Description);
// console.log('Job_Selection:', Job_Selection);
// console.log('Job_Location:', Job_Location);
// console.log('No_Of_Post:', No_Of_Post);
// console.log('Salary:', Salary);
// console.log('Last_Date_for_apply:', Last_Date_for_apply);
// console.log('Min_Experience_in_Year:', Min_Experience_in_Year);
// console.log('Maximum_Age:', Maximum_Age);
// console.log('Preferred_Gender:', Preferred_Gender);
// console.log('Prefered_Language:', Prefered_Language);
// console.log('Status:', Status);
// console.log('Created_By:', Created_By);
// console.log('Created_Date:', Created_Date);
// console.log('Modified_By:', Modified_By);
// console.log('Modified_Date:', Modified_Date);
// console.log('Delete_Flag:', Delete_Flag);
// console.log('Public_IP_Address:', Public_IP_Address);
// console.log('Private_IP_Address:', Private_IP_Address);





//         const result = await request
//             .input('Vacancy_ID', sql.VarChar, Vacancy_ID)
//             .input('Company_Id', sql.VarChar, Company_Id)
//             .input('Company_Registration_No', sql.VarChar, Company_Registration_No)
//             .input('Job_Title', sql.VarChar, Job_Title)
//             .input('Job_Description', sql.VarChar, Job_Description)
//             .input('Job_Selection', sql.VarChar, Job_Selection)
//             .input('Job_Location', sql.VarChar, Job_Location)
//             .input('No_Of_Post', sql.Int, No_Of_Post)
//             .input('Salary', sql.VarChar, Salary)
//             .input('Last_Date_for_apply', sql.Date, Last_Date_for_apply)
//             .input('Min_Experience_in_Year', sql.Int, Min_Experience_in_Year)
//             .input('Maximum_Age', sql.Int, Maximum_Age)
//             .input('Preferred_Gender', sql.VarChar, Preferred_Gender)
//             .input('Prefered_Language', sql.VarChar, Prefered_Language)
//             .input('Status', sql.VarChar, Status)
//             .input('Created_By', sql.VarChar, Created_By)
//             .input('Created_Date', sql.DateTime, Created_Date)
//             .input('Modified_By', sql.VarChar, Modified_By)
//             .input('Modified_Date', sql.DateTime, Modified_Date)
//             .input('Delete_Flag', sql.VarChar, Delete_Flag)
//             .input('Public_IP_Address', sql.VarChar, Public_IP_Address)
//             .input('Private_IP_Address', sql.VarChar, Private_IP_Address)
//             .query(`
//                 INSERT INTO tnp_vacancy_details (Vacancy_ID, Company_Id, Company_Registration_No, Job_Title, Job_Description, Job_Selection, Job_Location, No_Of_Post, Salary, Last_Date_for_apply, Min_Experience_in_Year, Maximum_Age, Preferred_Gender, Prefered_Language, Status, Created_By, Created_Date, Modified_By, Modified_Date, Delete_Flag, Public_IP_Address, Private_IP_Address)
//                 VALUES (@Vacancy_ID, @Company_Id, @Company_Registration_No, @Job_Title, @Job_Description, @Job_Selection, @Job_Location, @No_Of_Post, @Salary, @Last_Date_for_apply, @Min_Experience_in_Year, @Maximum_Age, @Preferred_Gender, @Prefered_Language, @Status, @Created_By, @Created_Date, @Modified_By, @Modified_Date, @Delete_Flag, @Public_IP_Address, @Private_IP_Address)
//             `);

//         res.status(201).send({ message: 'Vacancy added successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Error adding vacancy', error: err.message });
//     }
// };




// roshni add on 
// Function to generate a unique Vacancy ID based on an employee number or similar identifier


function generatevid(empNum, Company_Id) {
    if (empNum === null || empNum === undefined) {
        console.error("empNum is null or undefined");
        return null; 
    }

    // Assuming empNum is already numeric and formatted correctly
    const paddedEmpNum = (parseInt(empNum, 10) + 1).toString().padStart(2, '0');
    const vid = Company_Id + 'VAC' + paddedEmpNum;
    return vid;
}

const addVacancy = async (req, res) => {
    try {
        const pool = await sql.connect(); // Connect to the database
        const request = pool.request(); // Create a request object

        const {
            Company_Id,
            Company_Name,
            Company_Registration_No,
            Job_Title,
            Job_Description,
            Job_Selection,
            Job_Location,
            No_Of_Post,
            Salary,
            Last_Date_for_apply,
            Min_Experience_in_Year,
            Maximum_Age,
            Preferred_Gender,
            Prefered_Language,
            Status,
            Created_By,
            Created_Date,
            Modified_By,
            Modified_Date,
            Delete_Flag,
            Public_IP_Address,
            Private_IP_Address
        } = req.body;

        // Retrieve the highest existing Vacancy_ID
        const result = await request
            .input('Company_Id', sql.NVarChar, Company_Id)
            .query(`
                SELECT MAX(Vacancy_ID) AS HighestVacancyID
                FROM tnp_vacancy_details
                WHERE Company_Id = @Company_Id
            `);

        const highestVacancyID = result.recordset[0].HighestVacancyID;
        const empNum = highestVacancyID ? highestVacancyID.slice(-2) : '00'; // Extract the numeric part
        const Vacancy_ID = generatevid(empNum, Company_Id);

        console.log('Generated Vacancy_ID:', Vacancy_ID);

        // Insert a new vacancy record with unique parameter names
        await request
            .input('NewVacancy_ID', sql.NVarChar, Vacancy_ID) // Changed parameter name here
            // .input('Company_Id', sql.NVarChar, Company_Id)
            .input('Company_Name', sql.VarChar, Company_Name)
            .input('Company_Registration_No', sql.VarChar, Company_Registration_No)
            .input('Job_Title', sql.VarChar, Job_Title)
            .input('Job_Description', sql.VarChar, Job_Description)
            .input('Job_Selection', sql.VarChar, Job_Selection)
            .input('Job_Location', sql.VarChar, Job_Location)
            .input('No_Of_Post', sql.Int, No_Of_Post)
            .input('Salary', sql.VarChar, Salary)
            .input('Last_Date_for_apply', sql.Date, Last_Date_for_apply)
            .input('Min_Experience_in_Year', sql.Int, Min_Experience_in_Year)
            .input('Maximum_Age', sql.Int, Maximum_Age)
            .input('Preferred_Gender', sql.VarChar, Preferred_Gender)
            .input('Prefered_Language', sql.VarChar, Prefered_Language)
            .input('Status', sql.VarChar, Status)
            .input('Created_By', sql.VarChar, Created_By)
            .input('Created_Date', sql.DateTime, Created_Date)
            .input('Modified_By', sql.VarChar, Modified_By)
            .input('Modified_Date', sql.DateTime, Modified_Date)
            .input('Delete_Flag', sql.VarChar, Delete_Flag)
            .input('Public_IP_Address', sql.VarChar, Public_IP_Address)
            .input('Private_IP_Address', sql.VarChar, Private_IP_Address)
            .query(`
                INSERT INTO tnp_vacancy_details (Vacancy_ID, Company_Id, Company_Name, Company_Registration_No, Job_Title, Job_Description, Job_Selection, Job_Location, No_Of_Post, Salary, Last_Date_for_apply, Min_Experience_in_Year, Maximum_Age, Preferred_Gender, Prefered_Language, Status, Created_By, Created_Date, Modified_By, Modified_Date, Delete_Flag, Public_IP_Address, Private_IP_Address)
                VALUES (@NewVacancy_ID, @Company_Id, @Company_Name, @Company_Registration_No, @Job_Title, @Job_Description, @Job_Selection, @Job_Location, @No_Of_Post, @Salary, @Last_Date_for_apply, @Min_Experience_in_Year, @Maximum_Age, @Preferred_Gender, @Prefered_Language, @Status, @Created_By, @Created_Date, @Modified_By, @Modified_Date, @Delete_Flag, @Public_IP_Address, @Private_IP_Address)
            `);

        res.status(201).send({ message: 'Vacancy added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error processing vacancy', error: err.message });
    }
};


// roshni add on 




 




// const addVacancy = async (req, res) => {
//     try {
//         const pool = await sql.connect(); // Connect to the database using the exported sql object
//         const request = pool.request(); // Create a request object from the pool
//         const {
//             Vacancy_ID,
//             Company_Id,
//             Company_Name,
//             Company_Registration_No,
//             Job_Title,
//             Job_Description,
//             Job_Selection,
//             Job_Location,
//             No_Of_Post,
//             Salary,
//             Last_Date_for_apply,
//             Min_Experience_in_Year,
//             Maximum_Age,
//             Preferred_Gender,
//             Prefered_Language,
//             Status,
//             Created_By,
//             Created_Date,
//             Modified_By,
//             Modified_Date,
//             Delete_Flag,
//             Public_IP_Address,
//             Private_IP_Address
//         } = req.body;

//         // Log the input data for debugging
//         console.log('Vacancy_ID:', Vacancy_ID);
//         console.log('Company_Id:', Company_Id);
//         console.log('Company_Name:', Company_Name);
//         console.log('Company_Registration_No:', Company_Registration_No);
//         console.log('Job_Title:', Job_Title);
//         console.log('Job_Description:', Job_Description);
//         console.log('Job_Selection:', Job_Selection);
//         console.log('Job_Location:', Job_Location);
//         console.log('No_Of_Post:', No_Of_Post);
//         console.log('Salary:', Salary);
//         console.log('Last_Date_for_apply:', Last_Date_for_apply);
//         console.log('Min_Experience_in_Year:', Min_Experience_in_Year);
//         console.log('Maximum_Age:', Maximum_Age);
//         console.log('Preferred_Gender:', Preferred_Gender);
//         console.log('Prefered_Language:', Prefered_Language);
//         console.log('Status:', Status);
//         console.log('Created_By:', Created_By);
//         console.log('Created_Date:', Created_Date);
//         console.log('Modified_By:', Modified_By);
//         console.log('Modified_Date:', Modified_Date);
//         console.log('Delete_Flag:', Delete_Flag);
//         console.log('Public_IP_Address:', Public_IP_Address);
//         console.log('Private_IP_Address:', Private_IP_Address);

//         // Check if the vacancy exists
//         const checkVacancy = await request
//             .input('Vacancy_ID', sql.VarChar, Vacancy_ID)
//             .query('SELECT COUNT(*) AS count FROM tnp_vacancy_details WHERE Vacancy_ID = @Vacancy_ID');

//         if (checkVacancy.recordset[0].count > 0) {
           
//             res.status(200).send({ message: 'Vacancy already successfully' });
//         } else {
//             // Vacancy does not exist, so insert a new record
//             await request
//                 .input('Company_Id', sql.VarChar, Company_Id)
//                 .input('Company_Name', sql.VarChar,  Company_Name)
//                 .input('Company_Registration_No', sql.VarChar, Company_Registration_No)
//                 .input('Job_Title', sql.VarChar, Job_Title)
//                 .input('Job_Description', sql.VarChar, Job_Description)
//                 .input('Job_Selection', sql.VarChar, Job_Selection)
//                 .input('Job_Location', sql.VarChar, Job_Location)
//                 .input('No_Of_Post', sql.Int, No_Of_Post)
//                 .input('Salary', sql.VarChar, Salary)
//                 .input('Last_Date_for_apply', sql.Date, Last_Date_for_apply)
//                 .input('Min_Experience_in_Year', sql.Int, Min_Experience_in_Year)
//                 .input('Maximum_Age', sql.Int, Maximum_Age)
//                 .input('Preferred_Gender', sql.VarChar, Preferred_Gender)
//                 .input('Prefered_Language', sql.VarChar, Prefered_Language)
//                 .input('Status', sql.VarChar, Status) 
//                 .input('Created_By', sql.VarChar, Created_By)
//                 .input('Created_Date', sql.DateTime, Created_Date)
//                 .input('Modified_By', sql.VarChar, Modified_By)
//                 .input('Modified_Date', sql.DateTime, Modified_Date)
//                 .input('Delete_Flag', sql.VarChar, Delete_Flag)
//                 .input('Public_IP_Address', sql.VarChar, Public_IP_Address)
//                 .input('Private_IP_Address', sql.VarChar, Private_IP_Address)
//                 .query(`
//                     INSERT INTO tnp_vacancy_details (Vacancy_ID, Company_Id, Company_Name, Company_Registration_No, Job_Title, Job_Description, Job_Selection, Job_Location, No_Of_Post, Salary, Last_Date_for_apply, Min_Experience_in_Year, Maximum_Age, Preferred_Gender, Prefered_Language, Status, Created_By, Created_Date, Modified_By, Modified_Date, Delete_Flag, Public_IP_Address, Private_IP_Address)
//                     VALUES (@Vacancy_ID, @Company_Id, @Company_Name, @Company_Registration_No, @Job_Title, @Job_Description, @Job_Selection, @Job_Location, @No_Of_Post, @Salary, @Last_Date_for_apply, @Min_Experience_in_Year, @Maximum_Age, @Preferred_Gender, @Prefered_Language, @Status, @Created_By, @Created_Date, @Modified_By, @Modified_Date, @Delete_Flag, @Public_IP_Address, @Private_IP_Address)
//                 `);

//             res.status(201).send({ message: 'Vacancy added successfully' } );
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Error processing vacancy', error: err.message });
//     }
// };

//this post api for vacancy details can not work properly show the error message 




// get data for update vacancy deails
const Updatejobdataget = async (req, res) => {
    const { Vacancy_ID } = req.body;

    // vid = 10
    // if (!eid) {
    //     return res.status(400).json({ error: 'eid is required' });
    // }
    try {
        const request = new sql.Request();
        request.input('Vacancy_ID', sql.VarChar(50), Vacancy_ID);
        const query = 'SELECT * FROM dbo.tnp_vacancy_details WHERE Vacancy_ID = @Vacancy_ID';
        console.log('Executing query:', query, 'with eid:', Vacancy_ID);
        const result = await request.query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            return res.status(404).json({ error: 'vacancy not found' });
        }
    } catch (error) {
        console.error('Error checking existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


//
// const UpdateNextjobdataget = async (req, res) => {
//     const { Vacancy_ID } = req.body;

//     if (!Vacancy_ID) {
//         return res.status(400).json({ error: 'Vacancy_ID is required' });
//     }

//     try {
//         const pool = await sql.connect(/* your database config */);
//         const request = pool.request();
//         request.input('Vacancy_ID', sql.VarChar(50), Vacancy_ID);

//         const query = 'SELECT * FROM dbo.tnp_vacancy_details WHERE Vacancy_ID = @Vacancy_ID';
//         console.log('Executing query:', query, 'with Vacancy_ID:', Vacancy_ID);

//         const result = await request.query(query);

//         if (result.recordset.length > 0) {
//             res.json(result.recordset[0]);
//         } else {
//             return res.status(404).json({ error: 'vacancy not found' });
//         }
//     } catch (error) {
//         console.error('Error checking existence in SQL Server: ', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const getdata_All_Company_id = async (req, res) => {
    const { Company_Id } = req.body;
    // Company_Id = "COM04"
        // vid = 10
    // if (!eid) {
    //     return res.status(400).json({ error: 'eid is required' });
    // }
    try {
        const request = new sql.Request();
        request.input('Company_Id', sql.VarChar(50), Company_Id);
        const query = 'SELECT * FROM dbo.tnp_vacancy_details WHERE Company_Id = @Company_Id';
        // const query = 'SELECT * FROM dbo.tnp_vacancy_details WHERE Company_Id = @Company_Id';
        
        console.log('Executing query:', query, 'with eid:', Company_Id);
        const result = await request.query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            return res.status(404).json({ error: 'vacancy not found' });
        }
    } catch (error) {
        console.error('Error checking existence in SQL Server: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// for update vacancy
const updateJob = async (req, res) => {
    try {
        const pool = await sql.connect(); // Connect to the database using the exported sql object
        const request = pool.request(); // Create a request object from the pool
        const {
            Vacancy_ID,
            Company_Id,
            Company_Name,
            Company_Registration_No,
            Job_Title,
            Job_Description,
            Job_Selection,
            Job_Location,
            No_Of_Post,
            Salary,
            Last_Date_for_apply,
            Min_Experience_in_Year,
            Maximum_Age,
            Preferred_Gender,
            Prefered_Language,
            Status,
            Created_By,
            Created_Date,
            Modified_By,
            Modified_Date,
            Delete_Flag,
            Public_IP_Address,
            Private_IP_Address
        } = req.body;



        console.log('Vacancy_ID:', Vacancy_ID);
        console.log('Company_Id:', Company_Id);
        console.log('Company_Name:', Company_Name);
        console.log('Company_Registration_No:', Company_Registration_No);
        console.log('Job_Title:', Job_Title);
        console.log('Job_Description:', Job_Description);
        console.log('Job_Selection:', Job_Selection);
        console.log('Job_Location:', Job_Location);
        console.log('No_Of_Post:', No_Of_Post);
        console.log('Salary:', Salary);
        console.log('Last_Date_for_apply:', Last_Date_for_apply);
        console.log('Min_Experience_in_Year:', Min_Experience_in_Year);
        console.log('Maximum_Age:', Maximum_Age);
        console.log('Preferred_Gender:', Preferred_Gender);
        console.log('Prefered_Language:', Prefered_Language);
        console.log('Status:', Status);
        console.log('Created_By:', Created_By);
        console.log('Created_Date:', Created_Date);
        console.log('Modified_By:', Modified_By);
        console.log('Modified_Date:', Modified_Date);
        console.log('Delete_Flag:', Delete_Flag);
        console.log('Public_IP_Address:', Public_IP_Address);
        console.log('Private_IP_Address:', Private_IP_Address);

        const result = await request
            .input('Vacancy_ID', sql.VarChar, Vacancy_ID)
            .input('Company_Id', sql.VarChar, Company_Id)
            .input('Company_Name', sql.VarChar, Company_Name)
            .input('Company_Registration_No', sql.VarChar, Company_Registration_No)
            .input('Job_Title', sql.VarChar, Job_Title)
            .input('Job_Description', sql.VarChar, Job_Description)
            .input('Job_Selection', sql.VarChar, Job_Selection)
            .input('Job_Location', sql.VarChar, Job_Location)
            .input('No_Of_Post', sql.Int, No_Of_Post)
            .input('Salary', sql.VarChar, Salary)
            .input('Last_Date_for_apply', sql.Date, Last_Date_for_apply)
            .input('Min_Experience_in_Year', sql.Int, Min_Experience_in_Year)
            .input('Maximum_Age', sql.Int, Maximum_Age)
            .input('Preferred_Gender', sql.VarChar, Preferred_Gender)
            .input('Prefered_Language', sql.VarChar, Prefered_Language)
            .input('Status', sql.VarChar, Status)
            .input('Created_By', sql.VarChar, Created_By)
            .input('Created_Date', sql.DateTime, Created_Date)
            .input('Modified_By', sql.VarChar, Modified_By)
            .input('Modified_Date', sql.DateTime, Modified_Date)
            .input('Delete_Flag', sql.VarChar, Delete_Flag)
            .input('Public_IP_Address', sql.VarChar, Public_IP_Address)
            .input('Private_IP_Address', sql.VarChar, Private_IP_Address)
            .query(`
                UPDATE tnp_vacancy_details 
                SET 
                    Company_Id = @Company_Id,
                    Company_Name = @Company_Name,
                    Company_Registration_No = @Company_Registration_No,
                    Job_Title = @Job_Title,
                    Job_Description = @Job_Description,
                    Job_Selection = @Job_Selection,
                    Job_Location = @Job_Location,
                    No_Of_Post = @No_Of_Post,
                    Salary = @Salary,
                    Last_Date_for_apply = @Last_Date_for_apply,
                    Min_Experience_in_Year = @Min_Experience_in_Year,
                    Maximum_Age = @Maximum_Age,
                    Preferred_Gender = @Preferred_Gender,
                    Prefered_Language = @Prefered_Language,
                    Status = @Status,
                    Created_By = @Created_By,
                    Created_Date = @Created_Date,
                    Modified_By = @Modified_By,
                    Modified_Date = @Modified_Date,
                    Delete_Flag = @Delete_Flag,
                    Public_IP_Address = @Public_IP_Address,
                    Private_IP_Address = @Private_IP_Address
                WHERE Vacancy_ID = @Vacancy_ID
            `);

        res.status(200).send({ message: 'Vacancy updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating vacancy', error: err.message });
    }
};





// API endpoint to get all vacancies
const getVacanciesDetils = async (req, res) => {
    try {
        const pool = await sql.connect(); // Connect to the database using the exported sql object
        const request = pool.request(); // Create a request object from the pool

        const result = await request.query('SELECT * FROM tnp_vacancy_details WHERE Status = \'Approved\''); // Execute the query
        // const result = await request.query('SELECT * FROM tnp_vacancy_details where Status = "Aproved'); // Execute the query

        res.status(200).send(result.recordset); // Send the result back to the client
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error fetching vacancies', error: err.message });
    }
};










//  jwt token use 
const login = async (req, res) => {
    const { username , password,role } = req.body;

    console.log(username,password,role);

    try {
        const request = new sql.Request();
        // const usernameCheckQuery = 'SELECT id, Emp_Id, username, password FROM dbo.login_table WHERE username = @username';
  
        const usernameCheckQuery = `
        SELECT l.id, l.Emp_Id, l.username, l.password,l.role s.*
        FROM dbo.login_table AS l
        FULL JOIN student_registration AS s ON l.Emp_Id = s.UE_ID
        WHERE l.role = @role`;
        
        request.input('username', sql.VarChar, username);
        request.input('password', sql.VarChar, password);  
        request.input('role', sql.Int, role);  

        const result = await request.query(usernameCheckQuery);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            // Compare the passwords
            if (user.password === password) {
                // Password matches, return success along with username and id
                return res.status(200).json({ 
                    id: user.id, 
                    username: user.username, 
                    eid: user.Emp_Id, 
                    fname: user.Student_First_Name_E, 
                    mname: user.Student_Middle_Name_E, 
                    lname: user.Student_Last_Name_E, 
                    mno: user.Mobile_No, 
                    email: user.Email_Id, 
                    dob: user.DOB, 
                    message: 'Username login successful' 
                    // message:user.Emp_Id,
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
    const empId = 'igkv' + paddedEmpNum;
    return empId;
}


const Signup = async (req, res) => {
    // Access the request body
    const { username, password } = req.body;
    console.log("Data=>", username, password );


    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error('Error hashing password: ', hashErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("pass=>", hashedPassword);
    });
    

     
    // Validate required fields
    if (!username || !password  ) {
        return res.status(400).json({ error: 'All fields are required' });
    }


    const request = new sql.Request();
    const usernameCheckQuery = 'SELECT COUNT(*) AS count FROM dbo.login_table WHERE username = @username';
    
    request.input('username', sql.VarChar, username);

    request.query(usernameCheckQuery, (err, result) => {
        if (err) {
            console.error('Error checking Username existence in SQL Server: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // If count is greater than 0, username exists
        if (result.recordset[0].count > 0) {
            // Username exists, return an error
            return res.status(400).json({ error: 'Username already exists' });
        } else {

           // Retrieve the maximum id from login_table
            const query = `SELECT MAX(id) AS max_emp_id FROM dbo.login_table`;

            request.query(query, (err, result) => {
                if (err) {
                    console.error('Error retrieving largest id: ', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // console.log('Query Result:', result); // Log the result object
    
                const maxEmpId = result.recordset[0].max_emp_id;
                console.log("Max Employee ID:", maxEmpId);

                const maxId = result.recordset[0].max_id || 1;
                console.log("Max ID:", maxId);

                // // Generate employee ID using maxId
                const empId = generateEmpId(maxId + maxEmpId);
                console.log("Generated Emp Id:", empId);
             


                // Insert user into the database
                const insertQuery = 'INSERT INTO dbo.login_table (username, password, Emp_Id) VALUES (@username, @password, @Emp_Id)';
                
                request.input('password', sql.VarChar, password);
                request.input('Emp_Id', sql.VarChar, empId);

                request.query(insertQuery, (err, results) => {
                    if (err) {
                        console.error('Error inserting into SQL Server: ', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    // Handle successful insertion
                    res.status(200).json({empId:empId,  message: 'User registered successfully' });
                });
            });
        }
    });
};

// const getAllCompany = async(req, res)=>{
//     var request = new sql.Request();
//     var query = "SELECT * FROM dbo.company_registration";

//     // Execute the SQL query
//     request.query(query, function(err, records) {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Error executing the query' });
//             return;
//         }
//         // Send the fetched records as JSON response
//         res.json(records.recordset);
//     });
// }



const getAllCompany = async (req, res) => {
    var request = new sql.Request();
    var query = "SELECT * FROM dbo.company_registration";
  
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

 
 
// Function to register a company
// const registerCompany = async (req, res) => {
//     const {
//         Company_Id,
//         Company_Registration_No,
//         Tnp_Registration_No,
//         Company_Name,
//         Company_Type,
//         Company_Category,
//         Company_Email,
//         Company_Phone_Number,
//         Hr_Name,
//         Hr_Contact_No,
//         Hr_Email,
//         Contact_Person,
//         Contact_Person_Email,
//         Contact_Person_Phone,
//         Company_Short_Name,
//         Address,
//         State,
//         District,
//         Block,
//         Company_Profile,
//         Website,
//         Created_Date,
//         Company_Logo_Url,
//         Company_Logo,
//         Company_Broucher,
//         Company_Other_Doc_Url

//     } = req.body;
//     // Validate required fields
//     if (!Company_Id || !Company_Name || !Company_Email) {
//         return res.status(400).json({ error: 'Required fields are missing' });
//     }

//     try {
//         const request = new sql.Request();

//         const insertQuery = `
//             INSERT INTO dbo.company_registration (
//                 Company_Id,
//                 Company_Registration_No,
//                 Tnp_Registration_No,
//                 Company_Name,
//                 Company_Type,
//                 Company_Category,
//                 Company_Email,
//                 Company_Phone_Number,
//                 Hr_Name,
//                 Hr_Contact_No,
//                 Hr_Email,
//                 Contact_Person,
//                 Contact_Person_Email,
//                 Contact_Person_Phone,
//                 Company_Short_Name,
//                 Address,
//                 State,
//                 District,
//                 Block,
//                 Company_Profile,
//                 Website,
//                 Company_Logo_Url,
//                 Company_Logo,
//                 Company_Broucher,
//                 Company_Other_Doc_Url,
//                 Created_Date
//             ) VALUES (
//                 @Company_Id,
//                 @Company_Registration_No,
//                 @Tnp_Registration_No,
//                 @Company_Name,
//                 @Company_Type,
//                 @Company_Category,
//                 @Company_Email,
//                 @Company_Phone_Number,
//                 @Hr_Name,
//                 @Hr_Contact_No,
//                 @Hr_Email,
//                 @Contact_Person,
//                 @Contact_Person_Email,
//                 @Contact_Person_Phone,
//                 @Company_Short_Name,
//                 @Address,
//                 @State,
//                 @District,
//                 @Block,
//                 @Company_Profile,
//                 @Website,
//                 @Company_Logo_Url,
//                 @Company_Logo,
//                 @Company_Broucher,
//                 @Company_Other_Doc_Url,
//                 @Created_Date
//             )
//         `;

//         request.input('Company_Id', sql.VarChar(99), Company_Id);
//         request.input('Company_Registration_No', sql.VarChar(50), Company_Registration_No);
//         request.input('Tnp_Registration_No', sql.VarChar(50), Tnp_Registration_No);
//         request.input('Company_Name', sql.VarChar(50), Company_Name);
//         request.input('Company_Type', sql.SmallInt, Company_Type);
//         request.input('Company_Category', sql.SmallInt, Company_Category);
//         request.input('Company_Email', sql.VarChar(50), Company_Email);
//         request.input('Company_Phone_Number', sql.VarChar(20), Company_Phone_Number);
//         request.input('Hr_Name', sql.VarChar(30), Hr_Name);
//         request.input('Hr_Contact_No', sql.VarChar(30), Hr_Contact_No);
//         request.input('Hr_Email', sql.VarChar(50), Hr_Email);
//         request.input('Contact_Person', sql.VarChar(50), Contact_Person);
//         request.input('Contact_Person_Email', sql.VarChar(50), Contact_Person_Email);
//         request.input('Contact_Person_Phone', sql.VarChar(12), Contact_Person_Phone);
//         request.input('Company_Short_Name', sql.VarChar(20), Company_Short_Name);
//         request.input('Address', sql.VarChar(100), Address);
//         request.input('State', sql.SmallInt, State);
//         request.input('District', sql.SmallInt, District);
//         request.input('Block', sql.SmallInt, Block);
//         request.input('Company_Profile', sql.VarChar(1000), Company_Profile);
//         request.input('Website', sql.VarChar(5000), Website);
//         request.input('Company_Logo_Url', sql.VarChar(6000), Company_Logo_Url);
//         request.input('Company_Logo', sql.VarChar(500), Company_Logo);
//         request.input('Company_Broucher', sql.VarChar(500), Company_Broucher);
//         request.input('Company_Other_Doc_Url', sql.VarChar(500), Company_Other_Doc_Url);
//         // request.input('Created_Date', sql.DateTime, Created_Date || new Date());
//         request.input('Created_Date', sql.DateTime, new Date().toISOString());

//         await request.query(insertQuery);

//         res.status(200).json({ message: 'Company registered successfully' });
//     } catch (err) {
//         console.error('Error inserting into SQL Server: ', err);
//         res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
// };

const registerCompany = async (req, res) => {
    const {
        Company_Id,
        Company_Registration_No,
        Tnp_Registration_No,
        Company_Name,
        Company_Type,
        Company_Category,
        Company_Email,
        Company_Phone_Number,
        Hr_Name,
        Hr_Contact_No,
        Hr_Email,
        Contact_Person,
        Contact_Person_Email,
        Contact_Person_Phone,
        Company_Short_Name,
        Address,
        State,
        District,
        Block,
        Company_Profile,
        Website,
        Created_Date,
        Company_Logo_Url,
        Company_Logo,
        Company_Broucher,
        Company_Other_Doc_Url
    } = req.body;

    // Validate required fields
    if (!Company_Id || !Company_Name || !Company_Email) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const request = new sql.Request();

        // Check if the company already exists
        const checkQuery = `
            SELECT COUNT(*) AS count
            FROM dbo.company_registration
            WHERE Company_Id = @Company_Id
        `;
        request.input('Company_Id', sql.VarChar(99), Company_Id);
        const result = await request.query(checkQuery);

        const companyExists = result.recordset[0].count > 0;

        let query;
        if (companyExists) {
            // Update existing company
            query = `
                UPDATE dbo.company_registration
                SET
                    Company_Registration_No = @Company_Registration_No,
                    Tnp_Registration_No = @Tnp_Registration_No,
                    Company_Name = @Company_Name,
                    Company_Type = @Company_Type,
                    Company_Category = @Company_Category,
                    Company_Email = @Company_Email,
                    Company_Phone_Number = @Company_Phone_Number,
                    Hr_Name = @Hr_Name,
                    Hr_Contact_No = @Hr_Contact_No,
                    Hr_Email = @Hr_Email,
                    Contact_Person = @Contact_Person,
                    Contact_Person_Email = @Contact_Person_Email,
                    Contact_Person_Phone = @Contact_Person_Phone,
                    Company_Short_Name = @Company_Short_Name,
                    Address = @Address,
                    State = @State,
                    District = @District,
                    Block = @Block,
                    Company_Profile = @Company_Profile,
                    Website = @Website,
                    Company_Logo_Url = @Company_Logo_Url,
                    Company_Logo = @Company_Logo,
                    Company_Broucher = @Company_Broucher,
                    Company_Other_Doc_Url = @Company_Other_Doc_Url,
                    Created_Date = @Created_Date
                WHERE
                    Company_Id = @Company_Id
            `;
        } else {
            // Insert new company
            query = `
                INSERT INTO dbo.company_registration (
                    Company_Id,
                    Company_Registration_No,
                    Tnp_Registration_No,
                    Company_Name,
                    Company_Type,
                    Company_Category,
                    Company_Email,
                    Company_Phone_Number,
                    Hr_Name,
                    Hr_Contact_No,
                    Hr_Email,
                    Contact_Person,
                    Contact_Person_Email,
                    Contact_Person_Phone,
                    Company_Short_Name,
                    Address,
                    State,
                    District,
                    Block,
                    Company_Profile,
                    Website,
                    Company_Logo_Url,
                    Company_Logo,
                    Company_Broucher,
                    Company_Other_Doc_Url,
                    Created_Date
                ) VALUES (
                    @Company_Id,
                    @Company_Registration_No,
                    @Tnp_Registration_No,
                    @Company_Name,
                    @Company_Type,
                    @Company_Category,
                    @Company_Email,
                    @Company_Phone_Number,
                    @Hr_Name,
                    @Hr_Contact_No,
                    @Hr_Email,
                    @Contact_Person,
                    @Contact_Person_Email,
                    @Contact_Person_Phone,
                    @Company_Short_Name,
                    @Address,
                    @State,
                    @District,
                    @Block,
                    @Company_Profile,
                    @Website,
                    @Company_Logo_Url,
                    @Company_Logo,
                    @Company_Broucher,
                    @Company_Other_Doc_Url,
                    @Created_Date
                )
            `;
        }

        // Set query parameters
        request.input('Company_Registration_No', sql.VarChar(50), Company_Registration_No);
        request.input('Tnp_Registration_No', sql.VarChar(50), Tnp_Registration_No);
        request.input('Company_Name', sql.VarChar(50), Company_Name);
        request.input('Company_Type', sql.SmallInt, Company_Type);
        request.input('Company_Category', sql.SmallInt, Company_Category);
        request.input('Company_Email', sql.VarChar(50), Company_Email);
        request.input('Company_Phone_Number', sql.VarChar(20), Company_Phone_Number);
        request.input('Hr_Name', sql.VarChar(30), Hr_Name);
        request.input('Hr_Contact_No', sql.VarChar(30), Hr_Contact_No);
        request.input('Hr_Email', sql.VarChar(50), Hr_Email);
        request.input('Contact_Person', sql.VarChar(50), Contact_Person);
        request.input('Contact_Person_Email', sql.VarChar(50), Contact_Person_Email);
        request.input('Contact_Person_Phone', sql.VarChar(12), Contact_Person_Phone);
        request.input('Company_Short_Name', sql.VarChar(20), Company_Short_Name);
        request.input('Address', sql.VarChar(100), Address);
        request.input('State', sql.SmallInt, State);
        request.input('District', sql.SmallInt, District);
        request.input('Block', sql.SmallInt, Block);
        request.input('Company_Profile', sql.VarChar(1000), Company_Profile);
        request.input('Website', sql.VarChar(5000), Website);
        request.input('Company_Logo_Url', sql.VarChar(6000), Company_Logo_Url);
        request.input('Company_Logo', sql.VarChar(500), Company_Logo);
        request.input('Company_Broucher', sql.VarChar(500), Company_Broucher);
        request.input('Company_Other_Doc_Url', sql.VarChar(500), Company_Other_Doc_Url);
        request.input('Created_Date', sql.DateTime, new Date().toISOString());

        await request.query(query);

        res.status(200).json({ message: companyExists ? 'Company updated successfully' : 'Company registered successfully' });
    } catch (err) {
        console.error('Error inserting/updating in SQL Server: ', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};





const getcompanyinformation = async (req, res) => {
    const { cid } = req.body;
    // const cid = "COM07"
    console.log(cid);
    try {
        const request = new sql.Request();
        request.input('cid', sql.VarChar(50), cid);

        const query = 'SELECT * FROM dbo.company_registration WHERE Company_Id = @cid';
        console.log('Executing query:', query, 'with eid:', cid);
        const result = await request.query(query);
        // console.log(result)
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



const getCompany_category = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = `SELECT * FROM dbo.company_category;`;
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
        console.error('Error fetching company category details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCompany_Type = async (req, res) => {
    try {
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.company_type';
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
        console.error('Error fetching company type details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getstate = async(req, res)=> {
    try {
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.state';
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //send the fetched records as JSON response 
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching state details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getdistrict = async (req, res)=> {
    try {
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.district';
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //Send the fetched records as JSON response 
            res.status(200).json(result.recordset);

        });

    } catch (error) {
        console.error('Error district details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const getblock = async (req, res)=> {
    try {
        const request = new sql.Request();
        const selectQuery = 'SELECT * FROM dbo.block';
        request.query(selectQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error executing the query' });
                return;
            }
            //Send the fetched records as JSON response 
            res.status(200).json(result.recordset);
        });

    } catch (error) {
        console.error('Error fetching block details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}





 



// post api for file upload
const fileupload = async (req, res) => {

    const {
        Company_ID
    } = req.body;

    // console.log(Post_Name);

    const file = req.file; // Get the file from the request
    const Resume_Path = file.filename
    // console.log(file);
    // console.log(file);
    console.log("im",file.filename);
    try {
        const pool = await sql.connect();  
        const request = pool.request();  


        // Insert new student application details
        const insertQuery = `
            INSERT INTO fileuploads 
                (Company_ID, Resume_Path)
            VALUES 
                (@Company_ID, @Resume_Path)`;

        // Bind the remaining values
        request.input('Company_ID', sql.NVarChar(50), Company_ID);
        request.input('Resume_Path', sql.NVarChar(2000), Resume_Path);
    

        await request.query(insertQuery);

        // Respond with success message
        res.status(200).json({ message: 'Uploading successfully' });
    } catch (err) {
        console.error('Error inserting student photos details: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getfiles = async (req, res) => {
    try {
        const pool = await sql.connect();  
        const request = pool.request();  

        const query = 'SELECT * FROM fileuploads';
        const result = await request.query(query);

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching file paths: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





 
const totalcompany = async (req, res)=>{

    try {
        const pool = await sql.connect();
        const query = 'select * from '
        const result = await request.query()
        
    } catch (error) {
        console.error('Error Fetchin File Path:',error)
        
    }
}






// for files uploads 
const postCompanyfiles = async (req, res) => {
    const {
        Company_Id,
        Created_Date,
        Company_Logo_Url,
        Company_Logo,
        Company_Broucher, 
        Company_Other_Doc_Url
    } = req.body;

    // Validate required fields
    if (!Company_Id) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const request = new sql.Request();

        // Check if the company already exists
        const checkQuery = `
            SELECT COUNT(*) AS count
            FROM dbo.Companiesfiles
            WHERE Company_Id = @Company_Id
        `;
        request.input('Company_Id', sql.Int, Company_Id);
        const result = await request.query(checkQuery);

        const companyExists = result.recordset[0].count > 0;

        let query;
        if (companyExists) {
            // Update existing company
            query = `
                UPDATE dbo.Companiesfiles
                SET
                    Company_Logo_Url = @Company_Logo_Url,
                    Company_Logo = @Company_Logo,
                    Company_Broucher = @Company_Broucher, 
                    Company_Other_Doc_Url = @Company_Other_Doc_Url,
                    Created_Date = @Created_Date
                WHERE
                    Company_Id = @Company_Id
            `;
        } else {
            // Insert new company
            query = `
                INSERT INTO dbo.Companiesfiles (
                    Company_Logo_Url,
                    Company_Logo,
                    Company_Broucher,  
                    Company_Other_Doc_Url,
                    Created_Date
                ) VALUES (
                    @Company_Logo_Url,
                    @Company_Logo,
                    @Company_Broucher, 
                    @Company_Other_Doc_Url,
                    @Created_Date
                )
            `;
        }

        // Set query parameters
        request.input('Company_Logo_Url', sql.NVarChar(6000), Company_Logo_Url);
        request.input('Company_Logo', sql.NVarChar(6000), Company_Logo);
        request.input('Company_Broucher',sql.NVarChar(6000), Company_Broucher);  
        request.input('Company_Other_Doc_Url', sql.NVarChar(255), Company_Other_Doc_Url);
        request.input('Created_Date', sql.DateTime, new Date().toISOString());

        await request.query(query);

        res.status(200).json({ message: companyExists ? 'Uploading successfully Done' : 'Company registered successfully' });
    } catch (err) {
        console.error('Error inserting/updating in SQL Server: ', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};



const getCompanyfiles = async (req, res) => {
    const { cid } = req.body;
    console.log(cid);
    try {
        const request = new sql.Request();
        request.input('cid', sql.VarChar(50), cid);

        const query = 'SELECT * FROM dbo.Companiesfiles WHERE Company_Id = @cid';
        console.log('Executing query:', query, 'with eid:', cid);
        const result = await request.query(query);
        // console.log(result)
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

// for files uploads 









          
module.exports ={
    Signup,
    login,
    
    addVacancy,
    Updatejobdataget,
    updateJob,
    getVacanciesDetils,
    getdata_All_Company_id,
    getAllCompany ,
    registerCompany,
    getcompanyinformation,
    
    getstate,
    getCompany_Type,
    getCompany_category,
    getdistrict,
    getblock,


    //UpdateNextjobdataget


    fileupload,
    getfiles,
    postCompanyfiles,
    getCompanyfiles,

    
}
// all tnp_vacancy_details table not working beacause the main post api not working 