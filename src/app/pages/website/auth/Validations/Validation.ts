import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileExtensionValidator(allowedExtensions: string[]): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        return null;
      } else {
        return { invalidExtension: true };
      }
    }
    return null;
  };
}
export function handleValidationErrors(errors: string[]) {
  return errors.join('\n');
}
