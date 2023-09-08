import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={2} direction="row">
            <Button  onClick={() => {navigate(-1)}} variant="outlined">Back</Button>
                </Stack>
    )
}