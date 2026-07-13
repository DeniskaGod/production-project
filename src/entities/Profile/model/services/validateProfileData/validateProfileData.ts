import { Profile, ValidateProfileError } from "../../types/profile";

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return {
            errors: [ValidateProfileError.NO_DATA],
            valid: false
        }
    }
    const {first, lastname, age, country} = profile;
    const errors: ValidateProfileError[] = [];
    if (!first || !lastname || !age || !country) {
        errors.push(ValidateProfileError.NO_DATA);
    }
    if (!Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }
    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }
    return {
        errors,
        valid: errors.length === 0
    }
}