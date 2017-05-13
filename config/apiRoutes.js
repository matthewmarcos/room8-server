import express from 'express';

import * as auth from '../controllers/AuthController';
import * as pref from '../controllers/PreferencesController';
import * as prof from '../controllers/ProfileController';
import * as match from '../controllers/MatchController';
import * as pair from '../controllers/PairingController';
import * as paramType from '../helpers/parameterTypes'
import { validate } from '../helpers/validator';
import { missingFields } from '../helpers/errorTypes';


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

router.get('/preferences/sex', auth.loggedIn, pref.get('sex'));
router.put('/preferences/sex',
    auth.loggedIn,
    validate(paramType.prefSex, 'body'),
    pref.prefSex
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
    function(req, res, next) {
        if(!(req.body.hobbies)) {
            return next(missingFields(['hobbies']));
        }
        else {
            return next();
        }
    },
    pref.setHobbies
);


router.get('/preferences/organizations', auth.loggedIn, pref.getOrganizations);
router.put('/preferences/organizations',
    auth.loggedIn,
    function(req, res, next) {
        req.body = JSON.parse(JSON.stringify(req.body));
        if(!(req.body.organizations)) {
            return next(missingFields(['organizations']));
        }
        else {
            return next();
        }
    },
    pref.setOrganizations
);

router.get('/preferences/interests', auth.loggedIn, pref.getInterests);
router.put('/preferences/interests',
    auth.loggedIn,
    function(req, res, next) {
        if(!(req.body.interests)) {
            return next(missingFields(['interests']));
        }
        else {
            return next();
        }
    },
    pref.setInterests
);

router.get('/profile', auth.loggedIn, prof.getProfile);
router.put('/profile',
    auth.loggedIn,
    validate(paramType.editProfile, 'body'),
    prof.editProfile
);

router.get('/pair',
    auth.loggedIn,
    pair.getPair
);

router.get('/matches',
    auth.loggedIn,
    match.getMatches
);

router.post('/matches',
    auth.loggedIn,
    validate(paramType.match, 'body'),
    match.acceptMatch
);

router.put('/matches',
    auth.loggedIn,
    validate(paramType.match, 'body'),
    match.declineMatch
);

// Toggle Match
router.put('/discover/match',
    auth.loggedIn,
    prof.toggleDiscover
);

export default router;

