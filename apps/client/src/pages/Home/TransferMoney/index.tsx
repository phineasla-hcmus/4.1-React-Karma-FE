import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
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
import _omit from 'lodash/omit';

import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import OTPModal from '../../../components/OTPModal';
import {
  setTransferInfo,
  useMakeExternalTransferMutation,
  useMakeInternalTransferMutation,
  useRequestOTPForTransferMutation,
} from '../../../redux/slices/transferSlice';
import { RootState } from '../../../redux/store';
import { useAddUserToContactListMutation } from '../../../redux/slices/contactSlice';

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

  const [
    makeAnInternalTransfer,
    { isLoading: internalTransferLoading, error: internalTransferError },
  ] = useMakeInternalTransferMutation();

  const [
    makeAnExternalTransfer,
    { isLoading: externalTransferLoading, error: externalTransferError },
  ] = useMakeExternalTransferMutation();

  const [requestOTPForTransfer, { isLoading: requestOTPLoading }] =
    useRequestOTPForTransferMutation();

  const [addUserToSavedList, { isLoading: addUserLoading }] =
    useAddUserToContactListMutation();

  const transferInfo = useSelector(
    (state: RootState) => state.transfer.transferInfo
  );

  const soTK = localStorage.getItem('SOTK');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (activeStep === 0) {
      const tenTKFromData = data.get('tenTK')?.toString() || '';
      const transferInfo = {
        soTK,
        nguoiNhan:
          tenTKFromData.length > 0
            ? data.get('soTK')
            : data.get('soTK')?.toString().split(' - ')[1],
        tenTK:
          tenTKFromData.length > 0
            ? data.get('tenTK')
            : data.get('soTK')?.toString().split(' - ')[0],
        nganHang: data.get('nganHang'),
        soTien: Number(data.get('soTien')),
        noiDung: data.get('noiDungCK'),
        loaiCK: data.get('loaiCK'),
        phiCK: TRANSFER_FEE,
      };

      dispatch(setTransferInfo(transferInfo));

      handleNext();
    }

    if (activeStep === 1) {
      const payload = {
        nguoiDung: transferInfo.nguoiNhan,
        tenGoiNho: data.get('tenGoiNho')?.toString(),
      };

      if (payload.tenGoiNho !== undefined) {
        try {
          await addUserToSavedList(payload);
        } catch (error) {
          console.log('error', error);
          return;
        }
      }

      try {
        const { soTien, nguoiNhan } = transferInfo;
        await requestOTPForTransfer({ soTK, nguoiNhan, soTien });
        setOpen(true);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const handleTransferRequest = async () => {
    setOpen(false);

    try {
      const payload = { ...transferInfo, otp: Number(otp) };

      if (transferInfo.nganHang?.length > 0) {
        await makeAnExternalTransfer(_omit(payload, ['phiCK', 'tenTK']));
      } else
        await makeAnInternalTransfer(_omit(payload, ['nganHang', 'tenTK']));

      if (internalTransferError || externalTransferError) return;
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
            {activeStep === 2 && <TransferReceipt />}
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
        open={
          requestOTPLoading ||
          internalTransferLoading ||
          externalTransferLoading ||
          addUserLoading
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}

export default TransferMoney;
