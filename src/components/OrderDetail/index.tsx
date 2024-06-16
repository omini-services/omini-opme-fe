import EditIcon from '@mui/icons-material/Edit';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { patient, order } from './mock';

const OrderDetail = () => {
  const { id } = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box sx={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
          {[
            {
              title: 'Geral',
              content: (
                <>
                  <Typography variant="body2">Número: {id}</Typography>
                  <Typography variant="body2">
                    Data de Vencimento: {order.dueDate}
                  </Typography>
                </>
              ),
            },
            {
              title: 'Paciente',
              content: (
                <>
                  <Typography variant="body2">
                    Nome: {patient.firstName} {patient.middleName}{' '}
                    {patient.lastName}
                  </Typography>
                  <Typography variant="body2">CPF: {patient.cpf}</Typography>
                  <Typography variant="body2">
                    Comentários: {patient.comments}
                  </Typography>
                </>
              ),
            },
            {
              title: 'Médico',
              content: (
                <Typography variant="body2">
                  Nome: {order.physicianName}
                </Typography>
              ),
            },
            {
              title: 'Hospital',
              content: (
                <Typography variant="body2">
                  Nome: {order.hospitalName}
                </Typography>
              ),
            },
            {
              title: 'Convênio',
              content: (
                <>
                  <Typography variant="body2">
                    Nome: {order.insuranceCompanyName}
                  </Typography>
                  <Typography variant="body2">
                    ID do Convênio: {order.insuranceCompanyId}
                  </Typography>
                  <Typography variant="body2">
                    Especialista Interno: {order.internalSpecialistName}
                  </Typography>
                  <Typography variant="body2">
                    ID do Especialista: {order.internalSpecialistId}
                  </Typography>
                </>
              ),
            },
          ].map((section) => (
            <Paper
              key={section.title}
              elevation={1}
              sx={{
                mb: 2,
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                '&:hover': { boxShadow: 3, cursor: 'pointer' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pb: 1,
                  mb: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subheading" sx={{ fontWeight: 'bold' }}>
                  {section.title}
                </Typography>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Box>
              <Box sx={{ px: 1 }}>{section.content}</Box>
            </Paper>
          ))}
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: 'lightgray',
              textAlign: 'right',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">
              Total: R$ {order.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Código Anvisa</TableCell>
                <TableCell>Validade Anvisa</TableCell>
                <TableCell>Código Fornecedor</TableCell>
                <TableCell>CST</TableCell>
                <TableCell>Código SUS</TableCell>
                <TableCell>Código NCM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>{item.anvisaCode}</TableCell>
                  <TableCell>{item.anvisaDueDate}</TableCell>
                  <TableCell>{item.supplierCode}</TableCell>
                  <TableCell>{item.cst}</TableCell>
                  <TableCell>{item.susCode}</TableCell>
                  <TableCell>{item.ncmCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderDetail;
