import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import InfoIcon from '@mui/icons-material/Info';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


export const Login = () => {
    const onLogin = () => {
        window.location.href = "https://api-sandbox.aiia.eu/v1/oauth/connect?client_id=aiiatest-7ecb3dc0-311f-4645-9caa-cebef0fb3480&scope=accounts offline_access payments:inbound payments:outbound&redirect_uri=http://localhost:3000/accounts&response_type=code"
    }
    return (

        <div _ngcontent-dwe-c134="" _nghost-dwe-c32="" className="app-container">
            <div className="page"><div _ngcontent-dwe-c32="" className="page__upper">
                <div _ngcontent-dwe-c134="" _nghost-dwe-c22="">
                    <div _ngcontent-dwe-c22="" className="header">
                        <div _ngcontent-dwe-c22="" className="header__brand">
                            <img _ngcontent-dwe-c22="" src="https://cdn.aiia.eu/public/Images/aiia_logo.svg" alt="Aiia" className="header__brand__logo" />
                        </div>
                        <div _ngcontent-dwe-c22="" className="header__action header__action--right-shift-content">
                            <div className="ng-star-inserted">

                                <div _ngcontent-dwe-c13="" _nghost-dwe-c12="" className="ng-star-inserted">
                                </div></div></div><div _ngcontent-dwe-c22="" className="header__message"><div _ngcontent-dwe-c22="" className="header__message__text"> Unlock the true value of your data </div></div></div>
                    <Divider></Divider>
                    <div _ngcontent-dwe-c22="" role="separator" className="div div-horizontal" aria-orientation="horizontal"></div></div><div _ngcontent-dwe-c32="" className="scroll-area"><div _ngcontent-dwe-c32="" className="scroll-area__main-content">


                        <div _ngcontent-dwe-c134="" className="ng-star-inserted"><div className="consent">
                            <div className="consent__header">Aiia will do the following</div>
                            <div className="consent__body"> <div className="consent__body__row">

                                <ShieldOutlinedIcon /> <div className="consent__body__row__text">Share your account information and transactions with AiiaTest</div> </div><div className="consent__body__row"> <div className="consent__body__row__image">

                                    <SystemUpdateAltOutlinedIcon sx={{ transform: "rotate(180deg)" }} />



                                </div> <div className="consent__body__row__text">Let you receive payments through AiiaTest</div> </div><div className="consent__body__row">


                                    <SystemUpdateAltOutlinedIcon />

                                    <div className="consent__body__row__text">Let you initiate payments through AiiaTest</div> </div> <div className="consent__body__row">

                                    <ShieldOutlinedIcon />

                                    <div className="consent__body__row__text">Retrieve and store your account information and transactions</div> </div> <div className="consent__body__row">

                                    <InfoIcon />

                                    <div className="consent__body__row__text">Share your account information and transactions with your consent</div> </div> <div className="consent__body__row">

                                    <PendingActionsIcon />  <div className="consent__body__row__text">Update your Aiia account daily with the latest transactions from your bank</div> </div> </div> </div></div></div></div></div><div _ngcontent-dwe-c32="" className="page__lower"><div _ngcontent-dwe-c32="" className="vertical-gradient"><div _ngcontent-dwe-c32="" className="vertical-gradient__image"></div></div><div _ngcontent-dwe-c32="" className="footer"><div _ngcontent-dwe-c32="" className="footer__action-primary ng-star-inserted">
                                        <div _ngcontent-dwe-c134="" _nghost-dwe-c25="">
                                            <div _ngcontent-dwe-c25="" className="action-primary">
                                                <div _ngcontent-dwe-c25="" _nghost-dwe-c24="" className="ng-star-inserted">


                                                    <Stack spacing={2} sx={{ "justify-content": "center", marginBottom: "20px" }} direction="row">
                                                        <Button onClick={onLogin} variant="contained">Login</Button>
                                                    </Stack>

                                                </div></div></div></div><div _ngcontent-dwe-c32="" className="footer__action-incidental ng-star-inserted"><div _ngcontent-dwe-c134="" _nghost-dwe-c28="" className="ng-star-inserted"><div _ngcontent-dwe-c28="" className="action-incidental"><div _ngcontent-dwe-c28="" _nghost-dwe-c26="" className="ng-star-inserted">

                                                </div></div></div></div>

                                        {/* <div _ngcontent-dwe-c134="" _nghost-dwe-c31=""><div _ngcontent-dwe-c134="" _nghost-dwe-c29=""><div _ngcontent-dwe-c29="" className="disclaimer"><span _ngcontent-dwe-c134="" className="mat-small ng-star-inserted">By continuing you confirm that you've read and accepted our </span><a _ngcontent-dwe-c134="" target="_blank" rel="noopener" href="https://aiia.eu/legal/aiia-terms-of-use" className="ng-star-inserted"><span _ngcontent-dwe-c134="" className="mat-small">Terms of Use</span></a><span _ngcontent-dwe-c134="" className="mat-small ng-star-inserted"> and </span><a _ngcontent-dwe-c134="" target="_blank" rel="noopener" href="https://aiia.eu/legal/aiia-privacy-policy" className="ng-star-inserted"><span _ngcontent-dwe-c134="" className="mat-small">Privacy Policy</span></a>
                            </div>
                            </div>
                            </div> */}
                                    </div>
                </div>
            </div >
        </div >


    );
}