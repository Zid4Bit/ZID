import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerFormService } from '../service/customer-form.service';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';
import { LastnameValidator } from '../validators/lastname.validator';

export interface Country {
  value: string;
  viewValue: string;
}

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // The data model from backend.
  customer: Customer;
  // The form group of the registartion formular.
  formGroup: FormGroup;
  // A common title alert.
  titleAlert = 'This field is required';
  // The current date.
  currentDate = new Date();
  // The validated input data.
  post: any = '';
  // Error matcher for password validation.
  errorMatcher = new CrossFieldErrorMatcher();
  /**
   * Creates a new instance of Registration component.
   *
   * @param formBuilder the given formBuilder instance.
   */
  constructor(
    private formBuilder: FormBuilder,
    private customerFormService: CustomerFormService,
    private route: ActivatedRoute,
    private router: Router) {

    console.log('RegistrationComponent#co');
  }

  countries: Country[] = [
    {value: 'CH', viewValue: 'Schweiz'},
    {value: 'DE', viewValue: 'Deutschland'},
    {value: 'AT', viewValue: 'Österreich'},
    {value: 'FR', viewValue: 'Frankreich'}
  ];

  validationMessages = {
    lastName: [
      { type: 'required', message: 'Firstname is required' },
      { type: 'minlength', message: 'Firstname must be at least 3 characters long' },
      { type: 'maxLength', message: 'Firstname cannot be more than 30 characters long' },
      { type: 'validFirstname', message: 'Your Firstname has already been taken' }
    ]
  };

  ngOnInit() {
    console.log('RegistrationComponent#ngOnInit');

    this.createForm();
    this.setChangeValidate();
  }

  // A helper method that creates the from.
  createForm() {
    console.log('RegistrationComponent#ngOnInit');

    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonenumberRegex: RegExp = /^\+?[1-9]\d{1,14}$/;
    const onlyDigitsRegex: RegExp = /[0-9]+/;
    const validLastnameRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

    this.formGroup = this.formBuilder.group({
      emailAddress: [null, [Validators.required, Validators.pattern(emailRegex)], this.checkInUseEmail],
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        // Validators.pattern(validLastnameRegex),
        LastnameValidator.validLastname
      ])]],
      phoneNumber: [null, [Validators.required, Validators.pattern(phonenumberRegex)]],
      dateOfBirth: [null, [Validators.required]],
      postalCode: [null, [Validators.minLength(4), Validators.maxLength(10), Validators.pattern(onlyDigitsRegex)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      street: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      houseNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      country: [null, [Validators.required]],
      // password: [null, [Validators.required, this.checkPassword]],
      // description: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      validate: '',
      // verifyPassword: ''
    // }, {
      // validator: this.passwordValidator
    });
  }

  /*
  passwordValidator(formGroup: FormGroup) {
    const condition = formGroup.get('password').value !== formGroup.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }
  */

  setChangeValidate() {
    console.log('RegistrationComponent#setChangeValidate');

    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        // DO NOT CHANGE IT TO '===', otherwise it is not working as expected.
        if (validate) {
          this.formGroup.get('firstName').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least 3 characters';
        } else {
          this.formGroup.get('firstName').setValidators(Validators.required);
        }
        this.formGroup.get('firstName').updateValueAndValidity();
      }
    );
  }

  get firstName() {
    console.log('RegistrationComponent#firstName');

    return this.formGroup.get('firstName') as FormControl;
  }

  /*
  checkPassword(control: { value: any; }) {
    console.log('RegistrationComponent#checkPassword');

    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }
  */

  checkInUseEmail(control: { value: string; }) {
    console.log('RegistrationComponent#checkInUseEmail');

    // TODO Simulate database access
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
    console.log('RegistrationComponent#getErrorEmail');

    return this.formGroup.get('emailAddress').hasError('required') ? 'Field is required' :
      this.formGroup.get('emailAddress').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('emailAddress').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  /*
  getErrorPassword() {
    console.log('RegistrationComponent#getErrorPassword');

    return this.formGroup
      .get('password')
      .hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup
      .get('password')
      .hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  */

  onSubmit(post: any) {
    console.log('RegistrationComponent#onSubmit');

    this.post = post;

    this.post.country = this.post.country.value;
    this.post.dateOfBirth = this.post.dateOfBirth.format('YYYY-MM-DD');

    console.log('RegistrationComponent#onSubmit', this.post);

    // Send rest request..
    this.customerFormService.createCustomer(this.post).subscribe(result => this.routeToCustomerList());
  }

  routeToCustomerList() {
    console.log('RegistrationComponent#onSubmit');

    this.router.navigate(['/customer']);
  }
}
