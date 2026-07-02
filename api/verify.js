// api/verify.js - Vercel Serverless Function
// Verifies PayPal transactions

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { tx } = req.query;

    // Validate transaction ID
    if (!tx) {
        return res.status(400).json({ 
            success: false, 
            error: 'Transaction ID is required' 
        });
    }

    try {
        // Get PayPal access token
        const accessToken = await getPayPalAccessToken();
        
        // Verify the order with PayPal
        const verificationResult = await verifyPayPalOrder(accessToken, tx);
        
        return res.status(200).json(verificationResult);
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to verify payment' 
        });
    }
}

// Get PayPal OAuth access token
async function getPayPalAccessToken() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    // Determine base URL based on environment
    const baseUrl = process.env.PAYPAL_ENV === 'live' 
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
        throw new Error('Failed to get PayPal access token');
    }

    const data = await response.json();
    return data.access_token;
}

// Verify PayPal order
async function verifyPayPalOrder(accessToken, orderId) {
    // Determine base URL based on environment
    const baseUrl = process.env.PAYPAL_ENV === 'live' 
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

    // Verify amount (optional - adjust based on your product price)
    const expectedAmount = '27.00';
    const orderAmount = order.purchase_units?.[0]?.amount?.value;
    
    if (orderAmount !== expectedAmount) {
        return { 
            success: false, 
            error: 'Invalid payment amount' 
        };
    }

    // Verify currency (optional)
    const orderCurrency = order.purchase_units?.[0]?.amount?.currency_code;
    if (orderCurrency !== 'USD') {
        return { 
            success: false, 
            error: 'Invalid currency' 
        };
    }

    // Payment is valid
    return { 
        success: true, 
        orderId: order.id,
        status: order.status,
        amount: orderAmount,
        currency: orderCurrency
    };
}
