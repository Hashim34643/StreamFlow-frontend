import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesPage.css';

const CategoriesPage = () => {
    const categories = [
        { name: 'Fortnite', image: '/images/Fortnite.jpg' },
        { name: 'Minecraft', image: '/images/Minecraft.jpg' },
        { name: 'League of Legends', image: '/images/League of Legends.jpg' },
        { name: 'Chatting', image: '/images/Chatting.jpg' },
        { name: 'In Real Life', image: '/images/In Real Life.jpg' },
    ];

    return (
        <div className="categories-container">
            <div className="grid-container">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <img src={category.image} alt={category.name} className="category-image"/>
                        <div className="category-name">{category.name}</div>
                    </div>
                ))}
            </div>
            <p className="more-categories">Many more categories to come. Stay tuned!</p>
        </div>
    );
};

export default CategoriesPage;
