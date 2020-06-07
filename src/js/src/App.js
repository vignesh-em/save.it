/*
 * Copyright 2020 Vignesh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import './App.css';
import Board from "./components/Board";
import {Switch, Route, Redirect} from "react-router-dom";

function App() {

    function getRandomString() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const randomKey = getRandomString()

    return (
        <>
            <header className="header">
                <h1 className="app-title">save.it</h1>
                <h3 className="app-subtitle">a clipboard for the web</h3>
            </header>
            <Switch>
                <Route exact path="/">
                    <Redirect to={randomKey}/>
                </Route>
                <Route exact path="/:key">
                    <Board/>
                </Route>
            </Switch>
            <footer className="footer">
                <p>Copyrights &copy; 2020</p>
            </footer>
        </>
    );
}

export default App;
