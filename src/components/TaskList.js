import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/tasksSlice.js';
import { List, Button, Input, Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('dueDate');

  const filteredTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => 
      filterStatus === 'All' || task.status === filterStatus
    )
    .sort((a, b) => 
      sortField === 'priority' ? a.priority.localeCompare(b.priority) : new Date(a.dueDate) - new Date(b.dueDate)
    );

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex space-x-4 mb-4">
        <Input 
          placeholder="Search tasks" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="p-3border rounded w-full"
        />
        <Select 
          value={filterStatus} 
          onChange={(value) => setFilterStatus(value)} 
          className=" rounded w-full"
        >
          <Option value="All">All</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
        <Select 
          value={sortField} 
          onChange={(value) => setSortField(value)} 
          
        >
          <Option value="dueDate">Due Date</Option>
          <Option value="priority">Priority</Option>
        </Select>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Button onClick={() => dispatch(deleteTask(task.id))} className="bg-red-500 text-white py-1 px-2 rounded">Delete</Button>,
              <Button onClick={() => dispatch(updateTask({ ...task, status: task.status === 'In Progress' ? 'Completed' : 'In Progress' }))} className="bg-green-500 text-white py-1 px-2 rounded">
                {task.status === 'In Progress' ? 'Complete' : 'Reopen'}
              </Button>
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={`${task.description} - Due: ${dayjs(task.dueDate).format('YYYY-MM-DD')}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
