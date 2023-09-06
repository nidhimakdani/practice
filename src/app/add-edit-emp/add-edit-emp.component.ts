import { Component , OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {
empForm : FormGroup
  education:string[]=["SSC","HSC","Diploma","Grduation","Post Grduation"]
constructor(private fb:FormBuilder, private service:ServiceService, private dialogref:MatDialogRef<AddEditEmpComponent>,@Inject (MAT_DIALOG_DATA) public data:any ){
  this.empForm= this.fb.group({
    firstname:'',
    lastname:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    exp:'',
    package:''
  })
  
}
ngOnInit(): void {
  this.empForm.patchValue(this.data)
}
onsave(){
  if(this.empForm.valid){
    // console.log(this.empForm.value)
   if(this.data){
    this.service.UpdateEmployee(this.data.id,this.empForm.value).subscribe({
      next:(val:any)=>{
alert("Employee details  updated  Sucessfully")
this.dialogref.close(true);
      },
      error:(err:any)=>{
        alert(err);
      } 
    })
   }   
   }
   else{
    this.service.addEmployee(this.empForm.value).subscribe({
      next:(val:any)=>{
alert("Employee details  updated  Sucessfully")
this.dialogref.close(true);
      },
      error:(err:any)=>{
        alert(err);
      } 
    });
   }
   
  }
  
}

 
