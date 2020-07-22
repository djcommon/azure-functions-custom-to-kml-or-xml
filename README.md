
# Azure Functions (Serverless HTTP Trigger) - Documentation
### Sample Inputs Data:
**Single Input** 
 `(01-CV-1001 --- 54 34'13.64'' N, 1 19'44.34'' W)`
**Multiple Input** 
 `(01-CV-1001 --- 54 34'13.64'' N, 1 19'44.34'' W), (01-CV-1002 --- 54 34' 27.22'' N, 1 14' 05.84'' W), (01-LAH-1002 --- 54 58' 41.71'' N, 1 37' 04.01'' W), (NP-01-001 --- 54 46'30.90'' N, 1 35'05.47'' W), (HV-202 --- 54 51'06.47'' N, 1 49'58.89'' W)`


### Sample Input HTTP Trigger:

**Single** 

    http://newbyranjith.azurewebsites.net/api/HttpTrigger1?input=(01-CV-1001 --- 54 34'13.64'' N, 1 19'44.34'' W)

**Multiple** 

    http://newbyranjith.azurewebsites.net/api/HttpTrigger1?input=(01-CV-1001 --- 54 34'13.64'' N, 1 19'44.34'' W), (01-CV-1002 --- 54 34' 27.22'' N, 1 14' 05.84'' W), (01-LAH-1002 --- 54 58' 41.71'' N, 1 37' 04.01'' W), (NP-01-001 --- 54 46'30.90'' N, 1 35'05.47'' W), (HV-202 --- 54 51'06.47'' N, 1 49'58.89'' W)
