import React, { useState } from 'react';

import './index.css';

export default function App() {
    return (
        <>
            <MyHeader />
            <NoteList />
        </>
    );
}

let giveId = 0;
let elements = [], setElements;

function NoteList() {


    let currentData = {
        id: 0,
        heading: "Default Note",
        content: "This is how your note will look like."
    };

    let myState = useState([<Note key={currentData.id} {...currentData}></Note>]);

    elements = myState[0];
    setElements = myState[1];


    function deleteFromList(content) {
        // console.log('%c called ' + content, 'color:red;');
        // console.log(elements);
        let newElements = [];
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].props.id !== content) newElements.push(elements[i]);
        }
        elements = newElements;
        setElements(newElements);
    }

    function Note({ heading, content, id }) {
        return (
            <div className="card">
                <h3>{heading}</h3>
                <p>{content}</p>
                <br />
                <button className="delete" onClick={() => { deleteFromList(id) }}>X</button>
            </div>
        );
    }

    function updateList() {
        // console.log(giveId);
        giveId = giveId + 1;
        currentData = {
            id: giveId,
            heading: "Note " + giveId,
            content: document.getElementsByTagName('input')[0].value
        };
        // console.log(currentData);
        const newElements = [...elements];
        newElements.push(<Note key={currentData.id} {...currentData}></Note>);
        // console.log(elements);
        // console.log(newElements);
        elements = newElements;
        setElements(elements);
    }

    function MyInput() {
        return (
            <section className="card">
                <input type="text" placeholder="Enter Your Note Here"></input>
                <br></br>
                <br></br>
                <button className="save" onClick={updateList}>Save</button>
            </section>
        );
    }

    return <>{elements}<MyInput /></>;
}


function MyHeader() {
    return (
        <section className="myHeader">
            <h1>Note App</h1>
        </section>
    );
}