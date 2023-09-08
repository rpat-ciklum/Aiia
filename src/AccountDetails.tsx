import OutlinedCard from "./Card"

import * as React from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export const AccountDetails = ({accountDetails}: any) => {

  const navigate = useNavigate();

const card = (
    <React.Fragment>
      <CardContent>
        <div className="account-details">
            <div>Bank Name</div>
            <div>{accountDetails.accountProvider
.id} {accountDetails.accountProvider
    .name}</div>
            <div>Customer Name</div>
            <div>{accountDetails.owner}</div>
            <div>Account Number</div>
            <div>{accountDetails.number.bbanParsed.accountNumber}</div>
            <div>Currency</div>
            <div>{accountDetails.available.currency}</div>
            <div>Balance</div>
            <div>{accountDetails.available.value}</div>
        </div>
      </CardContent>
      <CardActions className="acc-details-actions">
        <Button onClick={() => {
          navigate(`/transactions?id=${accountDetails.id}`);
        }} size="small">Transaction History</Button>
        <Button onClick={() => {
          navigate(`/transfer?id=${accountDetails.id}`)
        }} size="small">Make a Payment</Button>
      </CardActions>
    </React.Fragment>
  );

    return (
        <OutlinedCard card={card}></OutlinedCard> 
    )
}