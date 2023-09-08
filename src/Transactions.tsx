import { useEffect, useState } from "react";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import ProgressSpinner from "./Progress";
import { user } from "./user";
import reqInstance from "./axioswrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";



export const Transactions = (props: any) => {
    const location = useLocation();

    const [transactions, setTransactions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [inprogress, setInprogress] = useState(false);

    const navigate = useNavigate();


    const queryParams = new URLSearchParams(location.search);

    const accountId: any = queryParams.get("id") || "";
    

    const { accounts } = props;

    useEffect(() => {
        if(accountId) {
            setSelectedAccount(accountId);
            getTransactions(accountId);
        }
        
    }, [])


    const formatDate = (inputDate: any) => {
        return new Date(inputDate).toDateString()
    }

    const getTransactions = async (accountID: any) => {
        setInprogress(true);
        setTransactions([]);
        // const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNlZWFmNy0yYzZhLTQ0YTgtOWJhYS03ZDQ4MmYwMWI5M2MiLCJjbGllbnRJZCI6ImFpaWF0ZXN0LTdlY2IzZGMwLTMxMWYtNDY0NS05Y2FhLWNlYmVmMGZiMzQ4MCIsInJvbGUiOiJDbGllbnRVc2VyIiwic2Vzc2lvbklkIjoiZTNhMTU1ZWQtODJjMS00NzQ1LWEzOWYtNDAwNWY0MzJjMGYwIiwic2NvcGVzIjoiYWNjb3VudHMgb2ZmbGluZV9hY2Nlc3MgcGF5bWVudHM6aW5ib3VuZCBwYXltZW50czpvdXRib3VuZCIsIm5iZiI6MTY5MzkxODAyNiwiZXhwIjoxNjkzOTIxNjI2LCJpYXQiOjE2OTM5MTgwMjZ9.UEz_TRadW54hwb8GIcGxmBG4G6H4rd5FflcrIblNYbI";
        reqInstance.get(`transactions?accountID=${accountID}`).then(res => {
            //   setSelectedAccount(accountID);
            console.log(res);
            setInprogress(false);
            setTransactions(res.data.transactions);
        });
    }

    const onAccountChange = (event: any) => {
        setSelectedAccount(event.target.value);
        getTransactions(event.target.value);
    }

    return (
        <div>
<div className='tran-label'>Transaction History:</div>
            <div>
                {/* <label>From Account:</label> */}
                {/* <select onChange={onAccountChange} placeholder='select account'>
                    <option value=""></option>
                    ({
                        accounts.map((account: any) => {
                            return <option value={account.id}>{account.name}</option>
                        })
                    })
                </select> */}
                <FormControl size="small" sx={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">Accounts</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedAccount}
                        label="Accounts"
                        onChange={onAccountChange}
                    >
                        ({
                            accounts.map((account: any) => {
                                return <MenuItem value={account.id}>
                                    <div className="accountholder">
                                        <span className="owner">{account.owner}</span>
                                        <span className="acc-number">{account.number.bbanParsed.accountNumber}</span>
                                    </div>
                                </MenuItem>
                            })
                        })

                    </Select>
                </FormControl>


            </div>
            
            {inprogress && <ProgressSpinner></ProgressSpinner>}
            <ul className="acc-transaction-section">
                {transactions.map((transaction: any) => {
                    return (<li className='transaction-item'>
                        <span className='dname-date'>
                            <span className="tdate">{formatDate(transaction.creationDate)}</span>
                            <span className='dname'>{transaction?.detail?.destination?.name}</span>

                        </span>
                        <span className='tamount'>
                            <span>
                                <span>{transaction.currency}</span>
                                <span className={transaction.amount > 0 ? 'credit' : 'debit'}>{transaction.amount}</span>
                            </span>

                            <span>Balance: {transaction?.balance?.value}</span>
                        </span>

                    </li>)
                })}
            </ul>
            <BackButton></BackButton>
        </div>
    )
}