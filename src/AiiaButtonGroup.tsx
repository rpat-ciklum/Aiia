import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NavLink } from 'react-router-dom';

const buttons = [
  <Button key="accounts">My Accounts</Button>,
  <Button key="transactions">Transactions History</Button>,
  <Button key="transfer">Make a Payment</Button>,
];

export default function AiiaButtonGroup() {
    const menuItems = [
        {
            href: 'accounts',
            title: 'My Accounts',
        },
        {
            href: 'transactions',
            title: 'Transaction History',
        },
        {
            href: 'transfer',
            title: 'Make a Payment',
        },
        {
          href: 'acceptpayments',
          title: 'Accept Payments',
      }
    ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="small button group">
        {/* {buttons} */}
        {menuItems.map((menuItem: any, index: any) => (
                    // <NavLink to={menuItem.href}>
                    <NavLink to={menuItem.href} >
                         <Button key="accounts">{menuItem.title}</Button>
                        </NavLink>
        ))}
      </ButtonGroup>
      {/* <ButtonGroup color="secondary" aria-label="medium secondary button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup size="large" aria-label="large button group">
        {buttons}
      </ButtonGroup> */}
    </Box>
  );
}
