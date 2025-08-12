import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  ThemeProvider,
} from '@mui/material';
import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { TodoTask } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { taskService } from '../services/taskService';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { theme } from '../App';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TodoTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, [selectedCategory]);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const tasksData = await taskService.getTasks(selectedCategory || undefined);
      setTasks(tasksData);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await taskService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleCreateTask = async (taskData: any) => {
    try {
      await taskService.createTask(taskData);
      setIsFormOpen(false);
      loadTasks();
      loadCategories();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    
    try {
      await taskService.updateTask(editingTask.id, taskData);
      setEditingTask(null);
      setIsFormOpen(false);
      loadTasks();
      loadCategories();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await taskService.deleteTask(taskId);
      loadTasks();
      loadCategories();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleToggleComplete = async (task: TodoTask) => {
    try {
      await taskService.updateTask(task.id, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      loadTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleEditTask = (task: TodoTask) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const completedTasks = tasks.filter(task => task.isCompleted);
  const pendingTasks = tasks.filter(task => !task.isCompleted);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: '#510C76' }}>
             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, my: 2 }}>
                     <img 
                        src="/images/logo.png" 
                        alt="Logo"
                        width={150}
                        height={80}
                        onError={() => console.log('Erro ao carregar imagem')}
                      />
              </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,  mx: 2 }}>
            To Do List App - Olá, {user?.username}!
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Minhas Tarefas
          </Typography>
          <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
          >
            Nova Tarefa
          </Button>
          </ThemeProvider>
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por categoria</InputLabel>
            <Select
              value={selectedCategory}
              label="Filtrar por categoria"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Todas as categorias</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Pendentes
              </Typography>
              <Chip 
                label={pendingTasks.length} 
                color="warning" 
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
            {pendingTasks.length === 0 && (
              <Typography variant="body1" color="text.secondary">
                Nenhuma tarefa pendente
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Concluídas
              </Typography>
              <Chip 
                label={completedTasks.length} 
                color="success" 
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
            {completedTasks.length === 0 && (
              <Typography variant="body1" color="text.secondary">
                Nenhuma tarefa concluída
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>

      <TaskForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </>
  );
};

export default TaskList;

