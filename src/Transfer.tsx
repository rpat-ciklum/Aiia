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
        if (accountId) {
            setFromAccount(accountId);
        }

    }, [])

    const getAccountByBban = (bban: any) => {
        return accounts.find((account: any) => {
            return account.number.bban === bban;
        });
    }

    const onToAccountChange = (bban: any) => {
        // const toAccount = getAccountByBban(bban);
        setToAccount(bban);
    }



    const onFromAccountChange = (fromAccuont: any) => {
        setFromAccount(fromAccuont);
    }

    const onAmountChange = (amount: any) => {
        setTransferAmount(amount);
    }

    const onRemarksChange = (remarks: any) => {
        setRemarks(remarks);
    }



    const transferMoney = (requestBody: any) => {

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
            localStorage.setItem("authorizationId", res.data.authorizationId);
            localStorage.setItem("accountID", fromAccount);
            window.location.href = res.data.authorizationUrl;
        })
    }

    const paymentSchema = Yup.object().shape({
        fromAccount: Yup.string()


            // Required Field Validation
            .required("Please select From Account"),
        toAccount: Yup.string()

            .required("Please enter Beneficiary Account"),
        bankCode: Yup.string()
            .required("Please enter Bank Code"),
        amount: Yup.number()
            .moreThan(0, 'Amount should be greater than zero')

            // Format Validation


            // Required Field Validation
            .required("Please enter Amount"),
        remarks: Yup.string()

    });

    const card = (
        <React.Fragment>
            <Formik initialValues={{ fromAccount: accountId || "", toAccount: "", bankCode: "", amount: "", remarks: "" }}
                validationSchema={paymentSchema}
                onSubmit={(values) => {
                    console.log(values)
                    onToAccountChange(values.toAccount);
                    onAmountChange(values.amount);
                    onFromAccountChange(values.fromAccount);
                    onRemarksChange(values.remarks);
                    // const toAccountDetails = getAccountByBban(values.toAccount);

                    const requestBody = {
                        "payment": {
                            "amount": {
                                "value": values.amount,
                                "currency": "DKK"
                            },
                            "destination": {
                                "bban": { accountNumber: values.toAccount, bankCode: values.bankCode },
                                "name": "name" || "toAccountDetails.name"
                            },
                            //        "execution": {
                            //            "type":"SpecificDate",
                            //            "date": "2021-07-23"
                            //        },
                            "message": "Invoice: 2",
                            "transactionText": values.remarks
                        },
                        "redirectUrl": "http://localhost:3000/accounts"
                    };

                    transferMoney(requestBody);
                }
                }
                validateOnChange={true}
                validateOnBlur={true}
            >

                {(props) => (
                    <>
                        <Form noValidate>
                            <CardContent>

                               {accounts.length > 0 &&  <div className="account-form">
                                    <div>


                                        <FormControl required variant="standard" size="small" sx={{ minWidth: 200 }} >
                                            <InputLabel id="demo-simple-select-label">From Account</InputLabel>
                                            <Field required name="fromAccount" onChange={onFromAccountChange} render={({ field, form: { touched, errors } }: any) => (<><Select
                                                {...field}
                                                required
                                                onChange={(e) => {
                                                    props.setFieldValue("fromAccount", e.target.value);
                                                    setFromAccount(e.target.value)
                                                }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={fromAccount}
                                                label="From Account"

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
                                                {touched[field.name] &&
                                                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                            </>
                                            )} />

                                        </FormControl>
                                    </div>
                                    <div>
                                        <Box>
                                            <Field  name="toAccount" onChange={(e: any) => {
                                                onToAccountChange(e.target.value);
                                            }} render={({ field, form: { touched, errors } }: any) => (<><TextField required variant="standard" {...field} size="small" id="outlined-basic" label="Beneficiary Account"  />
                                                {touched[field.name] &&
                                                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                            </>
                                            )} />

                                        </Box>


                                    </div>
                                    <div>

                                        <Field name="bankCode" onChange={onRemarksChange} render={({ field, form: { touched, errors } }: any) => (<><TextField required variant="standard" {...field} size="small" id="outlined-basic" label="Bank Code"  />
                                            {touched[field.name] &&
                                                errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                        </>
                                        )} />
                                    </div>
                                    <div>
                                        <Field name="amount" onChange={onAmountChange} render={({ field, form: { touched, errors } }: any) => (<><TextField required variant="standard" {...field} size="small" id="outlined-basic" label="Amount"  />
                                            {touched[field.name] &&
                                                errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                        </>
                                        )} />

                                    </div>
                                    <div>

                                        <Field name="remarks" onChange={onRemarksChange} render={({ field, form: { touched, errors } }: any) => (<><TextField variant="standard" {...field} size="small" id="outlined-basic" label="Remarks"  />
                                            {touched[field.name] &&
                                                errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                        </>
                                        )} />
                                    </div>

                                </div>}
                            </CardContent>
                            <CardActions className="actions">
                                <Stack spacing={20} sx={{ width: "100%" }} direction="row">

                                    <div className="btn-makepayment"  ><button type="submit" >Confirm</button></div>
                                </Stack>
                            </CardActions>
                        </Form>
                    </>
                )}
            </Formik>
        </React.Fragment>
    );

    return (
        <div className='transfer-section'>
            <div className='aiia-bold'>Make a Payment: </div>
            <OutlinedCard className="transaction-box" sx={{"box-shadow": "-6px -6px 9px -6px black"}} card={card}></OutlinedCard>

            <BackButton></BackButton>


            {inprogress && <ProgressSpinner></ProgressSpinner>}
            {/* <div className="transfer-button"></div> */}

        </div>
    )
}