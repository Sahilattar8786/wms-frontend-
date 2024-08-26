import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "../../App/Slice/CustomerSlice";
import { fetchVendor } from "../../App/Slice/VendorSlice";
import { AccountCircle, Storefront } from "@mui/icons-material";
import {
  createCustomerPayment,
  createVendorPayment,
} from "../../App/Slice/PaymentSlice";
import { toast } from "react-toastify"; // Ensure toast is imported
import { delay } from "../Common/delay";

export default function MakePayment({ payment, handleClose, onSuccess }) {
  const [paymentData, setPaymentData] = useState({
    date: "",
    amount: "",
    remark: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [paymentType, setPaymentType] = useState("");
  const customerData = useSelector((state) => state.Customer.data);
  const vendorData = useSelector((state) => state.Vendor.data);
  const [selectedParty, setSelectedParty] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setPaymentData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setSelectedParty(null); // Reset selected party when payment type changes
  };

  const validation = () => {
    let errors = {};
    let isValid = true;
    if (!paymentData.date) {
      isValid = false;
      errors.date = "Date is required";
    }
    if (!paymentData.amount) {
      isValid = false;
      errors.amount = "Amount is required";
    }
    if (!paymentData.remark) {
      isValid = false;
      errors.remark = "Remark is required";
    }
    if (!selectedParty) {
      isValid = false;
      errors.party = "Please select a customer or vendor";
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return; // Call the validation function

    try {
      if (paymentType === "vendor") {
        await dispatch(
          createVendorPayment({
            vendorId: selectedParty._id,
            amount: paymentData.amount,
            date: paymentData.date,
            remark: paymentData.remark,
          })
        ).unwrap();
        toast.success("Payment made successfully", {
          position: "top-center",
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (paymentType === "customer") {
        await dispatch(
          createCustomerPayment({
            customerId: selectedParty._id,
            amount: paymentData.amount,
            date: paymentData.date,
            remark: paymentData.remark,
          })
        ).unwrap();
        toast.success("Payment made successfully", {
          position: "top-center",
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      await delay(2000)
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Failed to make payment:", error);
      toast.error("Failed to make payment. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      await dispatch(fetchCustomer());
      await dispatch(fetchVendor());
    };
    load();
  }, [dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {payment ? "Update Payment" : "Make Payment"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="payment-type-label">Select Payment Type</InputLabel>
          <Select
            labelId="payment-type-label"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            sx={{
              minWidth: 200,
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <MenuItem value="customer">
              <AccountCircle sx={{ mr: 1 }} />
              Customer
            </MenuItem>
            <MenuItem value="vendor">
              <Storefront sx={{ mr: 1 }} />
              Vendor
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date"
          variant="filled"
          name="date"
          type="date"
          error={!!errors.date}
          helperText={errors.date}
          value={paymentData.date}
          onChange={handleChange}
          fullWidth
        />

        {paymentType === "customer" && (
          <Autocomplete
            options={customerData || []}
            getOptionLabel={(option) => option.name || ""}
            value={selectedParty}
            onChange={(event, newValue) => setSelectedParty(newValue)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Customer"
                variant="outlined"
                fullWidth
                error={!!errors.party}
                helperText={errors.party}
              />
            )}
            style={{ marginBottom: 16 }}
          />
        )}

        {paymentType === "vendor" && (
          <Autocomplete
            options={vendorData || []}
            getOptionLabel={(option) => option.name || ""}
            value={selectedParty}
            onChange={(event, newValue) => setSelectedParty(newValue)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Vendor"
                variant="outlined"
                fullWidth
                error={!!errors.party}
                helperText={errors.party}
              />
            )}
            style={{ marginBottom: 16 }}
          />
        )}

        <TextField
          label="Amount"
          variant="filled"
          name="amount"
          value={paymentData.amount}
          error={!!errors.amount}
          helperText={errors.amount}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Remark"
          variant="filled"
          name="remark"
          value={paymentData.remark}
          error={!!errors.remark}
          helperText={errors.remark}
          onChange={handleChange}
          fullWidth
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ padding: 2, justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: "flex-start" }}
          >
            Make Payment
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ alignSelf: "flex-start" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
