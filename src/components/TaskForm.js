import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice.js';
import { Input, Button, DatePicker, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('In Progress');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now(), title, description, dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null, priority, status }));
    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority('Low');
    setStatus('In Progress');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <Input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
        className="p-5 border rounded w-full"
      />
      <TextArea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
        className="p-4 border rounded w-full"
      />
      <DatePicker 
        value={dueDate} 
        onChange={(date) => setDueDate(date)} 
        required 
        className="p-2 border rounded w-full"
      />
      <Select 
        value={priority} 
        onChange={(value) => setPriority(value)} 
        className="w-full"
      >
        <Option value="Low">Low</Option>
        <Option value="Medium">Medium</Option>
        <Option value="High">High</Option>
      </Select>
      <Select 
        value={status} 
        onChange={(value) => setStatus(value)} 
        className="w-full"
      >
        <Option value="In Progress">In Progress</Option>
        <Option value="Completed">Completed</Option>
      </Select>
      <Button 
        type="primary" 
        htmlType="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
