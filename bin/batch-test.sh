for i in `seq 10`; do
 gulp test
 if [ $? -ne 0 ];
 then
   exit $?
 fi
done
echo "test run successfully"
exit $?
