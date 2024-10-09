import React from 'react';
import { Clock, User } from 'lucide-react';

interface SuspendedUser {
  id: string;
  userId: string;
  name: string;
  timestamp: string;
  actions: string[];
}

interface RecentSuspensionsProps {
  suspensions: SuspendedUser[];
}

const RecentSuspensions: React.FC<RecentSuspensionsProps> = ({ suspensions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
        <Clock className="mr-2" />
        Recent Suspensions
      </h2>
      {suspensions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No recent suspensions</p>
      ) : (
        <ul>
          {suspensions.map((suspension) => (
            <li key={suspension.id} className="mb-4 border-b dark:border-gray-700 pb-2">
              <div className="flex items-center mb-2">
                <User className="mr-2 text-gray-500 dark:text-gray-400" size={20} />
                <span className="font-medium dark:text-white">{suspension.name}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Suspended on: {new Date(suspension.timestamp).toLocaleString()}
              </p>
              <p className="text-sm font-medium dark:text-white">Actions performed:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {suspension.actions.map((action, index) => (
                  <li key={`${suspension.id}-action-${index}`}>{action}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentSuspensions;