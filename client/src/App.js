import React from "react";
import Nav from "./components/Nav";

//public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

//private pages
import Todos from "./pages/private/Todos";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useParams,
  // Outlet,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/app" element={<Todos />}></Route>
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
