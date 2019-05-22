import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerListService } from '../service/customer-list.service';
import { Customer } from '../models/customer';
import { MatTableDataSource } from '@angular/material';
import { CustomerFormService } from '../service/customer-form.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'emailAddress', 'update'
  ];

  dataSource = new MatTableDataSource<Customer>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private customerListService: CustomerListService) {
    console.log('CustomerUpdateComponent#co');

  }

  ngOnInit() {
    console.log('CustomerUpdateComponent#co');

    this.getCustomerById();
  }

  getCustomerById() {
    console.log('CustomerUpdateComponent#getCustomerById');

    const id: string = this.activeRoute.snapshot.params.id;

    this.customerListService.getCustomerById(id).subscribe(data => {
      this.dataSource.data = [data];

      console.log('CustomerUpdateComponent#getCustomerById', this.dataSource.data);
    });
  }

  public redirectToUpdate = (customer: Customer) => {
    console.log('CustomerUpdateComponent#redirectToUpdate customer=', customer);

    this.customerListService.updateCustomer(customer).subscribe(() => {
      const url = `/customer`;
      this.router.navigate([url]);
    });

  }
}
