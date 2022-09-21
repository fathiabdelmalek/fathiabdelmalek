import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ isAuthenticated }) {
  const render = () => {
    if (isAuthenticated)
      return (
        <React.Fragment>
          <div className="nav-item">
            <h3>
              <NavLink to={"/settings"} className="nav-link">
                Settings
              </NavLink>
            </h3>
          </div>
          <div className="nav-item">
            <h3>
              <NavLink to={"/logout"} className="nav-link">
                Logout
              </NavLink>
            </h3>
          </div>
        </React.Fragment>
      );
  };

  return (
    <nav className="mt-4">
      <div className="nav-item">
        <h3>
          <NavLink to={"/about"} className="nav-link">
            About Me
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/skills"} className="nav-link">
            My Skills
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/projects"} className="nav-link">
            My Projects
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/contact"} className="nav-link">
            Contact Me
          </NavLink>
        </h3>
      </div>
      {render()}
    </nav>
  );
}

// import React from "react";
// import { NavLink } from "react-router-dom";

// export default function Nav({ isAuthenticated }) {
//   const render = () => {
//     if (isAuthenticated)
//       return (
//         <React.Fragment>
//           <li className="nav-item">
//             {/* <h3> */}
//             <NavLink to={"/settings"} className="nav-link">
//               Settings
//             </NavLink>
//             {/* </h3> */}
//           </li>
//           <li className="nav-item">
//             {/* <h3> */}
//             <NavLink to={"/logout"} className="nav-link">
//               Logout
//             </NavLink>
//             {/* </h3> */}
//           </li>
//         </React.Fragment>
//       );
//   };

//   return (
//     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div class="container-fluid">
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNavAltMarkup"
//           aria-controls="navbarNavAltMarkup"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <div class="navbar-nav">
//             <li className="nav-item">
//               {/* <h3> */}
//               <NavLink to={"/about"} className="nav-link">
//                 About Me
//               </NavLink>
//               {/* </h3> */}
//             </li>
//             <li className="nav-item">
//               {/* <h3> */}
//               <NavLink to={"/skills"} className="nav-link">
//                 My Skills
//               </NavLink>
//               {/* </h3> */}
//             </li>
//             <li className="nav-item">
//               {/* <h3> */}
//               <NavLink to={"/projects"} className="nav-link">
//                 My Projects
//               </NavLink>
//               {/* </h3> */}
//             </li>
//             <li className="nav-item">
//               {/* <h3> */}
//               <NavLink to={"/contact"} className="nav-link">
//                 Contact Me
//               </NavLink>
//               {/* </h3> */}
//             </li>
//             {render()}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
