require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// PayPal verify endpoint
app.get('/api/verify', async (req, res) => {
    const { tx } = req.query;

    if (!tx) {
        return res.status(400).json({ 
            success: false, 
            error: 'Transaction ID is required' 
        });
    }

    try {
        const accessToken = await getPayPalAccessToken();
        const verificationResult = await verifyPayPalOrder(accessToken, tx);
        return res.status(200).json(verificationResult);
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to verify payment' 
        });
    }
});

// Get PayPal OAuth access token
async function getPayPalAccessToken() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const baseUrl = process.env.PAYPAL_MODE === 'production' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';

    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('PayPal auth error:', errorData);
        throw new Error('Failed to get PayPal access token');
    }

    const data = await response.json();
    return data.access_token;
}

// Verify PayPal order
async function verifyPayPalOrder(accessToken, orderId) {
    const baseUrl = process.env.PAYPAL_MODE === 'production' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';

    const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return { 
            success: false, 
            error: 'Order not found' 
        };
    }

    const order = await response.json();

    // Verify order status
    if (order.status !== 'COMPLETED') {
        return { 
            success: false, 
            error: 'Payment not completed' 
        };
    }

    // Verify amount
    const expectedAmount = '27.00';
    const orderAmount = order.purchase_units?.[0]?.amount?.value;
    
    if (orderAmount !== expectedAmount) {
        return { 
            success: false, 
            error: 'Invalid payment amount' 
        };
    }

    // Verify currency
    const orderCurrency = order.purchase_units?.[0]?.amount?.currency_code;
    if (orderCurrency !== 'USD') {
        return { 
            success: false, 
            error: 'Invalid currency' 
        };
    }

    return { 
        success: true, 
        orderId: order.id,
        status: order.status,
        amount: orderAmount,
        currency: orderCurrency
    };
}

// Start server
app.listen(PORT, () => {
    console.log(`
    ====================================
    AI Agency Playbook - Local Server
    ====================================
    
    Server running at: http://localhost:${PORT}
    
    Pages:
    - Landing Page: http://localhost:${PORT}/index.html
    - Download Page: http://localhost:${PORT}/descarga.html
    
    API:
    - Verify Payment: http://localhost:${PORT}/api/verify?tx=ORDER_ID
    
    PayPal Mode: ${process.env.PAYPAL_MODE || 'sandbox'}
    
    ====================================
    `);
});
