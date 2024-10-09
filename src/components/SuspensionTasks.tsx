import React, { useState } from 'react';
import { CheckSquare, Square, Eye, EyeOff, Play } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
}

interface SuspensionTasksProps {
  user: User;
  onSuspensionComplete: (actions: string[]) => void;
}

interface Task {
  id: string;
  label: string;
  selected: boolean;
  completed: boolean;
  inProgress: boolean;
}

const SuspensionTasks: React.FC<SuspensionTasksProps> = ({ user, onSuspensionComplete }) => {
  const [adTasks, setAdTasks] = useState<Task[]>([
    { id: 'password', label: 'Reset Password', selected: false, completed: false, inProgress: false },
    { id: 'groups', label: 'Remove from AD Groups', selected: false, completed: false, inProgress: false },
    { id: 'ou', label: 'Move to Suspended OU', selected: false, completed: false, inProgress: false },
    { id: 'suspend', label: 'Suspend in AD', selected: false, completed: false, inProgress: false },
  ]);

  const [googleTasks, setGoogleTasks] = useState<Task[]>([
    { id: 'gpassword', label: 'Change Google Password', selected: false, completed: false, inProgress: false },
    { id: 'gou', label: 'Move Google OU', selected: false, completed: false, inProgress: false },
    { id: 'ggroups', label: 'Remove from Google Groups', selected: false, completed: false, inProgress: false },
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('TempPass123!');
  const [isSuspending, setIsSuspending] = useState(false);

  const toggleTaskSelection = (taskId: string, isAdTask: boolean) => {
    const updateTasks = (tasks: Task[]) =>
      tasks.map(task =>
        task.id === taskId ? { ...task, selected: !task.selected } : task
      );

    if (isAdTask) {
      setAdTasks(updateTasks);
    } else {
      setGoogleTasks(updateTasks);
    }
  };

  const executeSuspensionTasks = async () => {
    setIsSuspending(true);
    
    const executeTasks = async (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
      for (const task of tasks.filter(t => t.selected)) {
        setTasks(prevTasks => 
          prevTasks.map(t => t.id === task.id ? { ...t, inProgress: true } : t)
        );
        
        // Simulate task execution
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTasks(prevTasks => 
          prevTasks.map(t => t.id === task.id ? { ...t, completed: true, inProgress: false } : t)
        );
      }
    };

    await executeTasks(adTasks, setAdTasks);
    await executeTasks(googleTasks, setGoogleTasks);

    setIsSuspending(false);

    // Call onSuspensionComplete with the list of completed actions
    const completedActions = [...adTasks, ...googleTasks]
      .filter(task => task.selected && task.completed)
      .map(task => task.label);
    onSuspensionComplete(completedActions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Suspension Tasks for {user.name}</h2>
      <button
        onClick={executeSuspensionTasks}
        disabled={isSuspending || ![...adTasks, ...googleTasks].some(task => task.selected)}
        className="mb-4 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play size={20} className="mr-2" />
        {isSuspending ? 'Suspending...' : 'Start Suspension Process'}
      </button>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 dark:text-white">Active Directory Tasks</h3>
        <ul>
          {adTasks.map(task => (
            <li key={task.id} className="flex items-center mb-2">
              <button
                onClick={() => toggleTaskSelection(task.id, true)}
                className="mr-2 focus:outline-none"
                disabled={isSuspending}
              >
                {task.selected ? (
                  <CheckSquare className="text-orange-400" size={20} />
                ) : (
                  <Square className="text-gray-400" size={20} />
                )}
              </button>
              <span className={`${task.completed ? 'text-gray-500' : 'dark:text-white'} flex-grow`}>
                {task.label}
              </span>
              {task.inProgress && (
                <span className="text-orange-400 animate-pulse">In Progress...</span>
              )}
              {task.completed && (
                <span className="text-green-500">Completed</span>
              )}
              {task.id === 'password' && task.completed && (
                <div className="ml-2 flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={generatedPassword}
                    readOnly
                    className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2 dark:text-white"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2 dark:text-white">Google Tasks</h3>
        <ul>
          {googleTasks.map(task => (
            <li key={task.id} className="flex items-center mb-2">
              <button
                onClick={() => toggleTaskSelection(task.id, false)}
                className="mr-2 focus:outline-none"
                disabled={isSuspending}
              >
                {task.selected ? (
                  <CheckSquare className="text-orange-400" size={20} />
                ) : (
                  <Square className="text-gray-400" size={20} />
                )}
              </button>
              <span className={`${task.completed ? 'text-gray-500' : 'dark:text-white'} flex-grow`}>
                {task.label}
              </span>
              {task.inProgress && (
                <span className="text-orange-400 animate-pulse">In Progress...</span>
              )}
              {task.completed && (
                <span className="text-green-500">Completed</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuspensionTasks;