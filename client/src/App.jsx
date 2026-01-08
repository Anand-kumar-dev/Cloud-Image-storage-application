import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import ProtectedRoute from "./pages/Protectedroute";
import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "./hooks/Apihooks";
import { setUser, setAuthenticated } from '@/feature/auth/auth.Slice'


function App() {

	

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dash" element={<Dash />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
