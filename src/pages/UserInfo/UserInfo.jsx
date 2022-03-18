import { useEffect, useState, forwardRef } from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Comments from '@src/components/Comments';

import userPlaceholder from '../../../public/imgs/user_placeholder.jpeg';
import api from '../../services/api';
import { ImageBox, UserBox, FormItems } from './style';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  name: yup.string().min(3, 'Digite um nome válido').required('O nome é obrigatório'),
  email: yup
    .string('Digite o email da funcionária')
    .email('Digite um e-mail válido')
    .required('Email é obrigatório'),
  job_title: yup
    .string()
    .min(4, 'Digite um cargo válido')
    .required('O cargo é obrigatório'),
  admission_date: yup
    .string('Digite uma data válida')
    .required('O data de admissão é obrigatória')
});

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [openAddedUser, setOpenAddedUser] = useState(false);
  const [openUpdatedUser, setOpenUpdatedUser] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`users/${id}`).then((response) => {
        setUser(response.data.user);
      });
    }
  }, [id]);

  const navigate = useNavigate();

  const handleSuccessAddedUser = () => {
    setOpenAddedUser(true);
  };

  const handleSuccessUpdatedUser = () => {
    setOpenUpdatedUser(true);
  };

  const handleCloseAddedUser = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAddedUser(false);
  };

  const handleCloseUpdatedUser = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenUpdatedUser(false);
  };

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      email: user.email || '',
      admission_date: user.admission_date || '',
      job_title: user.job_title || '',
      photo_url: user.photo_url || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        api
          .put(`users/${id}`, {
            user: values
          })
          .then(() => {
            handleSuccessUpdatedUser();
          });
      } else {
        api
          .post('users', {
            user: values
          })
          .then((response) => {
            const userId = response.data.user.id;
            navigate(`/user/${userId}`);
            handleSuccessAddedUser();
          });
      }
    }
  });

  return (
    <UserBox>
      <Button onClick={() => navigate(-1)} variant="contained">
        Voltar
      </Button>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ImageBox>
              <img
                alt="avatar"
                src={formik.values.photo_url || userPlaceholder}
                height="200px"
                width="200px"
                style={{ border: '1px solid grey', borderRadius: 200 }}
              />
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                {id ? 'Alterar' : 'Adicionar'}
                <input
                  name="avatar"
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  hidden
                  onChange={(event) => {
                    const { files } = event.target;
                    const myFiles = Array.from(files);

                    const reader = new FileReader();
                    reader.readAsDataURL(myFiles[0]);
                    reader.onload = () => {
                      formik.setFieldValue('photo_url', reader.result);
                    };
                  }}
                />
              </Button>
            </ImageBox>
          </Grid>
          <Grid item xs={9}>
            <FormItems>
              <Typography>Nome</Typography>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Typography>Email</Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Typography>Data de Admissão</Typography>
              <TextField
                fullWidth
                id="admission_date"
                name="admission_date"
                type="date"
                value={formik.values.admission_date}
                onChange={formik.handleChange}
                error={
                  formik.touched.admission_date && Boolean(formik.errors.admission_date)
                }
                helperText={formik.touched.admission_date && formik.errors.admission_date}
              />
              <Typography>Cargo</Typography>
              <TextField
                fullWidth
                id="job_title"
                name="job_title"
                value={formik.values.job_title}
                onChange={formik.handleChange}
                error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                helperText={formik.touched.job_title && formik.errors.job_title}
              />
              <Button color="primary" variant="contained" type="submit">
                Salvar
              </Button>
              <Snackbar
                open={openAddedUser}
                onClose={handleCloseAddedUser}
                autoHideDuration={3000}
              >
                <Alert
                  onClose={handleCloseAddedUser}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  Usuário adicionado com sucesso
                </Alert>
              </Snackbar>
              <Snackbar
                open={openUpdatedUser}
                onClose={handleCloseUpdatedUser}
                autoHideDuration={3000}
              >
                <Alert
                  onClose={handleCloseUpdatedUser}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  Usuário alterado com sucesso
                </Alert>
              </Snackbar>
            </FormItems>
          </Grid>
        </Grid>
      </form>
      {id && <Comments id={id} />}
    </UserBox>
  );
};

export default UserInfo;
