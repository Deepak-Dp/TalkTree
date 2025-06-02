const express = require('express')
const { authMiddleware } = require('../config/auth');
const { getNotificationsController, deleteAllNotificationsController, updateNotification } = require('../controllers/notification.controller');

const Routes = express.Router()


 Routes.get('/get-notification', authMiddleware,  getNotificationsController)
 Routes.delete('/delete-AllNotification', authMiddleware,  deleteAllNotificationsController)
 Routes.put('/update-notification', authMiddleware, updateNotification)
 

module.exports = Routes