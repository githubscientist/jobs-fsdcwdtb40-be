const express = require('express');
const { createCompany, getAllCompanies, updateCompany, deleteCompany, createRecruiter, getAllRecruiters } = require('../controllers/adminController');

const { isAuthenticated, allowRoles } = require('../middlewares/auth');

const companyRouter = express.Router();

// all routes in this router are protected and only accessible by admin users
companyRouter.use(isAuthenticated);
companyRouter.use(allowRoles(['admin']));

companyRouter.post('/', createCompany);
companyRouter.get('/', getAllCompanies);
companyRouter.put('/:id', updateCompany);
companyRouter.delete('/:id', deleteCompany);

companyRouter.post('/recruiters', createRecruiter);
companyRouter.get('/recruiters', getAllRecruiters);

module.exports = companyRouter;