const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const cors = require('cors');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const {swaggerUi, spec} = require('./api/config/openApi/SwaggerConfig');

let option = {};

app.use('/swagger-ui', swaggerUi.serveFiles(spec), swaggerUi.setup((spec, option)))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const authRouter = require('./api/app/auth/controller/AuthController');
const userRouter = require('./api/app/user/controller/UserController');
const boardRouter = require('./api/app/board/controller/BoardController');
const excelRouter = require('./api/common/file/controller/ExcelController');
// const pushRouter = require('./api/batch/push/Push');

const userCaseRouter = require('./api/app/userCase/controller/UserCaseController');
const userTodoRouter = require('./api/app/userTodo/controller/UserTodoController');
const userNoteRouter = require('./api/app/userNote/controller/UserNoteController');
const plusMemberRouter = require('./api/app/plusMember/controller/PlusMemberController');
const purchaseRouter = require('./api/app/purchase/PurchaseValidation');

const adminAuthRouter = require('./api/admin/auth/controller/AdminAuthController');
const adminUserRouter = require('./api/admin/user/controller/AdminUserController');
const adminNoticeRouter = require('./api/admin/notice/controller/NoticeController')

const termsRouter = require('./api/admin/terms/controller/TermsController');


// const webViewRouter = require('./api/app/webView/webView');

app.use('/api', authRouter, userRouter, boardRouter, /*pushRouter*/ excelRouter, userCaseRouter, userTodoRouter, userNoteRouter, termsRouter, plusMemberRouter, purchaseRouter);

app.use('/api', adminAuthRouter, adminUserRouter, adminNoticeRouter)

const test1Router = require('./api/app/Test1')
const test2Router = require('./api/app/Test2')
const test3Router = require('./api/app/Test3')

app.use('/api', test1Router,test2Router,test3Router);


// let batch = require('./api/common/crawler/Crawler');
// let r = batch.sanoCrawler(1,2,3);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// [ Batch]
const batch = require("./api/batch/scheduler/Scheduler")


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
