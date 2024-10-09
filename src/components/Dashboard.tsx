import React, { useState, useEffect, useCallback } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import SuspensionTasks from './SuspensionTasks';
import RecentSuspensions from './RecentSuspensions';

interface User {
  id: string;
  name: string;
  department: string;
  email: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [recentSuspensions, setRecentSuspensions] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    // Simulating API call with pagination
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUsers = Array.from({ length: 20 }, (_, i) => ({
      id: `user-${page}-${i + 1}`,
      name: `User ${(page - 1) * 20 + i + 1}`,
      department: ['IT', 'HR', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)],
      email: `user${(page - 1) * 20 + i + 1}@example.com`,
      status: Math.random() > 0.9 ? 'Suspended' : 'Active'
    }));
    setUsers(prevUsers => [...prevUsers, ...newUsers]);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const storedSuspensions = localStorage.getItem('recentSuspensions');
    if (storedSuspensions) {
      setRecentSuspensions(JSON.parse(storedSuspensions));
    }
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuspensionComplete = (user: User, actions: string[]) => {
    const newSuspension = {
      id: `suspension-${Date.now()}`, // Use timestamp as a unique id
      userId: user.id,
      name: user.name,
      timestamp: new Date().toISOString(),
      actions: actions,
    };
    const updatedSuspensions = [newSuspension, ...recentSuspensions.slice(0, 9)];
    setRecentSuspensions(updatedSuspensions);
    localStorage.setItem('recentSuspensions', JSON.stringify(updatedSuspensions));
    
    setUsers(prevUsers => prevUsers.map(u => 
      u.id === user.id ? { ...u, status: 'Suspended' } : u
    ));
    
    setSelectedUser(prevUser => prevUser ? { ...prevUser, status: 'Suspended' } : null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const loadMoreUsers = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">User Management Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300 flex items-center"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UserList 
          users={filteredUsers} 
          onSelectUser={setSelectedUser} 
          onLoadMore={loadMoreUsers}
          loading={loading}
        />
        {selectedUser && (
          <SuspensionTasks
            user={selectedUser}
            onSuspensionComplete={(actions) => handleSuspensionComplete(selectedUser, actions)}
          />
        )}
        <RecentSuspensions suspensions={recentSuspensions} />
      </div>
    </div>
  );
};

export default Dashboard;