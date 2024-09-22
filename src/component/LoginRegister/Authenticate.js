import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../../services/localStorageService";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { jwtDecode } from 'jwt-decode';

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8080/auth/outbound/authentication?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Authentication failed');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const token = data.result?.token;

          if (token) {
            const decodedToken = jwtDecode(token);
            const exp = decodedToken.exp;

            setToken(token);
            localStorage.setItem('tokenExpiry', exp);
            setIsLoggedin(true);
          } else {
            throw new Error('Token is missing');
          }
        })
        .catch((error) => {
          console.error('Error during authentication:', error);
          setError(error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/"); // Điều hướng đến trang chính khi đã đăng nhập
    }
    else
    {
      navigate("/login")
    }
  }, [isLoggedin, navigate]);

  const handleGoHome = () => {
    navigate("/"); // Điều hướng đến trang chính mà không cần đăng nhập
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography>Authenticating...</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="outlined" onClick={handleGoHome}>Quay về trang chính</Button> {/* Nút để quay về trang chính */}
    </Box>
  );
}
