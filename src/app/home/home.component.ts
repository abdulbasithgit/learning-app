import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm = this.formBuilder.group({
    flightNumber: ['', []],
    filghtOrgin: ['', []],
    flightDes: ['', []],
    flightDate: ['', []]
  });;
  submitted = false;
  displayedColumns: string[] = ['flightNumber', 'flightOrgin', 'flightDes', 'flightDate'];

  dataSource = [];
  constructor(private formBuilder: FormBuilder, private apiservice: AppService) { }

  ngOnInit(): void {
    this.onloadForm();
  }

  onloadForm(){
    this.dataSource = [];
  }
  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  onSearch() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
        return;
    }
    let formdataValue = this.searchForm.value;
    this.apiservice.getflight('flights').subscribe((res: any)=>{
      this.dataSource = [];
      let data = res;
      let filterData = [];
      if(formdataValue.flightNumber === '' && formdataValue.filghtOrgin === '' && formdataValue.flightDes === '' && formdataValue.flightDate === ''){
        filterData = data;
      }else if(formdataValue.flightNumber !== null && formdataValue.filghtOrgin === null && formdataValue.flightDes === null && formdataValue.flightDate === null){
        data.forEach((element: any) => {
          if(element.flightNumber === formdataValue.flightNumber){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber === null && formdataValue.filghtOrgin !== null && formdataValue.flightDes !== null && formdataValue.flightDate === null){
        data.forEach((element: any) => {
          if(element.flightOrgin === formdataValue.filghtOrgin && element.flightDes === formdataValue.flightDes){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber !== null && formdataValue.filghtOrgin === null && formdataValue.flightDes === null && formdataValue.flightDate !== null){
        data.forEach((element: any) => {
          formdataValue.flightDate.setHours(0,0,0,0);
          let anotherdate = new Date(formdataValue.flightDate);
          let withouttime = new Date(element.flightDate);
          withouttime.setHours(0,0,0,0);
          if(element.flightNumber === formdataValue.flightNumber && withouttime.toDateString() == anotherdate.toDateString()){
            filterData.push(element);
          }
        });
      }else if(formdataValue.flightNumber === null && formdataValue.filghtOrgin !== null && formdataValue.flightDes !== null && formdataValue.flightDate !== null){
        data.forEach((element: any) => {
          formdataValue.flightDate.setHours(0,0,0,0);
          let anotherdate = new Date(formdataValue.flightDate);
          let withouttime = new Date(element.flightDate);
          withouttime.setHours(0,0,0,0);
          if(element.flightOrgin === formdataValue.filghtOrgin && element.flightDes === formdataValue.flightDes && withouttime.toDateString() == anotherdate.toDateString()){
            filterData.push(element);
          }
        });
      }
      this.dataSource = filterData;
    });
  }

}
