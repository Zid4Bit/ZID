import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { of, Observable } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';

/**
 * A separate service for hanlding errors.
 */
@Injectable()
export class CustomerListService {

  private customerListUrl: string;

  constructor(private http: HttpClient) {
    this.customerListUrl = 'http://localhost:8080/customer';
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
