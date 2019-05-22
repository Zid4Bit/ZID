import { FormControl } from '@angular/forms';

/**
 * https://angular-templates.io/tutorials/about/angular-forms-and-validations
 */
export class LastnameValidator {

  static validLastname(formControl: FormControl) {
    if (formControl.value.toLowerCase() === 'abc123' || formControl.value.toLowerCase() === '123abc') {
      return ({ validLastname: true });
    } else {
      return (null);
    }
  }
}
