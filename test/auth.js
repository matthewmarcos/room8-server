/* register.js
 * 
 * This file contains test cases for post/register
 */


import { assert } from 'chai';
import { register } from '../controllers/AuthController';

function todo() {
    assert(false, 'To be implemented soon');
}

describe('/register', () => {
    it('should work if username, email, password, and nickname are provided', (done) => {
        todo();
    });

    it('should return 422 if username is not located in body', (done) => {
        todo();
    });

    it('should return 422 if nickname is not located in body', (done) => {
        todo();
    });

    it('should return 422 if email is not located in body', (done) => {
        todo();
    });

    it('should return 422 if email is not in the correct format', (done) => {
        todo();
    });

    it('should return 422 if password is not located in body', (done) => {
        todo();
    });

    it('should return 409 if username already exists in the database', (done) => {
        todo();
    });

    it('should return 409 if nickname already exists in the database', (done) => {
        todo();
    });

    it('should return 409 if email already exists in the database', (done) => {
        todo();
    });
});

describe('/login', () => {
    it('should return 422 when username is not located in the body', (done) => {
        todo();
    });

    it('should return 422 when the password is not located in the body', (done) => {
        todo();
    });

    it('should return 401 when the username-password combination does not exist', (done) => {
        todo();
    });

    it('should work with a correct username-password combination', (done) => {
        todo();
    });
});

