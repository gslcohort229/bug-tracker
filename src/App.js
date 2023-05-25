import React, { useState, useEffect } from 'react';
// Import Firestore functions for interacting with your database
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// Import Firestore instance (db)
import db from './firebase';
import './App.css';

// Custom hook to fetch bugs from Firestore
function useBugs() {
    // Set initial state for bugs
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        // Subscribe to Firestore bugs collection updates
        const unsubscribe = onSnapshot(collection(db, 'bugs'), (snapshot) => {
            // Map over the returned docs and create an array of bugs
            const newBugs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Update bugs state with the new bugs
            setBugs(newBugs);
        });

        // Unsubscribe from Firestore updates when component unmounts
        return unsubscribe;
    }, []);

    // Return the bugs array to the component that uses this hook
    return bugs;
}

// Function to add a bug to the Firestore collection
function addBug(title, description) {
    // Add a new document to the 'bugs' collection
    addDoc(collection(db, 'bugs'), {
        title,
        description,
        status: 'Open'
    });
}

// Function to delete a bug from the Firestore collection
function deleteBug(id) {
    // Delete a document from the 'bugs' collection
    deleteDoc(doc(db, 'bugs', id));
}

// Function to update a bug in the Firestore collection
function updateBug(id, status) {
    // Update a document in the 'bugs' collection
    updateDoc(doc(db, 'bugs', id), {status});
}

// Main App function component
function App() {
    // Use the custom hook to fetch bugs from Firestore
    const bugs = useBugs();
    // Initialize state for bug title and description
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <h1>Bug-Tracker</h1>

            <form onSubmit={(e) => {
                e.preventDefault(); // Prevent page refresh
                addBug(title, description); // Add the bug to Firestore
                setTitle(''); // Clear the title input
                setDescription(''); // Clear the description input
            }}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bug title" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bug description" />
                <button type="submit">Add bug</button>
            </form>

            <ul>
                {bugs.map((bug) => (
                    <li key={bug.id}>
                        <h2>{bug.title}</h2>
                        <p>{bug.description}</p>
                        <p>Status: {bug.status}</p>
                        <select value={bug.status} onChange={e => updateBug(bug.id, e.target.value)}>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                        <button onClick={() => deleteBug(bug.id)}>Delete Bug</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
