import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
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

  useEffect(() => {
    loadNfes();
  }, []);

  const loadNfes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/nfe');
      setNfes(response.data);
    } catch (error) {
      console.error('Erro ao carregar NFes:', error);
    }
  };

  const cancelarNfe = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/nfe/${id}`);
      loadNfes();
    } catch (error) {
      console.error('Erro ao cancelar NFe:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Notas Fiscais Eletrônicas
      </Typography>
      
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
    </Container>
  );
}

export default App;