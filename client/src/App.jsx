import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import ProtectedRoute from "./pages/Protectedroute";
import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "./hooks/Apihooks";
import { setUser, setAuthenticated } from '@/feature/auth/auth.Slice'
import Imageview from "./pages/Imageview";
import Settings from "./pages/Settings";


function App() {
  const dispatch = useDispatch();	
  const { request } = useApi();	
  const [authChecked, setAuthChecked] = useState(false);	
	useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await request({
        url: "/auth/me",
        method: "GET",
      });
      console.log("Auth check response:", res);

      dispatch(setUser(res.mes));
      dispatch(setAuthenticated(true));
    } catch {
      dispatch(setAuthenticated(false));
    } finally {
      setAuthChecked(true);
    }
  };

  checkAuth();
}, []);


	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route element={<ProtectedRoute authChecked={authChecked}/>}>
					<Route path="/media" element={<Dash />} />
          <Route path="/media/:mediaId" element={<Imageview />} />
          <Route path="/settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
