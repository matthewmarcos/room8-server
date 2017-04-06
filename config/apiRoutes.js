import express from 'express';

import * as auth from '../controllers/AuthController';
import * as pref from '../controllers/PreferencesController';
import { validate } from '../helpers/validator';

const router = express.Router();

// GET Preferences
router.get('/preferences', auth.loggedIn, pref.get());

router.get('/preferences/when', auth.loggedIn, pref.get('when'));
router.put('/preferences/when', auth.loggedIn, pref.put('when'));

router.get('/preferences/utilities', auth.loggedIn, pref.get('utilities'));
router.put('/preferences/utilities', auth.loggedIn, pref.put('utilities'));

router.get('/preferences/lifestyle', auth.loggedIn, pref.get('lifestyle'));
router.put('/preferences/lifestyle', auth.loggedIn, pref.put('lifestyle'));

router.get('/preferences/location', auth.loggedIn, pref.get('location'));
router.put('/preferences/location', auth.loggedIn, pref.put('location'));

router.get('/preferences/misc', auth.loggedIn, pref.get('misc'));
router.put('/preferences/misc', auth.loggedIn, pref.put('misc'));

router.get('/preferences/cost', auth.loggedIn, pref.get('cost'));
router.put('/preferences/cost', auth.loggedIn, pref.put('cost'));

export default router;
