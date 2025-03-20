import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Item {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface Nfe {
  id: number;
  numero: string;
  dataEmissao: string;
  itens: Item[];
}

function App() {
  const [nfes, setNfes] = useState<Nfe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  useEffect(() => {
    loadNfes();
  }, []);

  const loadNfes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/nfe');
      console.log('NFes carregadas:', response.data);
      setNfes(response.data);
    } catch (error) {
      console.error('Erro ao carregar NFes:', error);
      setError('Erro ao carregar as notas fiscais. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const cancelarNfe = async (id: number) => {
    try {
      await api.delete(`/api/nfe/${id}`);
      loadNfes();
    } catch (error) {
      console.error('Erro ao cancelar NFe:', error);
      setError('Erro ao cancelar a nota fiscal. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Notas Fiscais Eletrônicas
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {nfes.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Nenhuma nota fiscal encontrada.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Data Emissão</TableCell>
                <TableCell>Qtd. Itens</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nfes.map((nfe) => (
                <TableRow key={nfe.id}>
                  <TableCell>{nfe.numero}</TableCell>
                  <TableCell>{new Date(nfe.dataEmissao).toLocaleDateString()}</TableCell>
                  <TableCell>{nfe.itens.length}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cancelarNfe(nfe.id)}
                    >
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default App;