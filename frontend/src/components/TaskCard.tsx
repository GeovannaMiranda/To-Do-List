import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Checkbox,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TodoTask } from '../types';

interface TaskCardProps {
  task: TodoTask;
  onToggleComplete: (task: TodoTask) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        opacity: task.isCompleted ? 0.7 : 1,
        backgroundColor: task.isCompleted ? '#f5f5f5' : 'white'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
            <Checkbox
              checked={task.isCompleted}
              onChange={() => onToggleComplete(task)}
              sx={{ mt: -1, mr: 1 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  mb: 1
                }}
              >
                {task.title}
              </Typography>
              
              {task.description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    textDecoration: task.isCompleted ? 'line-through' : 'none'
                  }}
                >
                  {task.description}
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip 
                  label={task.category} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Criado em: {formatDate(task.createdAt)}
                {task.updatedAt !== task.createdAt && (
                  <> • Atualizado em: {formatDate(task.updatedAt)}</>
                )}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton 
              size="small" 
              onClick={() => onEdit(task)}
              sx={{ mb: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onDelete(task.id)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

