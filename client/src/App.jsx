import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import ProtectedRoute from "./pages/Protectedroute";
import { Children } from "react";

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
