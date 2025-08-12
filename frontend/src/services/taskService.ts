import api from './api';
import { TodoTask, CreateTaskDto, UpdateTaskDto } from '../types';

export const taskService = {
  async getTasks(category?: string): Promise<TodoTask[]> {
    const params = category ? { category } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  async getTask(id: number): Promise<TodoTask> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(taskData: CreateTaskDto): Promise<TodoTask> {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  async updateTask(id: number, taskData: UpdateTaskDto): Promise<void> {
    await api.put(`/tasks/${id}`, taskData);
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/tasks/categories');
    return response.data;
  },
};

