import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        // FIXED: use sellerToken instead of token
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        // Validate seller email matches env
        if (decoded.email === process.env.SELLER_EMAIL) {
            req.seller = decoded.email; // optional: store seller info
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default authSeller;
