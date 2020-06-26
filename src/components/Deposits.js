import React, {useEffect, useState, useReducer} from 'react'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import api from '../services/api'
import NumberFormat from 'react-number-format';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({totalApplied}) {
  
  const classes = useStyles();
  //const [totalApplied, setTotalApplied] = useState(0);

//  useEffect(()=>{
//    api.get("/investiment/totalApplied")
//    .then((total)=> {
//      console.log(total.data)
//      setTotalApplied(total.data)
//    });
//  }, [])
  return (
    <React.Fragment>
      <Title>Total Aplicado</Title>
      <Typography component="p" variant="h4">
      <NumberFormat value={totalApplied} displayType={'text'} thousandSeparator={true} prefix={'R$'}></NumberFormat>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}