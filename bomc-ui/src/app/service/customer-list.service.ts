import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const customerAPIEndpoint = environment.customerAPIEndpoint;

/**
 * A separate service for hanlding errors.
 */
@Injectable()
export class CustomerListService {

  customerListUrl: string;

  constructor(private http: HttpClient) {

    this.customerListUrl = `${customerAPIEndpoint}/customer`;
  }

  public findAll(): Observable<Customer[]> {
    console.log('CustomerListService#findAll');

    return this.http.get<Customer[]>(this.customerListUrl);
  }

  public deleteCustomer(id: string) {
    console.log('CustomerListService#deleteCustomer - url =', `${this.customerListUrl}/${id}`);

    return this.http.delete(`${this.customerListUrl}/${id}`);
  }

  public getCustomerById(id: string): Observable<Customer> {
    console.log('CustomerListService#getCustomerById - url =', `${this.customerListUrl}/${id}`);

    return this.http.get<Customer>(`${this.customerListUrl}/${id}`);
  }

  public updateCustomer(customer: Customer) {
    console.log('CustomerListService#updateCustomer - customer =', customer);

    return this.http.put<Customer>(this.customerListUrl, customer);
  }
}
