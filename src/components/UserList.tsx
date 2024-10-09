import React from 'react';
import { User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  department: string;
  email: string;
  status: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onLoadMore: () => void;
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, onLoadMore, loading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">User List</h2>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="mb-2 p-2 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center">
                <User className="mr-2 text-gray-500 dark:text-gray-400" size={20} />
                <div>
                  <p className="font-medium dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.department}</p>
                  <p className={`text-sm ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                    {user.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Loading...</p>
        ) : (
          <button
            onClick={onLoadMore}
            className="w-full mt-4 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;