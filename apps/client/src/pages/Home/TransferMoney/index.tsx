import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Backdrop,
  Box,
  CircularProgress,
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
import {
  setTransferInfo,
  useMakeInternalTransferMutation,
  useRequestOTPForTransferMutation,
} from '../../../redux/slices/transferSlice';
import { RootState } from '../../../redux/store';
import { useAddUserToSavedListMutation } from '../../../redux/slices/savedListSlice';

import TransferInfo from './TransferInfo';
import TransferConfirmation from './TransferConfirmation';
import TransferReceipt from './TransferReceipt';

const steps = [
  'Nhập thông tin chuyển tiền',
  'Bạn sẵn sàng chuyển tiền?',
  'Hoá đơn',
];

const TRANSFER_FEE = 10000;

function TransferMoney() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();

  const handleChangeOTP = (event: ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const dispatch = useDispatch();

  const [makeAnInternalTransfer, { isLoading: internalTransferLoading }] =
    useMakeInternalTransferMutation();

  const [requestOTPForTransfer, { isLoading: requestOTPLoading }] =
    useRequestOTPForTransferMutation();

  const [addUserToSavedList, { isLoading: addUserLoading }] =
    useAddUserToSavedListMutation();

  const transferInfo = useSelector(
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
        loaiCK: data.get('loaiCK'),
        phiCK: TRANSFER_FEE,
      };

      dispatch(setTransferInfo(transferInfo));

      handleNext();
    }

    if (activeStep === 1) {
      try {
        const { soTK, soTien } = transferInfo;
        await requestOTPForTransfer({ soTK, soTien });
        setOpen(true);
      } catch (error) {
        console.log('error', error);
        return;
      }
    }

    if (activeStep === 2) {
      const payload = {
        soTK: transferInfo.soTK,
        tenGoiNho: data.get('tenGoiNho'),
      };

      try {
        await addUserToSavedList(payload);
      } catch (error) {
        console.log('error', error);
        return;
      }

      navigate('/');
    }
  };

  const handleTransferRequest = async () => {
    setOpen(false);

    try {
      const payload = { ...transferInfo, otp };
      await makeAnInternalTransfer(payload);
      handleNext();
    } catch (error) {
      console.log('error', error);
    }
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
            {activeStep === 2 && (
              <TransferReceipt handleSubmit={handleSubmit} />
            )}
          </Box>
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
        onClickConfirm={handleTransferRequest}
        handleChangeOTP={handleChangeOTP}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={requestOTPLoading || internalTransferLoading || addUserLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}

export default TransferMoney;
