// controller.js
const express = require('express');
const Student = require('../model/studentModel');
const bcrypt = require('bcrypt');
const sql = require('../config/db');
// const cors = require('cors');

// get ip
const os = require('os');
// end

// const app = express();
// app.use(cors());

// // for admin api 
// const getVacancyApply = async (req, res) => {
//   try {
//       const pool = await sql.connect();
//       const request = pool.request();
//       const query = `SELECT * FROM tnp_student_application_details`;
//       const result = await request.query(query);
//       const records = result.recordset;
      
//       // Respond with the fetched records
//       res.status(200).json(records);
//   } catch (error) {
//       console.error('Error fetching student application details:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// add on 22 august 
const getVacancyApply = async (req, res) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        const query = `SELECT * FROM tnp_student_application_details`;
        const result = await request.query(query);
        const records = result.recordset;
        
        // Respond with the fetched records
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching student application details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// for admin api 
// const StudentList = async (req, res) => {
//   try {
//     const id = req.body.Company_ID;
//       const pool = await sql.connect();
//       const request = pool.request();
//       const query = `SELECT * FROM tnp_student_application_details WHERE Company_ID = @id`;
//       const result = await request.query(query);
//       const records = result.recordset;
      
//       // Respond with the fetched records
//       res.status(200).json(records);
//   } catch (error) {
//       console.error('Error fetching student application details:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



//for all students applications
const Student_application_List = async (req, res) => {
    const { Company_Id } = req.body;
    // Company_Id = "COM04"
    // vid = 10
    // if (!eid) {
    //     return res.status(400).json({ error: 'eid is required' });
    // }
    console.log("com id ",Company_Id)
    try {
        const request = new sql.Request();
        request.input('Company_Id', sql.VarChar(50), Company_Id);
        const query = 'SELECT * FROM dbo.tnp_student_application_details WHERE Company_Id = @Company_Id';
       
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








// for short list
const getshortlist = async (req, res) => {
  try {
      const pool = await sql.connect();
      const request = pool.request();
      const query = `SELECT * FROM tnp_student_application_details WHERE Status = 'Short Listed'`;
      const result = await request.query(query);
      const records = result.recordset;
      
      // Respond with the fetched records
      res.status(200).json(records);
  } catch (error) {
      console.error('Error fetching student application details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// for getReject
const getReject = async (req, res) => {
  try {
      const pool = await sql.connect();
      const request = pool.request();
      const query = `SELECT * FROM tnp_student_application_details WHERE Status = 'Not Seleted'`;
      const result = await request.query(query);
      const records = result.recordset;
      
      // Respond with the fetched records
      res.status(200).json(records);
  } catch (error) {
      console.error('Error fetching student application details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// for getselected 
const getSelected = async (req, res) => {
    try {
      const pool = await sql.connect();
      const request = pool.request();
  
      // Query to fetch selected records
      const query = `SELECT * FROM tnp_student_application_details WHERE Status = 'Selected'`;
      const result = await request.query(query);
      const records = result.recordset;

      // Query to fetch count of selected records
      const countQuery = `SELECT COUNT(*) AS SelectedCount FROM tnp_student_application_details WHERE Status = 'Selected'`;
      const countResult = await request.query(countQuery);
      const selectedCount = countResult.recordset[0].SelectedCount;
  
      // Respond with both records and selectedCount
      res.status(200).json(records );
    } catch (error) {
      console.error('Error fetching student application details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  









// for update student application details 
// const update_by_adminVacancyApply = async(req, res)=>{
//   try {
//       const pool = await sql.connect(); // Connect to the database using the exported sql object
//       const request = pool.request(); // Create a request object from the pool
//       const {
//           Vacancy_ID,
//           Company_Id,
//           Company_Registration_No,
//           Job_Title,
//           Job_Description,
//           Job_Selection,
//           Job_Location,
//           No_Of_Post,
//           Salary,
//           Last_Date_for_apply,
//           Min_Experience_in_Year,
//           Maximum_Age,
//           Preferred_Gender,
//           Prefered_Language,
//           Status,
//           Created_By,
//           Created_Date,
//           Modified_By,
//           Modified_Date,
//           Delete_Flag,
//           Public_IP_Address,
//           Private_IP_Address
//       } = req.body;



//       console.log('Vacancy_ID:', Vacancy_ID);
//       console.log('Company_Id:', Company_Id);
//       console.log('Company_Registration_No:', Company_Registration_No);
//       console.log('Job_Title:', Job_Title);
//       console.log('Job_Description:', Job_Description);
//       console.log('Job_Selection:', Job_Selection);
//       console.log('Job_Location:', Job_Location);
//       console.log('No_Of_Post:', No_Of_Post);
//       console.log('Salary:', Salary);
//       console.log('Last_Date_for_apply:', Last_Date_for_apply);
//       console.log('Min_Experience_in_Year:', Min_Experience_in_Year);
//       console.log('Maximum_Age:', Maximum_Age);
//       console.log('Preferred_Gender:', Preferred_Gender);
//       console.log('Prefered_Language:', Prefered_Language);
//       console.log('Status:', Status);
//       console.log('Created_By:', Created_By);
//       console.log('Created_Date:', Created_Date);
//       console.log('Modified_By:', Modified_By);
//       console.log('Modified_Date:', Modified_Date);
//       console.log('Delete_Flag:', Delete_Flag);
//       console.log('Public_IP_Address:', Public_IP_Address);
//       console.log('Private_IP_Address:', Private_IP_Address);

//       const result = await request
//           .input('Vacancy_ID', sql.VarChar, Vacancy_ID)
//           .input('Company_Id', sql.VarChar, Company_Id)
//           .input('Company_Registration_No', sql.VarChar, Company_Registration_No)
//           .input('Job_Title', sql.VarChar, Job_Title)
//           .input('Job_Description', sql.VarChar, Job_Description)
//           .input('Job_Selection', sql.VarChar, Job_Selection)
//           .input('Job_Location', sql.VarChar, Job_Location)
//           .input('No_Of_Post', sql.Int, No_Of_Post)
//           .input('Salary', sql.VarChar, Salary)
//           .input('Last_Date_for_apply', sql.Date, Last_Date_for_apply)
//           .input('Min_Experience_in_Year', sql.Int, Min_Experience_in_Year)
//           .input('Maximum_Age', sql.Int, Maximum_Age)
//           .input('Preferred_Gender', sql.VarChar, Preferred_Gender)
//           .input('Prefered_Language', sql.VarChar, Prefered_Language)
//           .input('Status', sql.VarChar, Status)
//           .input('Created_By', sql.VarChar, Created_By)
//           .input('Created_Date', sql.DateTime, Created_Date)
//           .input('Modified_By', sql.VarChar, Modified_By)
//           .input('Modified_Date', sql.DateTime, Modified_Date)
//           .input('Delete_Flag', sql.VarChar, Delete_Flag)
//           .input('Public_IP_Address', sql.VarChar, Public_IP_Address)
//           .input('Private_IP_Address', sql.VarChar, Private_IP_Address)
//           .query(`
//               UPDATE tnp_vacancy_details 
//               SET 
//                   Company_Id = @Company_Id,
//                   Company_Registration_No = @Company_Registration_No,
//                   Job_Title = @Job_Title,
//                   Job_Description = @Job_Description,
//                   Job_Selection = @Job_Selection,
//                   Job_Location = @Job_Location,
//                   No_Of_Post = @No_Of_Post,
//                   Salary = @Salary,
//                   Last_Date_for_apply = @Last_Date_for_apply,
//                   Min_Experience_in_Year = @Min_Experience_in_Year,
//                   Maximum_Age = @Maximum_Age,
//                   Preferred_Gender = @Preferred_Gender,
//                   Prefered_Language = @Prefered_Language,
//                   Status = @Status,
//                   Created_By = @Created_By,
//                   Created_Date = @Created_Date,
//                   Modified_By = @Modified_By,
//                   Modified_Date = @Modified_Date,
//                   Delete_Flag = @Delete_Flag,
//                   Public_IP_Address = @Public_IP_Address,
//                   Private_IP_Address = @Private_IP_Address
//               WHERE Vacancy_ID = @Vacancy_ID
//           `);

//       res.status(200).send({ message: 'aplication updated successfully' });
//   } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: 'Error updating vacancy', error: err.message });
//   }
// };


// for update student application details 
const update_by_adminVacancyApply = async (req, res) => {
  const {
      Student_Application_ID,
      Vacancy_ID,
      Company_ID,
      Company_Name,
      Student_ID,
      Full_Name,
      Post_Name,
      Fathers_Name,
      Email,
      Mobile,
      //Flag,
      Status,
      Created_Date
  } = req.body;

 // console.log(Flag);
  console.log(Student_Application_ID);

  const file = req.file; // Get the file from the request
  const Resume_Path = file ? file.path : null; // Get the file path

  try {
      const pool = await sql.connect(); // Connect to the database using the exported sql object
      const request = pool.request(); // Create a request object from the pool

      // Update student application details based on Student_ID
      const updateQuery = `
          UPDATE tnp_student_application_details
          SET
              Vacancy_ID = @Vacancy_ID,
              Company_ID = @Company_ID,
              Company_Name = @Company_Name,
              Full_Name = @Full_Name,
              Post_Name = @Post_Name,
              Fathers_Name = @Fathers_Name,
              Email = @Email,
              Mobile = @Mobile,
              Status = @Status,
         
              Created_Date = @Created_Date
            
          WHERE
                Student_Application_ID = @Student_Application_ID`;

      // Bind the values
      request.input('Student_Application_ID', sql.INT, Student_Application_ID);
      request.input('Vacancy_ID', sql.NVarChar(50), Vacancy_ID);
      request.input('Company_ID', sql.NVarChar(50), Company_ID);
      request.input('Company_Name', sql.NVarChar(50), Company_Name);
      request.input('Student_ID', sql.NVarChar(50), Student_ID);
      request.input('Full_Name', sql.NVarChar(100), Full_Name);
      request.input('Post_Name', sql.NVarChar(100), Post_Name);
      request.input('Fathers_Name', sql.NVarChar(100), Fathers_Name);
      request.input('Email', sql.NVarChar(100), Email);
      request.input('Mobile', sql.NVarChar(13), Mobile);
      //request.input('Flag', sql.Char(1), Flag);
      request.input('Status', sql.NVarChar(20), Status);
     
      request.input('Created_Date', sql.NVarChar(20), Created_Date);
     

      await request.query(updateQuery);

      // Respond with success message
      res.status(200).json({ message: 'Student application details updated successfully' });
  } catch (err) {
      console.error('Error updating student application details: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get all vac

// const getVacanciesDetils = async (req, res) => {
//     try {
//         const pool = await sql.connect(); // Connect to the database using the exported sql object
//         const request = pool.request(); // Create a request object from the pool

//         const result = await request.query('SELECT * FROM tnp_vacancy_details'); // Execute the query
//         // const result = await request.query('SELECT * FROM tnp_vacancy_details where Status = "Aproved'); // Execute the query

//         res.status(200).send(result.recordset); // Send the result back to the client
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Error fetching vacancies', error: err.message });
//     }
// };



const getVacanciesDetils = async (req, res) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        const query = `SELECT * FROM tnp_vacancy_details`;
        const result = await request.query(query);
        const records = result.recordset;
        
        // Respond with the fetched records
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching student application details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };





const getstudentdetails = async (req, res) => {
    const eid = req.body.eid; // Assuming 'eid' is a field in the request body
    console.log(eid);

    try {
        var request = new sql.Request();
        request.input('eid', sql.VarChar, eid); // Adjust the SQL data type as necessary

        var query = 'SELECT * FROM dbo.login_table WHERE UE_ID = @eid';

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






// student list 

// const getAllStudents = async(req, res)=>{
//     var request = new sql.Request();
//     var query = "SELECT * FROM dbo.student_registration";

//     // Execute the SQL query
//     request.query(query, function(err, records) {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Error executing the query' });
//             return;
//         }
//         // Send the fetched records as JSON response
 
//       const totalCount = records.recordset.length;
//       res.json({ data: records.recordset, totalCount });
//     });
// }



const getAllStudents = async (req, res) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        var query = "SELECT * FROM dbo.student_registration";
        const result = await request.query(query);
        const records = result.recordset;
       
        // Respond with the fetched records
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching student application details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// student list 

module.exports ={
  getVacancyApply,
  Student_application_List,
  update_by_adminVacancyApply,
  getVacanciesDetils,
  getstudentdetails,
  getshortlist,
  getSelected,
  getReject,

  getAllStudents


}



