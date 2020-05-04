import Rebase from 're-base';
import firebase from 'firebase';

//create connection to the firebase db

const config = {
    apiKey: "AIzaSyDcCBW1ygISPIns9eoecpiQin6XsI0NVn8",
    authDomain: "catch-of-the-day-f8742.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-f8742.firebaseio.com"
}
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;