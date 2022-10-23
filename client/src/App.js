import React from "react";

import Nav from "./components/Nav";

import { UserContextProvider } from "./context/User";

//public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

//private pages
import Lists from "./pages/private/Lists";
import List from "./pages/private/List";
import Create from "./pages/private/Create";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useParams,
  // Outlet,
} from "react-router-dom";

//env
require("dotenv").config();

export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/password-reset" element={<ResetPassword />}></Route>
            <Route path="/app" element={<Lists />}></Route>
            <Route path="/list/:_id" element={<List />}></Route>
            <Route path="/list/new" element={<Create />}></Route>
            {/* <Route path="/topics" element={<Topics />}>
            <Route path={`:topicId`} element={<Topic />}></Route>
            <Route
              index
              path="*"
              element={<h3>Please select a topic.</h3>}
            ></Route>
          </Route> */}
            <Route path="*" index element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`/topics/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`/topics/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>
//       <Outlet />
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
