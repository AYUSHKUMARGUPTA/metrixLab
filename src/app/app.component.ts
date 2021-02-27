import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialPage: number;
  totalPages = [];
  currentData = [];
  totalEmployees:number;
  showModal = false; 
  isUpload = true;
  employeeID;
  firstName;
  lastName;
  empEmail;
  imageAva: string;
  constructor(private apiService: ApiService) { }
  ngOnInit(){
    this.initialPage = 1;
    this.apiService.getData(this.initialPage).subscribe((data)=>{
      this.currentData = data["data"];
      this.totalEmployees = data["total"];
      for(let i=1; i<=data["total_pages"];i++){
        this.totalPages.push(i);
      }

      console.log("Page data",data);
    });
  }
  pageOnClick(pages){
    this.apiService.getData(pages).subscribe((data)=>{
      this.currentData = data["data"];
      this.totalEmployees = data["total"];
      console.log("Page data",data);
    });
  }
  hide()
  {
    this.showModal = false;
    this.pageOnClick(1);
  }
  openModal(id){
    this.showModal = true;
    if(id>0){
      this.apiService.getUserData(id).subscribe((data)=>{
        this.isUpload = false;
        this.employeeID = data["data"]["id"];
        this.firstName = data["data"]["first_name"];
        this.lastName = data["data"]["last_name"];
        this.empEmail = data["data"]["email"];
        this.imageAva = data["data"]["avatar"];
      });
    }else{
      this.isUpload = false;
      this.clearModal();
    }
   
  }
  clearModal(){
    this.employeeID = null;
    this.firstName = null;
    this.lastName = null;
    this.empEmail = null;
    this.imageAva = "https://i2.wp.com/airlinkflight.org/wp-content/uploads/2019/02/male-placeholder-image.jpeg?ssl=1";
  }

}
