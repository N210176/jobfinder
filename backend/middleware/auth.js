// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//     try {
//         let token;
        
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Please log in to access this resource'
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Check if user still exists
//         const currentUser = await User.findById(decoded.id);
//         if (!currentUser) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'The user belonging to this token no longer exists'
//             });
//         }

//         // Grant access to protected route
//         req.user = currentUser;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: 'Invalid token'
//         });
//     }
// };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please log in to access this resource'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = { protect };  // Ensure it's exported correctly
