export class Customer {
  id: number;
  emailAddress: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  country: string;

  constructor(
    id: number,
    emailAddress: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    city: string,
    postalCode: string,
    street: string,
    houseNumber: string,
    country: string,
  ) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
    this.houseNumber = houseNumber;
    this.country = country;
  }
}

