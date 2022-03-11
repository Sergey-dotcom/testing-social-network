import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function birthdayValidator(): ValidatorFn {
    return ({ value }: AbstractControl): { [key: string]: any } | null => {
        let forbidden = true;
        if (value) {
            const userAge = moment().diff(moment(value), 'years');
            forbidden = userAge < 25 || userAge > 65;
        }
        return forbidden ? { 'invalidBirthdayRange': true } : null;
    };
} 