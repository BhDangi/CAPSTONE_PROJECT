import React from 'react';

const TrackSubsidy = () => {
  return (
    <div>
      <h1>Track Your Subsidy</h1>
      <p>Enter your application ID to check the status of your subsidy:</p>
      <form>
        <label>
          Application ID:
          <input type="text" name="applicationId" required />
        </label>
        <br />
        <button type="submit">Track Status</button>
      </form>
    </div>
  );
};

export default TrackSubsidy;
