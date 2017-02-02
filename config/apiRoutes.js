import express from 'express';
import * as auth from '../controllers/AuthController';
import * as pref from '../controllers/PreferencesController';

const router = express.Router();

router.get('/preferences', auth.loggedIn, pref.getAll);
router.get('/preferences/when', auth.loggedIn, pref.getWhen);
router.get('/preferences/utilities', auth.loggedIn, pref.getUtilities);
router.get('/preferences/lifestyle', auth.loggedIn, pref.getLifestyle);
router.get('/preferences/location', auth.loggedIn, pref.getLocation);
router.get('/preferences/misc', auth.loggedIn, pref.getMisc);
router.get('/preferences/cost', auth.loggedIn, pref.getCost);


router.put('/preferences/when', auth.loggedIn, pref.editWhen);
router.put('/preferences/utilities', auth.loggedIn, pref.editUtilities);
router.put('/preferences/lifestyle', auth.loggedIn, pref.editLifestyle);
router.put('/preferences/location', auth.loggedIn, pref.editLocation);
router.put('/preferences/misc', auth.loggedIn, pref.editMisc);
router.put('/preferences/cost', auth.loggedIn, pref.editCost);

export default router;
