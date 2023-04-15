const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/u;
const PHONE_REGEX = /^[0-9 ]{10,}$/u;
const ID_NUMBER_REGEX = /^[0-9]{6,}$/u;

export {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, ID_NUMBER_REGEX };
//export const passwordRegex =
//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/u;