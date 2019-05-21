import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Customer } from '../models/customer';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CustomerFormService {

  private customerFormUrl: string;

  constructor(private http: HttpClient) {
    // Set url to backend services.
    this.customerFormUrl = 'http://localhost:8080/customer';
  }

  public createCustomer(customer: Customer) {
    console.log('CustomerFormService#createCustomer');

    return this.http.post<Customer>(this.customerFormUrl, customer) ;
  }

}
