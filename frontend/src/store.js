import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import profileReducer from "./reducers/profile";
import skillsReducer from "./reducers/skills";
import projectsReducer from "./reducers/projects";
import projectReducer from "./reducers/project";
import imagesReducer from "./reducers/images";
import contactReducer from "./reducers/contact";
import authReducer from "./reducers/auth";

const middleware = [thunk];

const reducer = combineReducers({
  profile: profileReducer,
  skills: skillsReducer,
  projects: projectsReducer,
  project: projectReducer,
  images: imagesReducer,
  contact: contactReducer,
  auth: authReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
