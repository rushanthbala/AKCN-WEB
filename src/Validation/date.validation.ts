// import { ValidatorFn, FormGroup } from '@angular/forms';

import { AbstractControl, ValidatorFn } from '@angular/forms';

// import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

// export function dateLessThan(firstDateField: string, secondDateField: string): ValidatorFn {
//     return (form: AbstractControl): { [key: string]: boolean } | null => {
//         const firstDateValue = form.get(firstDateField).value;
//         const secondDateValue = form.get(secondDateField).value;

//         if (!firstDateValue || !secondDateValue) {
//             return { missing: true };
//         }

//         const firstDate = new Date(firstDateValue);
//         const secondDate = new Date(secondDateValue);

//         if (firstDate.getTime() >= secondDate.getTime()) {
//             const err = { dateLessThan: true };
//             form.get(firstDateField).setErrors(err);
//             return err;
//         } else {
//             const dateLessError = form.get(firstDateField).hasError('dateLessThan');
//             if (dateLessError) {
//                 delete form.get(firstDateField).errors['dateLessThan'];
//                 form.get(firstDateField).updateValueAndValidity();
//             }
//         }
//     };
// }
// export function dateValidator(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const today = new Date().getTime();

//       if(!(control && control.value)) {
//         // if there's no control or no value, that's ok
//         return null;
//       }

//       // return null if there's no errors
//       return control.value.getTime() > today
//         ? {invalidDate: 'You cannot use future dates' }
//         : null;
//     }
//   }

// export function dateLessThan(firstDateField: string, secondDateField: string): ValidatorFn {
//     return (c: AbstractControl): { [key: string]: boolean } | null => {
//       const date1 = c.get(dateField1);
//       const date2 = c.get(dateField2);
//       if (date1 !== null && date2 !== null && date1 > date2) {
//         return validatorField;
//       }
//       return null;
//     };
//   }
export function dateLessThan(firstDateField: string, secondDateField: string): ValidatorFn {
    return (form: AbstractControl):  {[key: string]: any} | null => {
        const firstDateValue = form.get(firstDateField);
        const secondDateValue = form.get(secondDateField);

        if (!firstDateValue || !secondDateValue) {
            return { missing: true };
        }

        const firstDate = new Date(firstDateValue);
        const secondDate = new Date(secondDateValue);

        if (firstDate.getTime() >= secondDate.getTime()) {
            const err = { dateLessThan: true };
            form.get(firstDateField).setErrors(err);
            return err;
        } else {
            const dateLessError = form.get(firstDateField).hasError('dateLessThan');
            if (dateLessError) {
                delete form.get(firstDateField).errors['dateLessThan'];
                form.get(firstDateField).updateValueAndValidity();
            }
        }
    };
}
