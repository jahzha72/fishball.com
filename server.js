require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// REQUIREMENT: Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); 

const FB_APP_ID = process.env.FB_APP_ID || '25422005237441557';
const FB_APP_SECRET = process.env.FB_APP_SECRET || '790791f152ee863a4ededdc1016ae2e4';
const REDIRECT_URI = 'http://localhost:3000/auth/facebook/callback';



// 1. LOGIN ROUTE
app.get('/auth/facebook', (req, res) => {
    const state = crypto.randomBytes(20).toString('hex');
    res.cookie('fb_auth_state', state, { httpOnly: true });
    const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=email,public_profile`;
    res.redirect(authUrl);
});

// 2. CALLBACK ROUTE
app.get('/auth/facebook/callback', async (req, res) => {
    const { code, state } = req.query;
    if (state !== req.cookies.fb_auth_state) return res.status(403).send('Security check failed.');

    try {
        const tokenExchange = await axios.get('https://graph.facebook.com/v21.0/oauth/access_token', {
            params: { client_id: FB_APP_ID, client_secret: FB_APP_SECRET, redirect_uri: REDIRECT_URI, code }
        });
        
        const accessToken = tokenExchange.data.access_token;
        const userProfile = await axios.get('https://graph.facebook.com/v21.0/me', {
            params: { fields: 'id,name,email,picture.type(large)', access_token: accessToken }
        });

        const user = userProfile.data;
        res.clearCookie('fb_auth_state');

        // Professional Card UI for Login Result
        res.send(`
            <html>
            <head>
                <link rel="stylesheet" href="/style.css">
                <title>Fishball | Profile</title>
            </head>
            <body>
                <div class="profile-card">
                    <div class="cover"></div>
                    <img src="${user.picture.data.url}" class="avatar">
                    <div class="card-content">
                        <span class="badge">Authenticated Account</span>
                        <h2>${user.name}</h2>
                        <div class="info-row">
                            <div class="info-item"><strong>Email</strong>${user.email || 'Private'}</div>
                            <div class="info-item"><strong>User ID</strong>${user.id}</div>
                        </div>
                        <a href="/" class="footer-btn">Return to Search</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (e) { res.status(500).send("Auth Error"); }
});

// 3. SEARCH ENDPOINT
app.get('/api/search/:id', async (req, res) => {
    const targetId = req.params.id;
    try {
        const response = await axios.get(`https://graph.facebook.com/v21.0/${targetId}`, {
            params: { 
                fields: 'id,name,picture.type(large)', 
                access_token: `${FB_APP_ID}|${FB_APP_SECRET}` 
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: "Profile private or invalid ID." });
    }
});

app.listen(3000, () => console.log('FB Auth running: http://localhost:3000'));