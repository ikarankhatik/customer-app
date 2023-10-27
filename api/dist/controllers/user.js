import db from "../models/index.js";
import bcrypt from 'bcrypt';
const User = db.user;
export const SignUp = async (req, res) => {
    console.log(req.body);
    try {
        // Extract user data from the request body
        const { name, email, password } = req.body;
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
        // Create a new user in the database with the hashed password
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // Respond with the newly created user
        res.status(201).json({ newUser, message: "User created successfully", success: true });
    }
    catch (error) {
        // Handle errors
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
export const SignIn = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({
            where: { email },
        });
        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Passwords match; create a JWT token
            // const token = jwt.sign(
            //   {
            //     userId: user.id,
            //     email: user.email,
            //   },
            //   process.env.JWT_KEY, 
            //   {
            //     expiresIn: '1h', 
            //   }
            // );
            // res.cookie('access_token', token);
            return res.status(200).json({
                message: 'Login successful',
                success: true,
                user
            });
        }
        else {
            return res.status(401).json({ message: 'Login failed. Invalid password.', success: false });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
//# sourceMappingURL=user.js.map