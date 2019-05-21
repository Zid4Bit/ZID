import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerListService } from '../service/customer-list.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { CustomerFormService } from '../service/customer-form.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'emailAddress',
    'dateOfBirth', 'phoneNumber', 'street', 'houseNumber',
    'postalCode', 'city', 'country', 'update', 'delete'
  ];
  listDataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerListService: CustomerListService,
    private router: Router) {
    console.log('CustomerListComponent#co');

    //this.dataSource = new MatTableDataSource<Customer>();
  }

  ngOnInit() {
    console.log('CustomerListComponent#ngOnInit');

    this.customerListService.findAll().subscribe(data => {
      this.listDataSource.data = data as Customer[];
    });
  }

  ngAfterViewInit(): void {
    console.log('CustomerListComponent#ngAfterViewInit');

    this.listDataSource.sort = this.sort;
    this.listDataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    console.log('CustomerListComponent#doFilter');

    this.listDataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToUpdate = (id: string) => {
    console.log('CustomerListComponent#redirectToUpdate id=', id);

    const url = `/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    console.log('CustomerListComponent#redirectToDelete id=', id);

    this.customerListService.deleteCustomer(id).subscribe(response => {
      // The filter funtion returns, all data except the data with the given id.
      // This means the row with the given id is removed from model.
      this.listDataSource.data = this.listDataSource.data.filter(item => item.id !== +id);
    });

  }
}
