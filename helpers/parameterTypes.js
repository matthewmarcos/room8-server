/*
    This file contains the parameters that are required for each route.
    These should be input into the validator function.
*/


// POST /auth/register
export const register = ['username', 'password', 'email', 'nickname'];

// POST /auth/login
export const login = ['username', 'password'];

/*
 * API ROUTES
 * Always prepend with /api =)
 */
// PUT /user/profile
export const editProfile = [
    // For user_profile table
    'fullName',
    'status',
    'cleanliness',
    'sex',
    'smoker',
    'hasOrg',
    'gender',
    'course',
    'batch',
    'birthday',
    'contactNumber',
    'bio',
    // For user table
    'nickname',
    'email'
];

//PUT /user/hobbies
export const editHobbies = ['hobbies']; // Array of strings

//PUT /user/organizations
export const editOrganizations = ['organizations']; // Array of strings

//PUT /user/interests
export const editInterests = ['interests']; // Array of strings

//PUT /preferences/when
export const prefWhen = ['startDate', 'duration'];

//PUT /preferences/cost
export const prefCost = [
    'rentPriceRangeStart',
    'rentPriceRangeEnd',
    'shouldIncludeUtilities',
    'utilitiesPriceRangeStart',
    'utilitiesPriceRangeEnd'
];

//PUT /preferences/location
export const prefLocation = [
    'nearbyRestaurants',
    'travelTimeToUplb',
    'generalLocation'
];

//PUT /preferences/utilities
export const prefUtilities = [
    'airconditioning',
    'laundry',
    'cooking',
    'gasStove',
    'electricStove',
    'microwave',
    'waterKettle',
    'internet',
    'torrent',
    'speedRequirement'
];

//PUT /preferences/lifestyle
export const prefLifestyle = [
    'alcohol',
    'cleanliness',
    'smokers',
    'studyTime',
    'guestsInRoom',
    'guestsStudyArea',
    'pets',
    'org'
];

//PUT /preferences/misc
export const prefMisc = ['curfew', 'curfewTime', 'message'];

//PUT /preferences/sex
export const prefSex = ['sex'];

//PUT /preferences/(hobbies|organizations|interests)
export const userHobbies = ['hobbies'];
export const userOrganizations = ['organizations'];
export const userInterests = ['interests'];
export const match = ['targetId'];

