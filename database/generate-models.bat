D:
cd D:\Wordplace\2_Blue\1University\third_course_2\#CourseProject\Dev\backend\backend
call npx sequelize-auto -o "./src/models" -d harwex_afisha -u sa -x Passw0rd1 -h localhost -p 1433 -e mssql

cd .\src\models
call npx eslint "/**" --fix

pause
