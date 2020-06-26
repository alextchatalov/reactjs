import React, {useEffect, useState} from 'react'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import api from '../services/api'
import Button from '@material-ui/core/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Moment from 'react-moment';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders( {list}) {

  const classes = useStyles();

  function onChangeHandler(e) {
    console.log("UPLOAD")
    console.log(e.target.files[0])
    const fd = new FormData();
    fd.append('files', e.target.files[0])
   // api.post("/investiment/upload",fd).then(res => getAllInvestiments())
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        component="label">
        Upload
        <input
          type="file"
          style={{ display: "none" }}
          onChange={onChangeHandler}/>
      </Button>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ação</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Corretora</TableCell>
            <TableCell>Data de Aplicação</TableCell>
            <TableCell>Valor Aplicado</TableCell>
            <TableCell>Saldo</TableCell>
            <TableCell>Rentabilidade</TableCell>
            <TableCell>Porcentagem da Carteira</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((list) => (
            <TableRow key={list.investimentCode}>
              <TableCell>{list.investimentCode}</TableCell>
              <TableCell>{list.type}</TableCell>
              <TableCell>{list.broker}</TableCell>
              <TableCell> <Moment format="DD/MM/YYYY">{list.firstDateApplication}</Moment></TableCell>
              <TableCell> 
                <CurrencyTextField
                  value={list.appliedAmount}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
              </TableCell>
              <TableCell>
              <CurrencyTextField
                  value={list.balance}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
              </TableCell>
              <TableCell>
              <CurrencyTextField
                  value={list.rentail}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
              </TableCell>
              <TableCell>
              {list.portfolioShare} %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}