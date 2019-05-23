import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Customer } from '../models/customer';
import { environment } from './../../environments/environment';

const customerAPIEndpoint = environment.customerAPIEndpoint;

@Injectable()
export class CustomerFormService {

  private customerFormUrl: string;

  constructor(private http: HttpClient) {

    // Set url to backend services.
    this.customerFormUrl = `${customerAPIEndpoint}/customer`;
  }

  public createCustomer(customer: Customer) {
    console.log('CustomerFormService#createCustomer');

    return this.http.post<Customer>(this.customerFormUrl, customer) ;
  }

  public getCustomerByEmailAddress(emailAddress: string) {
    console.log('CustomerFormService#getCustomerByEmailAddress - emailAddress =', emailAddress);

    // return this.http.post<Customer>(`${this.customerFormUrl}email-address/${emailAddress}`);
    return this.http.post<Customer>(`${this.customerFormUrl}/email-address`, { emailAddress });
  }
}
