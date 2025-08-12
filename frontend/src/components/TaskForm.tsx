import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  ThemeProvider,
} from '@mui/material';
import { TodoTask, CreateTaskDto, UpdateTaskDto } from '../types';
import { theme } from '../App';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskDto | UpdateTaskDto) => void;
  task?: TodoTask | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setIsCompleted(task.isCompleted);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setIsCompleted(false);
    }
    setErrors({});
  }, [task, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (title.length > 200) {
      newErrors.title = 'Título deve ter no máximo 200 caracteres';
    }

    if (description.length > 1000) {
      newErrors.description = 'Descrição deve ter no máximo 1000 caracteres';
    }

    if (!category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    } else if (category.length > 50) {
      newErrors.category = 'Categoria deve ter no máximo 50 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      ...(task && { isCompleted }),
    };

    onSubmit(taskData);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {task ? 'Editar Tarefa' : 'Nova Tarefa'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              label="Título"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              inputProps={{ maxLength: 200 }}
            />
            
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              inputProps={{ maxLength: 1000 }}
            />
            
            <TextField
              label="Categoria"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              error={!!errors.category}
              helperText={errors.category}
              inputProps={{ maxLength: 50 }}
              placeholder="Ex: Trabalho, Pessoal, Estudos"
            />
            
            {task && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                  />
                }
                label="Tarefa concluída"
              />
            )}
          </Box>
        </DialogContent>
        
          <ThemeProvider theme={theme}>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              {task ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogActions>
          </ThemeProvider>
      </form>
    </Dialog>
  );
};

export default TaskForm;

