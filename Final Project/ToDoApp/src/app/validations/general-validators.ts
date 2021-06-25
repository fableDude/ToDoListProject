import { AbstractControl, ValidationErrors } from "@angular/forms";

export function wordValidators(minWords: number):(control:AbstractControl) => null | ValidationErrors {
    return (control:AbstractControl) => {
        if(!control) return null;
        if(!control.value) return null;
        if(typeof(control.value) !== 'string')return null;

        let words = control.value
            .split(' ')
            .filter(word => word);

        if(words.length >= minWords) return null;

        return{
            'words' : {
                actual: words.length,
                minimum: minWords
            }
        }
    }

}

export function letterValidator(minLetters:number):(control:AbstractControl) => null | ValidationErrors{
    return (control:AbstractControl) => {
        if(!control) return null;
        if(!control.value) return null;
        if(typeof(control.value) !== 'string')return null;

        let letters = control.value
            .split('')
            .filter(letter => letter !== ' ');
        
        if(letters.length >= minLetters) return null;
        return {
            'letters' : {
                actual: letters.length,
                minimum: minLetters
            }
        }
    }
}