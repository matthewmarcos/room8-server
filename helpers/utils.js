// import _ from 'lodash';


// const _checkType = (key, fieldType) => {
//     const type = typeof fieldType;

//     if(typeof key !== type) {
//         return false;
//     }
//     else {
//         return true;
//     }
// };


// const _getData = (src, fields) => {
//     const error = new Error('not found!');
//     let finalData = clone(fields),
//         checkArray = [],
//         isValid;

//     finalData = _.mapValues(finalData, (fieldType, key) => {
//         if(_checkType(src[key], fieldType)) {
//             return src[key];
//         }

//         return error;
//     });

//     checkArray = _.map(finalData, data => typeof data !== typeof error);

//     isValid = _.reduce(checkArray, (acc, x) => { return  x && acc }, true);

//     if(!isValid) {
//         return new Error('422');
//     }
//     else {
//         return finalData;
//     }
// };


// export const clone = (obj) =>  {
//     return JSON.parse(JSON.stringify(obj));
// };


// export const getData = (fields) => {
//     const from = (source) => {
//         return _getData(source, fields);
//     };

//     return { from };
// };


// export const isEmail = (email) => {
//     return /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,3}$/.test(email.toLowerCase());
// };

