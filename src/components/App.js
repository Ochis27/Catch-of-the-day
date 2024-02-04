import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, off, update as firebaseUpdate } from 'firebase/database';
import { database } from '../base';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

const App = () => {
    const [fishes, setFishes] = useState({});
    const [order, setOrder] = useState({});
    const { storeId } = useParams();

    useEffect(() => {
        const fishesRef = ref(database, `${storeId}/fishes`);

        onValue(fishesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setFishes(data);
        });

        const localStorageRef = localStorage.getItem(storeId);
        if (localStorageRef) {
            setOrder(JSON.parse(localStorageRef));
        }

        return () => {
            off(fishesRef);
        };
    }, [storeId]);

    useEffect(() => {
        localStorage.setItem(storeId, JSON.stringify(order));
    }, [order, storeId]);

    const addFish = fish => {
        const newFishKey = `fish${Date.now()}`;
        setFishes(prevFishes => ({
            ...prevFishes,
            [newFishKey]: fish
        }));
        firebaseUpdate(ref(database, `${storeId}/fishes/${newFishKey}`), fish);
    };

    const loadSampleFishes = () => {
        setFishes(sampleFishes);
        firebaseUpdate(ref(database, `${storeId}/fishes`), sampleFishes);
    };

    const addToOrder = key => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [key]: prevOrder[key] + 1 || 1
        }));
    };

    const updateFish = (key, updatedFish) => {
        const updatedFishes = { ...fishes };
        updatedFishes[key] = updatedFish;
        setFishes(updatedFishes);
    };

    const deleteFish = key => {
        const updatedFishes = { ...fishes };
        updatedFishes[key] = null;
        setFishes(updatedFishes);

        // Also update Firebase
        firebaseUpdate(ref(database, `${storeId}/fishes`), { [key]: null });
    };

    const removeFromOrder = key => {
        const updatedOrder = { ...order };
        delete updatedOrder[key];
        setOrder(updatedOrder);
    };

    return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="fishes">
                    {Object.keys(fishes).map(key => (
                        <Fish key={key} index={key} details={fishes[key]} addToOrder={addToOrder} />
                    ))}
                </ul>
            </div>
            <Order fishes={fishes} order={order} removeFromOrder={removeFromOrder} />
            <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} updateFish={updateFish} deleteFish={deleteFish} fishes={fishes} />
        </div>
    );
};


export default App;
