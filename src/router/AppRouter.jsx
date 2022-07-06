import { HashRouter as Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { HeroesRoutes } from "../heroes"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                {/* <Route path="login" element={<LoginPage />} /> */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
                />

                {/* Otra via de usar la ruta publica */}
                {/* <Route path="login/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<LoginPage />} />
                        </Routes>
                    </PublicRoute>
                }
                /> */}

                {/* <Route path="/*" element={<HeroesRoutes />} /> */}
                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                } />

            </Routes>
        </>
    )
}
