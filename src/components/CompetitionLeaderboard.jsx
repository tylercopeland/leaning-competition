import React, { useState } from 'react';

export default function CompetitionLeaderboard({ users, sortBy = 'alphabetical' }) {
  const [currentSort, setCurrentSort] = useState(sortBy);

  // Calculate total questions (assuming questions are separated by newlines)
  const totalQuestions = users.length > 0 && users[0].totalQuestions 
    ? users[0].totalQuestions 
    : 10; // Default fallback

  // Calculate ranks if not already set (for when sorting by rank)
  const usersWithRanks = users.map(user => {
    if (!user.rank && currentSort === 'rank') {
      // Calculate rank based on performance
      const betterUsers = users.filter(u => {
        if (u.correct > user.correct) return true;
        if (u.correct === user.correct && u.completed > user.completed) return true;
        if (u.correct === user.correct && u.completed === user.completed) {
          const uAccuracy = u.completed > 0 ? u.correct / u.completed : 0;
          const userAccuracy = user.completed > 0 ? user.correct / user.completed : 0;
          return uAccuracy > userAccuracy;
        }
        return false;
      });
      return { ...user, rank: betterUsers.length + 1 };
    }
    return user;
  });

  // Sort users based on current sort option
  const sortedUsers = [...usersWithRanks].sort((a, b) => {
    if (currentSort === 'alphabetical') {
      return a.fullName.localeCompare(b.fullName);
    } else if (currentSort === 'rank') {
      // Sort by rank (lower rank number = better)
      const aRank = a.rank || 999;
      const bRank = b.rank || 999;
      if (aRank !== bRank) return aRank - bRank;
      // If same rank, sort alphabetically
      return a.fullName.localeCompare(b.fullName);
    } else if (currentSort === 'progress') {
      // Sort by progress percentage (higher = better)
      const aProgress = totalQuestions > 0 ? a.completed / totalQuestions : 0;
      const bProgress = totalQuestions > 0 ? b.completed / totalQuestions : 0;
      if (bProgress !== aProgress) return bProgress - aProgress;
      // If same progress, sort by correct answers
      if (b.correct !== a.correct) return b.correct - a.correct;
      // Then alphabetically
      return a.fullName.localeCompare(b.fullName);
    }
    return 0;
  });

  return (
    <div className="flex flex-col">
      {/* Sort Options */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-gray-600">Sort by:</span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentSort('alphabetical')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentSort === 'alphabetical'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Name
          </button>
          <button
            onClick={() => setCurrentSort('rank')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentSort === 'rank'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Rank
          </button>
          <button
            onClick={() => setCurrentSort('progress')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentSort === 'progress'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Progress
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-2 pb-2">
        {sortedUsers.map((user, index) => {
          return (
            <div
              key={user.fullName}
              className="bg-white border border-gray-200 rounded-lg px-3 pt-3 pb-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Rank Badge */}
                  {currentSort === 'rank' && user.rank && (
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      user.rank === 1 
                        ? 'bg-yellow-100 text-yellow-700'
                        : user.rank === 2
                        ? 'bg-gray-100 text-gray-700'
                        : user.rank === 3
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                  )}
                  
                  {/* Completion Icon */}
                  {(user.isCompleted || user.completed === totalQuestions) && (
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Name */}
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">
                      {user.fullName}
                    </span>
                    {currentSort === 'rank' && user.rank && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        Rank #{user.rank}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-600 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{user.completed}/{totalQuestions}</div>
                    <div className="text-gray-500">Completed</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{user.correct}</div>
                    <div className="text-gray-500">Correct</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

