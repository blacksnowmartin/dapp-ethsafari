import React, { useState } from 'react';
import axios from 'axios';

const StoryQualityChecker = () => {
  const [story, setStory] = useState('');
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkQuality = async () => {
    setLoading(true);
    try {
      // Replace with actual API endpoint for ORA AI Swisstronik plugin
      const response = await axios.post('https://api.ora-ai.swisstronik.com/check-story-quality', { story });
      setQuality(response.data.quality);
    } catch (error) {
      console.error('Error checking story quality:', error);
      setQuality('Error occurred while checking quality');
    }
    setLoading(false);
  };

  return (
    <div className="story-quality-checker">
      <h1>Story Quality Checker</h1>
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Enter your story here..."
        rows={10}
        cols={50}
      />
      <button onClick={checkQuality} disabled={loading}>
        {loading ? 'Checking...' : 'Check Quality'}
      </button>
      {quality && (
        <div className="quality-result">
          <h2>Quality Assessment:</h2>
          <p>{quality}</p>
        </div>
      )}
    </div>
  );
};

export default StoryQualityChecker;
