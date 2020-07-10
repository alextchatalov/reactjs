import React, {useState, useEffect} from 'react';
import {TableCell, TableRow, TextField, Button} from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function LineTable(props){
    const [reb, setRebalance] = useState(props.rebalance ?? {});

    function handleChange(e){
        const target = e.target;

        setRebalance(state => ({
            ...state,
            [target.name]: target.value,
        }))
    }

    useEffect(() => {
        console.log('props.rebalance', props.rebalance)
    }, [props.rebalance])

    return <TableRow key={reb.id}>
            <TableCell>{reb.investiment.investimentCode}</TableCell>
            <TableCell>
            <TextField
                id="rebalance-note"
                name="note"
                type="number"
                InputLabelProps={{
                shrink: true,
                }}
                value={reb.note}
                size="small"
                variant="outlined"
                onChange={handleChange}
            />
            </TableCell>
            <TableCell>
            <CurrencyTextField
                  value={reb.investiment.appliedAmount}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
            </TableCell>
            <TableCell>{reb.investiment.portfolioShare}</TableCell>
            <TableCell>{reb.idealTotalApplied}</TableCell>
            <TableCell>{reb.idealPercentWallet}</TableCell>
            <TableCell>{reb.idealAmount}</TableCell>
            <TableCell>{reb.adValueApply}</TableCell>
            <TableCell>{reb.adPercentWallet}</TableCell>
            <TableCell>{reb.adAmount}</TableCell>
            <TableCell>{reb.status}</TableCell>
            <TableCell>
            <Button
                variant="contained"
                component="label"
                onClick={ () => props.saveRebalance(reb)}>
                Salvar
            </Button>
            </TableCell>

        </TableRow>
}