import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerFormService } from '../service/customer-form.service';
import { Customer } from '../models/customer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  // The data model from backend.
  customer: Customer;
  // The form specific variables.
  formGroup: FormGroup;
  // A validation message if field is not set.
  titleAlert = 'This field is required';
  // Contains the input data.
  post: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerFormService: CustomerFormService,
    private formBuilder: FormBuilder) {
    // Creates a new empty instance of customer.
    this.customer = new Customer(0, '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('CustomerFormComponent#ngOnInit');

    this.createForm();
    this.setChangeValidate();
  }

  onSubmit() {
    console.log('CustomerFormComponent#onSubmit');

    this.customerFormService.createCustomer(this.customer).subscribe(result => this.routeToCustomerList());
  }

  createForm() {
    console.log('CustomerFormComponent#onSubmit');

    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3'\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      name: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      description: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      validate: ''
    });
  }

  checkPassword(control: { value: any; }) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate === '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least 3 characters';
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    );
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  checkInUseEmail(control: { value: string; }) {
    // TODO: Simulate a database access, that checks the email address.
    const db = ['bomc@bomc.org'];

    return new Observable(observer => {
      setTimeout(() => {
        const result = (db.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 2000);
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup
      .get('password')
      .hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :

      this.formGroup
      .get('password')
      .hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  routeToCustomerList() {
    this.router.navigate(['/customer']);
  }
}
