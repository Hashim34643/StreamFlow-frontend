import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import '../styles/Categories.css';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([
        { name: 'Fortnite', image: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2018/01/23/123820ee-354e-4af9-bd03-b29047d40292/fortnite-battle-royale-characters', viewers: 0 },
        { name: 'Minecraft', image: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f', viewers: 0 },
        { name: 'League of Legends', image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b', viewers: 0 },
        { name: 'Chatting', image: 'https://media.wired.com/photos/620eb0f39266d5d11c07b3c5/4:3/w_1908,h_1431,c_limit/Gear-Podcast-Gear-1327244548.jpg', viewers: 0 },
        { name: 'In Real Life', image: 'https://www.popsci.com/uploads/2019/05/24/Q3YG6KFP4QASEL2NONFEULT3YM.jpg?auto=webp', viewers: 0 },
    ]);

    useEffect(() => {
        axios.get('https://streamflow-backend.onrender.com/streams')
            .then(response => {
                const liveStreams = response.data.streams;
                const updatedCategories = categories.map(category => {
                    const totalViewers = liveStreams
                        .filter(stream => stream.category === category.name)
                        .reduce((acc, stream) => acc + stream.currentViewers, 0);
                    return { ...category, viewers: totalViewers };
                });
                setCategories(updatedCategories);
            })
    }, []);

    return (
        <div>
            <Header />
            <div className="categories-container">
                <h1 className="categories-title">Select a Category</h1>
                <div className="grid-container">
                    {categories.map((category, index) => (
                        <div key={index} className="category-card">
                            <img src={category.image} alt={category.name} className="category-image" />
                            <div className="category-name">{category.name}</div>
                            <div className="viewer-count">{category.viewers} viewers</div>
                        </div>
                    ))}
                </div>
                <p className="more-categories">Many more categories to come. Stay tuned!</p>
            </div>
        </div>
    );
};

export default CategoriesPage;
