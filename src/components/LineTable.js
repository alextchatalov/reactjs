import React, {useState, useEffect} from 'react';
import {TableCell, TableRow, TextField, Button} from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function LineTable(props){
    const [reb, setRebalance] = useState(props.rebalance ?? {});
    const [totalApllied, setTotalApllied] = useState(props.totalApllied ?? 0);

    function handleChange(e){
        const target = e.target;

        setRebalance(state => ({
            ...state,
            [target.name]: target.value,
        }))
    }

    function calculteIdealPercentWallet(reb) {
        var totalNote = props.totalNote ?? 0;
        var note = reb.note ?? 0;
        var amountApllied = reb.investiment.appliedAmount ?? 0;
        if(note !== 0 && totalNote !== 0) {
            // calcular percentual ideal
            var idelaPercent = (note/totalNote) * 100;
            reb.idealPercentWallet = idelaPercent.toFixed(2);
            // calcular valor ideal
            var idealTotalApllied = (idelaPercent.toFixed(2)/100) * totalApllied.toFixed(2);
            reb.idealTotalApplied = idealTotalApllied.toFixed(2);
            // calcular valor ajuste
            var adValueApply = idealTotalApllied - amountApllied;
            var price = reb.priceInResquest;
            if(adValueApply.toFixed(2) >= price) {
                reb.adValueApply = adValueApply.toFixed(2);
            } else {
                reb.adValueApply = 0;
            }
            // calcular ajuste da quantidade de ação
            if((price + adValueApply) > 0) {
                var adAmountCalc = adValueApply.toFixed(2) / price;
                reb.adAmount = adAmountCalc.toFixed(0);
            } else {
                reb.adAmount = 0;
            }

            return idelaPercent.toFixed(1);
        } 
        return 0;
    }
    

    useEffect(() => {
    }, [props.rebalance])

    return <TableRow key={reb.id}>
            <TableCell>{reb.investiment.investimentCode}</TableCell>
            <TableCell>
                <CurrencyTextField
                    value={reb.priceInResquest}
                    currencySymbol="R$"
                    decimalCharacter=","
                    digitGroupSeparator="."
                    disabled
                    />
            </TableCell>
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
                  value={reb.idealTotalApplied}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
            </TableCell>
            <TableCell>{calculteIdealPercentWallet(reb)}%</TableCell>
            <TableCell>{reb.adValueApply}</TableCell>
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