import { combineReducers } from "redux";
import modal from "./modal";
import user from "./user";
import application from './application';

export default combineReducers({ modal, user, application });