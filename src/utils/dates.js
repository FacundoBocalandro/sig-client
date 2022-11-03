import {intervalToDuration} from "date-fns";

export const calculateFullAgeString = (dob) => {
    const birthDate = new Date(dob);
    const { years, months, days } = intervalToDuration({ start: birthDate, end: new Date()});
    let age = '';
    switch (years) {
        case 0:
            break;
        case 1:
            age += '1 año '
            break;
        default:
            age += `${years} años `;
            break;
    }
    switch (months) {
        case 0:
            break;
        case 1:
            age += '1 mes '
            break;
        default:
            age += `${years} meses `;
            break;
    }
    switch (days) {
        case 1:
            age += '1 día '
            break;
        default:
            age += `${days} días `;
            break;
    }
    return age.trim();
}
