import { useEffect, useState } from "react";
import axios from 'axios';

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import ProgressSpinner from "./Progress";
import { user } from "./user";
import reqInstance from "./axioswrapper";
import { BackButton } from "./BackButton";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import OutlinedCard from "./Card";
import { useLocation } from "react-router-dom";

export const Transfer = (props: any) => {

    const { accounts } = props;
    const [transferAmount, setTransferAmount] = useState();
    const [fromAccount, setFromAccount]: any = useState("");
    const [selectedAccount, setSelectedAccount] = useState();
    const [toAccount, setToAccount]: any = useState({});
    const [inprogress, setInprogress] = useState(false);
    const [remarks, setRemarks] = useState("");

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const accountId: any = queryParams.get("id") || "";

    


    useEffect(() => {
        if(accountId) {
            setFromAccount(accountId);
        }
        
    }, [])


    const onToAccountChange = (event: any) => {
        const toAccount = accounts.find((account: any) => {
            return account.id === event.target.value;
        });
        setToAccount(toAccount);
    }

    const onFromAccountChange = (event: any) => {
        setFromAccount(event.target.value);
    }

    const onAmountChange = (event: any) => {
        setTransferAmount(event.target.value);
    }

    const onRemarksChange = (event: any) => {
        setRemarks(event.target.value);
    }

    

    const transferMoney = () => {
        const requestBody = {
            "payment": {
                "amount": {
                    "value": transferAmount,
                    "currency": "DKK"
                },
                "destination": {
                    "bban": toAccount.number.bbanParsed,
                    "name": toAccount.name
                },
                //        "execution": {
                //            "type":"SpecificDate",
                //            "date": "2021-07-23"
                //        },
                "message": "Invoice: 2",
                "transactionText": "Invoice: 2"
            },
            "redirectUrl": "http://localhost:3000/accounts"
        };
        setInprogress(true);
        reqInstance.post(`makepayment?accountID=${fromAccount}`, requestBody).then((res: any) => {
            console.log(res);
            setInprogress(false);
            authorizePayment(res.data.paymentId)
        })
    }

    const authorizePayment = (paymentId: any) => {
        const requestBody = {
            paymentIds: [paymentId],
            "redirectUrl": "http://localhost:3000/accounts"
        }
        setInprogress(true);
        reqInstance.post(`authorizepayment?accountID=${fromAccount}`, requestBody).then(res => {
            console.log(res);
            setInprogress(false);
            localStorage.setItem("authorizationId", res.data.authorizationId)
            window.location.href = res.data.authorizationUrl;
        })
    }

    const paymentSchema = Yup.object().shape({
        fromAccount: Yup.string()
     
        
            // Required Field Validation
            .required("From Account should not be empty"),
        toAccount: Yup.string()
     
            .required("To Account should not be empty"),
            amount: Yup.string()
     
            // Format Validation
            
     
            // Required Field Validation
            .required("Amount Should not be empty"),
        remarks: Yup.string()

    });

    const card = (
        <React.Fragment>
            <CardContent>
            <Formik initialValues={{ fromAccount: "", toAccount: "", amount: "", remarks: "" }} 
            validationSchema={paymentSchema}
            onSubmit={(values) => {
                console.log(values)
                alert("Form is validated and in this block api call should be made...");
              }
            }
            >

{ (props) => (
    <div className="account-form">
    <div>


        <FormControl size="small" sx={{ minWidth: 300 }} >
            <InputLabel id="demo-simple-select-label">From Account</InputLabel>
            <Select

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fromAccount}
                label="From Account"
                onChange={onFromAccountChange}
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
        <div>
            <Box>
                <TextField size="small" onChange={onToAccountChange} id="outlined-basic" label="To Account" variant="outlined" />
            </Box>


        </div>
        <div>

            <TextField size="small" onChange={onAmountChange} id="outlined-basic" label="Amount" variant="outlined" />
        </div>
        <div>

<TextField size="small" onChange={onRemarksChange} id="outlined-basic" label="Remarks" variant="outlined" />
</div>
</div>
)}
           
                

                </Formik>
            </CardContent>
            <CardActions className="actions">
                <Stack spacing={20} direction="row">

                    <div className="btn-makepayment" onClick={transferMoney} >Confirm</div>
                </Stack>
            </CardActions>
        </React.Fragment>
    );

    return (
        <div className='transfer-section'>
            <div className='aiia-bold'>Make a Payment: </div>
            <OutlinedCard card={card}></OutlinedCard>

            <BackButton></BackButton>


            {inprogress && <ProgressSpinner></ProgressSpinner>}
            {/* <div className="transfer-button"></div> */}

        </div>
    )
}