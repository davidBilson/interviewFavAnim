import React, { useState } from 'react';

const Favorite = () => {
  const [animal, setAnimal] = useState('');
  const [adjective, setAdjective] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleChange = event => {
    setAnimal(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const adjectives = ['cute', 'happy', 'playful', 'adorable', 'funny'];
    const fetchRandomAdjective = () => {
      return adjectives[Math.floor(Math.random() * adjectives.length)];
    };
    const fetchImageFromGoogle = async (searchTerm) => {
      const apiKey = 'AIzaSyAABuG_2Mww64YaaAggTHvEk-Edtzrosto';
      const cx = 'c6a7e397e111b4b32';
      const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&cx=${cx}`;
      const response = await fetch(searchUrl);
      const data = await response.json(); 
      const imageUrl = data.items[0].link;
      console.log(imageUrl);
      return imageUrl;
    };
    const adjective = fetchRandomAdjective();
    const imageUrl = fetchImageFromGoogle(`${adjective} ${animal}`);
    setAdjective(adjective);
    setImageUrl(imageUrl);
    console.log(imageUrl);
  }
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <label>
        What is Your Favorite Animal? <br />
        <input type="text" value={animal} className="text" onChange={handleChange} />
      </label>
      <input type="submit" className='submit' value="Submit" />
      {imageUrl &&
        <img src={imageUrl} alt={`${adjective} ${animal}`} />
      }
    </form>
    </div>
  );
};
export default Favorite