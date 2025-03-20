import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNfe, setSelectedNfe] = useState<Nfe | null>(null);

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

  const handleOpenDialog = (nfe: Nfe) => {
    setSelectedNfe(nfe);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNfe(null);
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
                      color="primary"
                      size="small"
                      onClick={() => handleOpenDialog(nfe)}
                    >
                      Detalhes
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cancelarNfe(nfe.id)}
                      sx={{ ml: 2 }}
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

      {/* Dialog for displaying NFe details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalhes da NFe: {selectedNfe?.numero}</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Valor Unitário</TableCell>
                <TableCell>Valor Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedNfe?.itens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{item.valorUnitario.toFixed(2)}</TableCell>
                  <TableCell>{item.valorTotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
