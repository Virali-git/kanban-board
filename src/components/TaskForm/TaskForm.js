import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Dialog,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allTasksSelector,
  isTaskEditableSelector,
  setTaskData,
  editDataSelector,
  setUpdateData,
  setTaskUnEditable,
  // clearEditData,
} from "../../redux/dashboardSlice";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
const validationSchema = yup.object({
  taskName: yup.string("Enter a Task").required("Task is required"),
  priority: yup.string("Enter the Priority").required("Priority is required"),
  deadline: yup.date().nullable().required("Please Enter a Date"),
});

export const TaskForm = ({ isDialogOpen, setIsDialogOpen }) => {
  //const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isEditable = useSelector(isTaskEditableSelector);
  const dispatch = useDispatch();
  const allTasks = useSelector(allTasksSelector);
  const editData = useSelector(editDataSelector);
  const formik = useFormik({
    initialValues: {
      taskName: "",
      priority: "",
      deadline: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      if (!isEditable) {
        let updatedTaskList = [];
        updatedTaskList = [
          ...allTasks,
          {
            taskName: values?.taskName,
            priority: values?.priority,
            deadline: values?.deadline?.toISOString(),
            stage: 0,
            id: uuidv4(),
          },
        ];

        dispatch(setTaskData(updatedTaskList));
        formik.resetForm();
        setIsDialogOpen(false);
      } else {
        let updatedData = {};
        updatedData = {
          ...editData,
          taskName: values?.taskName,
          priority: values?.priority,
          deadline: values?.deadline?.toISOString(),
        };
        dispatch(setUpdateData(updatedData));
        dispatch(setTaskUnEditable());
        formik.resetForm();
        setIsDialogOpen(false);
      }
    },
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (isEditable) {
      formik.setFieldValue("taskName", editData?.taskName, true);
      formik.setFieldValue("priority", editData?.priority, true);
      formik.setFieldValue("deadline", new Date(editData?.deadline), true);
    }
  }, [editData]);

  const TypographyText = styled(Typography)({
    pb: 2,
    fontWeight: "700",
  });
  return (
    <Box>
      <TypographyText>Create a Task</TypographyText>
      {/* <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="taskName"
              name="taskName"
              label="Enter a Task"
              variant="outlined"
              value={formik.values.taskName}
              onChange={formik.handleChange}
              error={formik.touched.taskName && Boolean(formik.errors.taskName)}
              helperText={formik.touched.taskName && formik.errors.taskName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              <InputLabel id="priorityt-label">Priority</InputLabel>
              <Select
                labelId="priorityt-label"
                id="priority"
                name="priority"
                value={formik.values.priority}
                label="Priority"
                onChange={formik.handleChange}
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              {formik.touched.priority && formik.errors.priority && (
                <FormHelperText>Error</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Enter Deadline"
                value={formik.values.deadline}
                onChange={(value) =>
                  formik.setFieldValue("deadline", value, true)
                }
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    id="deadline"
                    name="deadline"
                    error={
                      formik.touched.deadline && Boolean(formik.errors.deadline)
                    }
                    helperText={
                      formik.touched.deadline && formik.errors.deadline
                    }
                    fullWidth
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" type="submit">
              {!isEditable ? "Add Task" : "Edit Task"}
            </Button>
          </Grid>
        </Grid>
      </Box> */}
      <Button onClick={handleOpenDialog} variant="outlined">
        Add Task
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Box component="form" onSubmit={formik.handleSubmit} p={2}>
          {/* Increase the maxWidth to make the dialog wider */}
          <DialogTitle id="alert-dialog-title" style={{ maxWidth: "500px" }}>
            TESting
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="taskName"
                  name="taskName"
                  label="Enter a Task"
                  variant="outlined"
                  value={formik.values.taskName}
                  onChange={formik.handleChange}
                  error={formik.touched.taskName && Boolean(formik.errors.taskName)}
                  helperText={formik.touched.taskName && formik.errors.taskName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.priority && Boolean(formik.errors.priority)}
                >
                  <InputLabel id="priorityt-label">Priority</InputLabel>
                  <Select
                    labelId="priorityt-label"
                    id="priority"
                    name="priority"
                    value={formik.values.priority}
                    label="Priority"
                    onChange={formik.handleChange}
                    error={formik.touched.priority && Boolean(formik.errors.priority)}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  {formik.touched.priority && formik.errors.priority && (
                    <FormHelperText>Error</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Enter Deadline"
                    value={formik.values.deadline}
                    onChange={(value) => formik.setFieldValue("deadline", value, true)}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        id="deadline"
                        name="deadline"
                        error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                        helperText={formik.touched.deadline && formik.errors.deadline}
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="primary">
              Close
            </Button>
            <Button variant="outlined" type="submit">
              {!isEditable ? "Add Task" : "Edit Task"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
