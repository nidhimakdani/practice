import { Component,OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmpComponent } from './add-edit-emp/add-edit-emp.component';
import { ServiceService } from './shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id',
  'firstname',
   'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'exp',
    'package',
    'action'];
 dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private service:ServiceService){}

  ngOnInit(){
this.getEmplist()
  }
  openAddEMp(){
  const dialogref=  this.dialog.open(AddEditEmpComponent);
  dialogref.afterClosed().subscribe({
    next: (val)=>{
if(val){
  this.getEmplist();
}
    }
  })
  }
  getEmplist(){
    this.service.getAllEmployee().subscribe({
      next: (res)=>{
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator
      },
      error: (err)=>{
        alert(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmp(id:number){
this.service.deleteEmployee(id).subscribe({
  next:(res)=>{
    alert("Employee Delete")
    this.getEmplist();
  },
  error:console.log,
})
  }
  editEmp(data:any){
    const dialogref=this.dialog.open(AddEditEmpComponent,{
  data
});
 dialogref.afterClosed().subscribe({
  next: (val)=>{
if(val){
this.getEmplist();
}
  }

  });
}
}