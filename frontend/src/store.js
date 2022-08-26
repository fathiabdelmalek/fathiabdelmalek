import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import profileReducer from "./reducers/profile";
import skillsReducer from "./reducers/skills";
import projectsReducer from "./reducers/projects";
// import projectReducer from "./reducers/project";
import contactReducer from "./reducers/contact";

const middleware = [thunk];

const reducer = combineReducers({
  profile: profileReducer,
  skills: skillsReducer,
  projects: projectsReducer,
  // project: projectReducer,
  contact: contactReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
