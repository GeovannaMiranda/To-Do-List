import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  ThemeProvider,
  ImageList,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../App';
import { Image } from '@mui/icons-material';
interface LoginProps {
  onToggleMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
           <img 
              src="/images/logo.png" 
              alt="Logo"            
              onError={() => console.log('Erro ao carregar imagem')}
            />
          </Box>
          <Typography component="h1" variant="h4" align="center" color="#510C76" gutterBottom>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ThemeProvider theme={theme}>
            <Button
              type="submit"
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            </ThemeProvider>
            <Box textAlign="center">
              <Link
                color="#510C76"
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleMode();
                }}
              >
                Não tem uma conta? Cadastre-se
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

