import { useState } from 'react';
import UpdateReport from './UpdateReport';

const ReportForm = () => {
  const [name, setName] = useState('');
  const [sumOfLikes, setSumOfLikes] = useState('');
  const [sumOfComments, setSumOfComments] = useState('');
  const [sumOfEngagements, setSumOfEngagements] = useState('');
  const [noOfPosts, setNoOfPosts] = useState('');
  const [avgEngagementRate, setAvgEngagementRate] = useState('');
  const [followerCount, setFollowerCount] = useState('');
  const [addLoading, setAddLoading] = useState(false); // State for add report loading
  const [addStatus, setAddStatus] = useState(null); // State for add report status

  const handleAddReport = async (e) => {
    e.preventDefault();

    // Validate the form - Check if values are valid (not zero or negative)
    if (!name || !sumOfLikes || !sumOfComments || !sumOfEngagements || !noOfPosts || !avgEngagementRate || !followerCount) {
      setAddStatus('Please fill in all the fields before submitting the report.');
      return;
    }

    if (sumOfLikes <= 0 || sumOfComments <= 0 || sumOfEngagements <= 0 || noOfPosts <= 0 || avgEngagementRate <= 0 || followerCount <= 0) {
      setAddStatus('All values must be greater than zero.');
      return;
    }

    setAddLoading(true);
    setAddStatus(null); // Clear previous add status

    const reportData = {
      Name: name,
      SumOfLikes: parseInt(sumOfLikes),
      SumOfComments: parseInt(sumOfComments),
      SumOfEngagements: parseInt(sumOfEngagements),
      NoOfPosts: parseInt(noOfPosts),
      AvgEngagementRate: parseFloat(avgEngagementRate),
      FollowerCount: parseInt(followerCount),
    };

    try {
      const response = await fetch('/report/addReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('Failed to add report');
      }

      setAddStatus('Report added successfully!');
    } catch (error) {
      console.error('Error adding report:', error);
      setAddStatus('Failed to add report.');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-xl mb-5">
        <UpdateReport/>
      <h3 className="text-xl font-bold mb-4">Add Report</h3>
      <form onSubmit={handleAddReport} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="sumOfLikes">
            Sum of Likes
          </label>
          <input
            type="number"
            id="sumOfLikes"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter sum of likes"
            value={sumOfLikes}
            onChange={(e) => setSumOfLikes(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="sumOfComments">
            Sum of Comments
          </label>
          <input
            type="number"
            id="sumOfComments"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter sum of comments"
            value={sumOfComments}
            onChange={(e) => setSumOfComments(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="sumOfEngagements">
            Sum of Engagements
          </label>
          <input
            type="number"
            id="sumOfEngagements"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter sum of engagements"
            value={sumOfEngagements}
            onChange={(e) => setSumOfEngagements(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="noOfPosts">
            Number of Posts
          </label>
          <input
            type="number"
            id="noOfPosts"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter number of posts"
            value={noOfPosts}
            onChange={(e) => setNoOfPosts(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="avgEngagementRate">
            Average Engagement Rate
          </label>
          <input
            type="number"
            step="any"
            id="avgEngagementRate"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter average engagement rate"
            value={avgEngagementRate}
            onChange={(e) => setAvgEngagementRate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="followerCount">
            Follower Count
          </label>
          <input
            type="number"
            id="followerCount"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter follower count"
            value={followerCount}
            onChange={(e) => setFollowerCount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          {addLoading ? 'Adding Report...' : 'Add Report'}
        </button>
      </form>

      {addStatus && (
        <div
          className={`mt-5 p-4 rounded-lg ${
            addStatus.includes('successfully')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {addStatus}
        </div>
      )}
    </div>
  );
};

export default ReportForm;