const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET;

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // Assumes userId is set by auth middleware
    const user = await User.findById(userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
