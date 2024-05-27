const Account = require("../models/Account");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email received:", email); // Log the type of the received email

    // Find the user in the database based on the provided email
    const user = await Account.findOne({ email });

    // Check if user with the provided email exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    // Check if the provided password matches the password stored in the database
    if (password === user.password) {
      // Return user data in the response
      const userInfoResponse = {
        ID_ORANGE: user.ID_ORANGE,
        ID_META: user.ID_META,
        email: user.email,
        username: user.username,
        token: user.token,
        coins: user.coins 
      };
      console.log(user); // Log the type of the received email


      return res.status(200).json(userInfoResponse);
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { ID_ORANGE, ID_META, email, password, username, token } = req.body;

    // Check if the email already exists
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new Account({
      ID_ORANGE,
      ID_META,
      email,
      password,
      username,
      token,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const updateCoins = async (req, res) => {
  try {
    const { email, coins } = req.body;

    // Find the user by username
    const user = await Account.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's coins
    user.coins += coins;
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Coins updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


const KPIRoom1 = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user by username
    const user = await Account.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Increment Room_1_KPI
    user.Room_1_KPI++;
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Room_1_KPI incremented successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const KPIRoom2 = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user by username
    const user = await Account.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Increment Room_2_KPI
    user.Room_2_KPI++;
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Room_2_KPI incremented successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { signin, signup, updateCoins,KPIRoom1,KPIRoom2 };