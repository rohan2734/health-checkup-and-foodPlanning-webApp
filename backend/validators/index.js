const { check,validationResult} = require('express-validator');

  const userSignUpValidator = [
    check('username','username is required').not().isEmpty(),
    check('email','Email must be between 4 to 32 characters')
      .matches(/.+\@.+\..+/)
      .withMessage("EMail must contain contain@"),
    check('password','Password is required')
    .isLength({min:6})
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('password must contain a number'),
    (req,res,next) => {
      const result= validationResult(req);
      const errors= result.errors;
      if(errors.length >0){
        const firstError = result.errors.map(error => error.msg)[0]
        return res.status(422).json({errors:firstError});
      }
      next();
    },
    
  ];

  const searchQueryValidator = [
    check('req.query.search','search query is empty').not().isEmpty()
  ]
  
exports.searchQueryValidator = searchQueryValidator;
exports.userSignUpValidator = userSignUpValidator;