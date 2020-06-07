/*
 * Copyright 2020 Vignesh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"

function Board() {

    const {key} = useParams()

    const [contentKey, setContentKey] = useState(key)
    const [content, setContent] = useState("")

    async function getContent(contentKey) {
        const response = await fetch("http://localhost:8080/api/v1/save/" + contentKey)
        const result = await response.json()
        setContentKey(result.key)
        console.log(result)
        if (typeof result.content === "undefined") {
            setContent("")
        } else {
            setContent(result.content)
        }
    }

    useEffect(() => {
        getContent(contentKey)
    }, [])

    function handleTextChange(event) {
        setContent(event.target.value)
    }

    return (
        <main className="main">
            <div className="button-container">
                <div className="button">Save It</div>
                <div className="button">Copy It</div>
            </div>
            <textarea className="content-text-area" value={content} onChange={handleTextChange}/>
        </main>
    )
}

export default Board