const notification = require('../models/notification.model');


// Get all notifications for a user
exports.getNotificationsController = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await notification.find({ to: userId }).populate('from', 'username profileImg').sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Notifications fetched successfully',
            notifications,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
            success: false
        });
    }
}

// delete  all notifications

exports.deleteAllNotificationsController = async (req, res) => {
    
    try {
        const userId = req.userId;
        await notification.deleteMany({ to: userId });

       return res.status(200).json({
            message: 'All notifications deleted successfully',
            success: true
        });
        
    } catch (error) {
        console.error(error);
       return res.status(500).json({
            message: 'Server error',
            error: error.message,
            success: false
        });
        
    }
 
}

exports.updateNotification = async (req, res)=>{

    try {
        
        const userId = req.userId;

        const updatedNotification = await notification.updateMany({to: userId},{
        read: true
        })

        return res.status(200).json({
            message: 'All notifications updated successfully',
            success: true,
            data: updatedNotification
        });



    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
            success: false
        });
    }
}





