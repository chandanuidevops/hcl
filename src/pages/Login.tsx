import {
    Box,
    Button,

    TextField,
    Typography,
    useTheme,
    Grid
} from "@mui/material";


import { useMemo, useState, FormEvent } from "react";


import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";


// import type { RootState, AppDispatch } from "../../redux/store"; // Adjust import to match your store setup

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    // const isSubmitting = useSelector((state: RootState) => state.auth.isSubmitting);
    // const authPage = useSelector((state: RootState) => state.auth.authPage);



    const [value, setValue] = useState<{ id: string; password: string }>({
        id: "",
        password: "",
    });

    const handleTogglePassword = (): void => {
        setShowPassword(!showPassword);
    };



    return (
        <Grid container sx={{ height: "100vh" }
        }>
            <Grid xs={12} md={12} >
                <Box sx={{
                    maxWidth: '400px',

                    margin: 'auto',
                    marginTop: '200px'
                }}>
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();

                        }
                        }
                    >
                        <Typography variant="h5" fontWeight="bold" textAlign="center" >
                            Login
                        </Typography>


                        < TextField
                            autoFocus
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={value.id}
                            onChange={(e) =>
                                setValue((prev) => ({ ...prev, id: e.target.value }))
                            }

                        />

                        < TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={value.password}
                            onChange={(e) =>
                                setValue((prev) => ({ ...prev, password: e.target.value }))
                            }
                            label="Password"
                            variant="outlined"
                            margin="normal"

                        />







                        < Button
                            fullWidth
                            size="small"
                            variant="contained"
                            type="submit"

                            sx={{
                                textTransform: "none",
                                mt: 2,
                                background: "#4683cf",
                                "&:hover": { background: "#356bb0" },
                                fontSize: "16px",
                            }}
                        >
                            Login
                        </Button>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography
                                variant="body2"
                                // onClick={() => dispatch(setAuthPage("forgotPassword"))}
                                sx={{
                                    display: "inline-block",
                                    fontSize: "14px",
                                    color: "primary.main",
                                    cursor: "pointer",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                Forgot Password ?
                            </Typography>
                            <br />
                            <Typography
                                variant="body2"
                                // onClick={() => dispatch(setAuthPage("forgotPassword"))}
                                sx={{
                                    display: "inline-block",
                                    fontSize: "14px",
                                    color: "primary.main",
                                    cursor: "pointer",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                New user?  Register here
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Grid>


        </Grid>
    );
};

export default LoginPage;
