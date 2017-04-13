import express from 'express';

import * as auth from '../controllers/AuthController';
import * as pref from '../controllers/PreferencesController';
import * as prof from '../controllers/ProfileController';
import * as paramType from '../helpers/parameterTypes'
import { validate } from '../helpers/validator';

const router = express.Router();

// GET Preferences
router.get('/preferences', auth.loggedIn, pref.get());

router.get('/preferences/when', auth.loggedIn, pref.get('when'));
router.put('/preferences/when',
    auth.loggedIn,
    validate(paramType.prefWhen, 'body'),
    pref.prefWhen
);

router.get('/preferences/utilities', auth.loggedIn, pref.get('utilities'));
router.put('/preferences/utilities',
    auth.loggedIn,
    validate(paramType.prefUtilities, 'body'),
    pref.prefUtilities
);

router.get('/preferences/lifestyle', auth.loggedIn, pref.get('lifestyle'));
router.put('/preferences/lifestyle',
    auth.loggedIn,
    validate(paramType.prefLifestyle, 'body'),
    pref.prefLifestyle
);

router.get('/preferences/location', auth.loggedIn, pref.get('location'));
router.put('/preferences/location',
    auth.loggedIn,
    validate(paramType.prefLocation, 'body'),
    pref.prefLocation
);

router.get('/preferences/misc', auth.loggedIn, pref.get('misc'));
router.put('/preferences/misc',
    auth.loggedIn,
    validate(paramType.prefMisc, 'body'),
    pref.prefMisc
);

router.get('/preferences/cost', auth.loggedIn, pref.get('cost'));
router.put('/preferences/cost',
    auth.loggedIn,
    validate(paramType.prefCost, 'body'),
    pref.prefCost
);


router.get('/preferences/hobbies', auth.loggedIn, pref.getHobbies);
router.put('/preferences/hobbies',
    auth.loggedIn,
    validate(paramType.userHobbies, 'body'),
    pref.setHobbies
);


router.get('/preferences/organizations', auth.loggedIn, pref.getOrganizations);
router.put('/preferences/organizations',
    auth.loggedIn,
    validate(paramType.userOrganizations, 'body'),
    pref.setOrganizations
);

router.get('/preferences/interests', auth.loggedIn, pref.getInterests);
router.put('/preferences/interests',
    auth.loggedIn,
    validate(paramType.userInterests, 'body'),
    pref.setInterests
);

router.get('/profile', auth.loggedIn, prof.getProfile);
router.put('/profile',
    auth.loggedIn,
    validate(paramType.editProfile, 'body'),
    prof.editProfile
);

export default router;

