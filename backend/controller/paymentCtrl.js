// Temporary removal of Razorpay integration

// const Razorpay = require('razorpay');

// var instance = new Razorpay({
//   key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

const checkout = async (req, res) => {
  try {
    // Razorpay is temporarily disabled
    res.status(200).json({ success: true, message: "Payment gateway is temporarily disabled." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const paymentVerification = async (req, res) => {
  try {
    // Razorpay is temporarily disabled
    res.status(200).json({ message: "Payment verification is temporarily disabled." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { checkout, paymentVerification };