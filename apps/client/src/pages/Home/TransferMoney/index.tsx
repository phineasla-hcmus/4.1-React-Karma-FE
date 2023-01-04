import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import OTPModal from '../../../components/OTPModal';
import { setTransferInfo } from '../../../redux/slices/transferSlice';
import { useAddUserToSavedListMutation } from '../../../redux/slices/savedListSlice';
import { RootState } from '../../../redux/store';

import TransferInfo from './TransferInfo';
import TransferConfirmation from './TransferConfirmation';
import TransferReceipt from './TransferReceipt';

const steps = [
  'Nhập thông tin chuyển tiền',
  'Bạn sẵn sàng chuyển tiền?',
  'Hoá đơn',
];

function TransferMoney() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [otp, setOTP] = useState('');

  const handleChangeOTP = (event: ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      setOpen(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dispatch = useDispatch();

  const [addUserToSaveList, { error }] = useAddUserToSavedListMutation();

  const { soTK } = useSelector(
    (state: RootState) => state.transfer.transferInfo
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (activeStep === 0) {
      const transferInfo = {
        soTK: data.get('soTK'),
        soTien: data.get('soTien'),
        noiDungCK: data.get('noiDungCK'),
        hinhThucThanhToan: data.get('hinhThucThanhToan'),
      };

      dispatch(setTransferInfo(transferInfo));
    }

    if (activeStep === 1) {
      console.log('hello');
      const receiverInfo = {
        nguoiDung: soTK,
        tenGoiNho: data.get('tenGoiNho'),
      };
      console.log('receiverInfo', receiverInfo);
      await addUserToSaveList(receiverInfo);

      if (error) {
        console.log('error', error);
      }
    }

    handleNext();
  };

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Chuyển tiền</Typography>
        </StyledBreadCrumbs>
        <Container>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Chuyển tiền thành công!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Box mt={2} mb={1}>
                {activeStep === 0 && (
                  <TransferInfo
                    handleSubmit={handleSubmit}
                    activeStep={activeStep}
                  />
                )}
                {activeStep === 1 && (
                  <TransferConfirmation
                    handleSubmit={handleSubmit}
                    activeStep={activeStep}
                  />
                )}
                {activeStep === 2 && <TransferReceipt />}
              </Box>
              {/* {activeStep !== 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext}>Next</Button>
                </Box>
              )} */}
            </>
          )}
        </Container>
      </StyledContentWrapper>
      <OTPModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onClickCancel={() => {
          setOpen(false);
        }}
        onClickConfirm={() => {
          console.log('otp', otp);
          setOpen(false);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }}
        handleChangeOTP={handleChangeOTP}
      />
    </Layout>
  );
}

export default TransferMoney;
