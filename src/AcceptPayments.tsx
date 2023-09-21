import { Alert, AlertTitle, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import * as React from 'react';
import reqInstance from "./axioswrapper";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const AcceptPayments = ({ accounts }: any) => {

    const location = useLocation();
    const [expireTime, setExpireTime] = React.useState();
    const [isPaybyLink, setIsPaybyLink] = React.useState(false);
    const [destinationID, setDestinationID] = React.useState('');
    const [amount, setAmount] = React.useState();
    const [message, setMessage]: any = React.useState("");

    const [inprogress, setInprogress] = React.useState(false);

    const timeoutTime = 5000;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const redirectUri = "http://localhost:3000/acceptpayments";

    const queryParams = new URLSearchParams(location.search);

    const paymentId: any = queryParams.get("paymentId") || "";
    const paymentLinkId: any = queryParams.get("paymentLinkId") || "";

    const successStatusCodes = ["Authorized", "Initiated", "Requested"];

    React.useEffect(() => {
        if(paymentLinkId) {
            getAcceptPaymentByLinkStatus(paymentLinkId)
        }else if(paymentId) {
            getAcceptPaymentStatus(paymentId)
            
        }
        
    }, [])


    const getFromattedDate = (inputDate: any) => {
        return new Date(inputDate).toISOString().split("T")[0];
    }

    const getAcceptPaymentStatus = (acceptPaymentId: any) => {
        let url = "http://localhost:3002/";
        const accountID = localStorage.getItem("accountID");
        axios.get(`${url}getpaymentstatus?acceptPaymentId=${acceptPaymentId}`).then((res) => {
            console.log(res.data);
            if (successStatusCodes.indexOf(res.data.status.code) !== -1) {
                setMessage(`${res.data.status.details.reason}: ${res.data.status.details.description}`);
                setTimeout(() => {
                    setMessage("");
                }, timeoutTime);
            } else if (res.data.status.code === "Failed") {
                setMessage(`${res.data.status.code}: ${res.data.status.details.description}`);
                setTimeout(() => {
                    setMessage("");
                }, timeoutTime);
            }
        })
    }

    const getAcceptPaymentByLinkStatus = (paymentLinkId: any) => {
        let url = "http://localhost:3002/";
        const accountID = localStorage.getItem("accountID");
        axios.get(`${url}getpaymentlinkstatus?paymentLinkId=${paymentLinkId}`).then((res) => {
            console.log(res.data);
            if (successStatusCodes.indexOf(res.data.status) !== -1) {
                setMessage(`Payment: ${res.data.status}`);
                setTimeout(() => {
                    setMessage("");
                }, timeoutTime);
            } else if (res.data.status.code === "Failed") {
                setMessage(`Transaction Failed: ${res.data.status.details.errorType}`);
                setTimeout(() => {
                    setMessage("");
                }, timeoutTime);
            }
        })
    }

    const getPayloadForPaymentLink = () => {
        return {
            "paymentRequest": {
                "amount": amount,
                "currency": "DKK",
                "schemeId": "DanishDomesticCreditTransfer",
                "reference": "1234567890",
                "destinationId": destinationID,
                "redirectUrl": redirectUri
            },
            "expiryDate": getFromattedDate(expireTime)
        }
    }

    const getPayloadForAcceptPayments = () => {
        return {
            "amount": amount,
            "currency": "DKK",
            "schemeId": "DanishDomesticCreditTransfer",
            "reference": "1234567890",
            "destinationId": destinationID,
            "redirectUrl": redirectUri,
            "preselectedCountry": "DK"
        }
    }

    const onAcceptPayment = () => {
        setInprogress(true);
        let url = "http://localhost:3002/";
        if (isPaybyLink) {
            url = url + "createpaymentlink";
        } else {
            url = url + "createacceptpayment";
        }

        const requestBody = isPaybyLink ? getPayloadForPaymentLink() : getPayloadForAcceptPayments();

        axios.post(url, requestBody).then((res: any) => {
            console.log(res);
            setInprogress(false);
            window.location.href = res.data.authorizationUrl;
            // if (isPaybyLink) {
            //     getAcceptPaymentByLinkStatus(res.data.paymentLinkId);
            // } else {
            //     getAcceptPaymentStatus(res.data.paymentId);
            // }


        })
    }

    const onDesitnationAccountChange = (event: any) => {
        setDestinationID(event.target.value);
    }

    return (
        <div className="accept-payments-container">
            {message && <Alert className='success-alert' severity={message.indexOf('Failed') !== -1 ? 'error' : 'success'}>
                <AlertTitle>{message.indexOf('Failed') !== -1 ? "Failure" : "Success"}</AlertTitle>
                {message}
            </Alert>}
            {accounts.length > 0 && <FormControl size="small" sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Destination Account</InputLabel>
                <Select
                    variant="standard"
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={destinationID}
                    label="Destination Account"
                    onChange={onDesitnationAccountChange}
                >
                    ({
                        accounts.map((account: any) => {
                            return <MenuItem value={account.destinationId}>
                                <div className="accountholder">
                                    <span className="owner">{account.owner}</span>
                                    <span className="acc-number">{account.number.bbanParsed.accountNumber}</span>
                                </div>
                            </MenuItem>
                        })
                    })

                </Select>
            </FormControl>}

            {/* <TextField name="Destination ID" value={destinationID} onChange={(event: any) => {
                setDestinationID(event?.target.value);
            }} label="Destination ID" /> */}


            <TextField required variant="standard" size="small" value={amount} onChange={(event: any) => {
                setAmount(event.target.value);
            }} id="outlined-basic" label="Amount" />

            <FormControlLabel control={<Checkbox checked={isPaybyLink} onChange={(event: any) => {
                setIsPaybyLink(event.target.checked);
                console.log(event.target.checked);
            }} />} label="Accept Payment By Link" />

            {isPaybyLink && <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker value={expireTime} onChange={(newValue: any) => {
                        setExpireTime(newValue)
                    }} label="Basic date time picker" />
                </DemoContainer>
            </LocalizationProvider>}


            <Stack spacing={2} sx={{ alignSelf: "center" }} direction="row">
                <Button onClick={() => {
                    onAcceptPayment();
                }} variant="contained">Accept Payment</Button>
            </Stack>
        </div>


    )

}