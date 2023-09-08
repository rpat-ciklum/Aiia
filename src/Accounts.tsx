import { useState } from "react";
import axios from "axios";
import { AccountDetails } from "./AccountDetails";
import ProgressSpinner from "./Progress";
import { user } from "./user";
import reqInstance from "./axioswrapper";

import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';

export const Accounts = (props: any) => {

    const [selectedAccount, setSelectedAccount] = useState();
    const [accountDetails, setAccountDetails] = useState();
    const [inprogress, setInprogress] = useState(false);
    const { accounts } = props;

    console.log(user)

    const getAccountDetails = (accountId: any) => {
        console.log(accountId);
        setSelectedAccount(accountId);
        setAccountDetails(undefined);
        setInprogress(true);
        reqInstance.get(`accountdetails?accountID=${accountId}`).then((res: any) => {
            console.log(res);
            setInprogress(false);
            setAccountDetails(res.data)
            // setAccounts(res.data.accounts);
        });

    }

    return (
        <div className='accounts-section'>
            <span className='acc-label'>My Accounts: </span>
            <div className='account-block'>
                {

                    accounts.map((account: any) => {
                        return (<div className={`account-container ${account.id === selectedAccount ? 'active' : ''}`}>
                            <span>{account.name}</span>
                            <span>{account.availableBalance}</span>
                            <Stack className="acc-view" spacing={2} direction="row">
            <Button  onClick={() => {getAccountDetails(account.id)}} variant="contained">View</Button>
                </Stack>
                            </div>);
                    })



                }
            </div>
            {
                inprogress && (<ProgressSpinner></ProgressSpinner>)
            }
            {
                accountDetails && (<div className="account-details-section">
                    <AccountDetails accountDetails={accountDetails}></AccountDetails>
                </div>)
            }

        </div>
    )
}