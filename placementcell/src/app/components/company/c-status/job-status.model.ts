export interface JobStatus {
    id: number;
    Vacancy_ID: string;
    Company_Id: string;
    Company_Registration_No: string;
    Job_Title: string;
    Job_Description: string;
    Job_Selection: string;
    Job_Location: string;
    No_Of_Post: number;
    Salary: string;
    Last_Date_for_apply: Date;
    Min_Experience_in_Year: number;
    Maximum_Age: number;
    Preferred_Gender: string;
    Prefered_Language: string;
    Status: string;
    Created_By: string;
    Created_Date: Date;
    Modified_By: string;
    Modified_Date: Date;
    Delete_Flag: string;
    Public_IP_Address: string;
    Private_IP_Address: string;
  }
  