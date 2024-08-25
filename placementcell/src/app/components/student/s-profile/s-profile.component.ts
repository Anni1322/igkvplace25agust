import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-profile',
  templateUrl: './s-profile.component.html',
  styleUrls: ['./s-profile.component.scss']
})



export class SProfileComponent implements OnInit {


  studentdetails: any;
  studentservice: any;

  Skills: any;

  Experience: any;

  Academic: any;

  baseimageur = 'http://localhost:3000/student';

  //displayedColumns: string[] = [ 'Admission_Year_Id','College_Name','Degree_Programme_Id','Marksheet_Url'];
  // dataSource! :  MatTableDataSource<any>;
  // datacontainer: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private ds: StudentService,
    private route: ActivatedRoute
  ) { }



  user: any = {}; // Initialize user object here
  //studentId:any;

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');
    console.log("profiledata" + userData)

    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);

      console.log("idddd" + this.user.eid)
      // id pass 
      // this.getdata(this.user.eid);
      this.getskill(this.user.eid)

      this.getAcademic(this.user.eid)

      this.getexperience(this.user.eid)
    }

    // get id form param
    // this.studentId = this.route.snapshot.paramMap.get('id')!;
    // console.log("from router",this.studentId);



    this.ds.getBasicDetails(this.user.eid).subscribe(
      (response) => {
        this.studentdetails = response;
        console.log('studentdetails details:', this.studentdetails);
      })

  }



  //for skills details
  getskill(eid: any) {
    console.log('skill id', eid)
    this.ds.getSkills(eid).subscribe(
      (response) => {
        this.Skills = response;
        console.log('skills details:', this.Skills);

      }
    )
  }

  //for experience details
  getexperience(eid: any) {
    console.log('experience id', eid);
    this.ds.getexperienceid(eid).subscribe(
      (response) => {
        this.Experience = response;
        console.log('experience details:', this.Experience);

      }
    )
  }

  //for academic details 
  getAcademic(eid: any) {
    console.log('academic id', eid);
    this.ds.getAcademicId(eid).subscribe(
      (response) => {
        this.Academic = response;
        console.log('Academic details:', this.Academic);
      },
      (error) => {
        console.error('Error fetching academic details:', error);
      }
    );
  }

  openFile(): void {
    const fileUrl = this.ds.getFileUrl();
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      Swal.fire("No certificate uploaded", "", "warning");
    }
  }

  //for profile data
  profiledata: any;

  getdata(eid: any) {
    console.log('EID:', eid);
    this.ds.getProfiledata(eid).subscribe(
      (response) => {
        console.log('Raw Response:', response);

        this.profiledata = response;
        console.log('Profile Data:', this.profiledata);

        if (this.profiledata) {
          console.log('eid:', this.profiledata.UE_ID);
          // console.log('username:', this.profiledata.username);
        } else {
          console.log('No profile data received.');
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }


  getid() {
    const userid = this.user;
    // console.log("userid"+userid.id);
    // console.log("userid"+userid.username);
    this.auth.login(userid.id).subscribe(
      (response) => {
        if (response) {
          const id = response.id;
          const username = response.username;
          alert("Login successful");
          this.router.navigate(['/student/s-profile-edit', id]);
        } else {
          alert("wrong password");
          console.log('Login failed. Invalid credentials.');
        }
      }, (error) => {

        console.log("error", error)
      });

  }

  
}

