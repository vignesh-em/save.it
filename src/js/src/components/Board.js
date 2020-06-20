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
import {CopyToClipboard} from "react-copy-to-clipboard";

function Board() {

    const {key} = useParams()

    const [contentKey, setContentKey] = useState(key)
    const [content, setContent] = useState("")
    const [saveStatus, setSaveStatus] = useState(0)
    const [expiry, setExpiry] = useState(5)

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

    function handleContentChange(event) {
        setContent(event.target.value)
    }

    async function saveContent(contentKey, content, expiresIn) {
        const requestBody = {
            key: contentKey,
            content,
            expiresIn
        }

        const response = await fetch("http://localhost:8080/api/v1/save/", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (response.status === 200) {
            setSaveStatus(1)
        } else {
            setSaveStatus(2)
        }
    }

    function handleSaveClick() {
        setSaveStatus(0)
        saveContent(contentKey, content, expiry)
    }

    function handleExpiryTimeChange(event) {
        let value = event.target.value;
        setExpiry(value > 10 ? 10 : value)
    }

    return (
        <main className="main">
            <div className="button-container">
                <div className="button" onClick={handleSaveClick}>Save It</div>
                <div className="input-box">
                    <label htmlFor="expiryMinutes" style={{'font-weight': 'bold'}}>Expires in (10 minutes max)</label>
                    <input style={{'text-align': 'center'}} min={0} max={10} id="expiryMinutes" type="number"
                           onChange={handleExpiryTimeChange} value={expiry}/>
                </div>
                <CopyToClipboard text={content}>
                    <div className="button">Copy It</div>
                </CopyToClipboard>
            </div>
            {
                saveStatus !== 0 &&
                <p className="status-text">
                    {saveStatus === 1 && "Successfully added!"}
                    {saveStatus === 2 && "Something went wrong!"}
                </p>

            }
            <textarea className="content-text-area" value={content} onChange={handleContentChange}/>
        </main>
    )
}

export default Board