import { body } from 'express-validator'

export const eventCreateValidation = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long')
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description is required'),

  body('eventDate')
    .isISO8601()
    .withMessage('Event date must be in the format YYYY-MM-DDTHH:mm')
    .notEmpty()
    .withMessage('Event date is required'),

  body('organizer')
    .isLength({ min: 3 })
    .withMessage('Organizer must be at least 3 characters long')
    .isString()
    .withMessage('Organizer must be a string')
    .notEmpty()
    .withMessage('Organizer is required')
]

export const eventRegisterValidation = [
  body('fullName')
    .isString()
    .withMessage('Full name must be a string')
    .isLength({ min: 1 })
    .withMessage('Full name is required')
    .notEmpty()
    .withMessage('Full name cannot be empty'),

  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),

  body('dateOfBirth')
    .isISO8601()
    .withMessage('Must be a valid date in the format YYYY-MM-DD')
    .notEmpty()
    .withMessage('Date of birth is required'),

  body('referralSource')
    .isString()
    .withMessage('Referral source must be a string')
    .isLength({ min: 1 })
    .withMessage('Referral source is required')
    .notEmpty()
    .withMessage('Referral source cannot be empty'),

  body('eventId')
    .isMongoId()
    .withMessage('Must be a valid Event ID')
    .notEmpty()
    .withMessage('Event ID is required')
]
