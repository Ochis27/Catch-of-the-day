import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import StorePicker from "./StorePicker";
import NotFound from "./NotFound";
import App from "./App";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<StorePicker />} />
                <Route path="/store/:storeId" element={<App />} />
                <Route element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;