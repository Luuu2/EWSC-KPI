import express from 'express';
import odbc from 'odbc';
import path from 'path';
import {JSDOM} from 'jsdom';
import fs from 'fs';
import puppeteer from 'puppeteer';


const puppet = puppeteer;
const initPath = path;
const app = express();
const connector = odbc;

const fs1 = fs;
const connectionString ='DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'; 
connector.connect(connectionString, (error, connection) => { 
    if (error) { console.error(error); return;
     } 
    connection.query('SELECT * FROM dbo.Audits_KPI', (error, rows) => { 
        if (error) { console.error(error); return; 
        }
        
        console.log(rows); }); });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const publicDirectory = path.resolve('../edamsPortal','./public');

app.get('/index', (req, res) => {
  const filePath = path.resolve('../edamsPortal/public', './index.html');
  res.sendFile(filePath);
});

app.get('/finance', (req, res) => {
    const filePath = path.resolve('../edamsPortal/public', './finance.html');
    res.sendFile(filePath);
  });

app.get('/audit', (req, res) => {
const filePath = path.resolve('../edamsPortal/public', './audit.html');
res.sendFile(filePath);
});

app.get('/hrcx', (req, res) => {
const filePath = path.resolve('../edamsPortal/public', './hrcx.html');
res.sendFile(filePath);
});

app.get('/qne', (req, res) => {
    //res.send('hi');
    const filePath = path.resolve('../edamsPortal/public', './qne.html');
    res.sendFile(filePath);
  });

app.get('/inftech', (req, res) => {
//res.send('hi');
const filePath = path.resolve('../edamsPortal/public', './inftech.html');
res.sendFile(filePath);
});

app.get('/ecowater', (req, res) => {
    //res.send('hi');
    const filePath = path.resolve('../edamsPortal/public', './ecowater.html');
    res.sendFile(filePath);
  });


// Define a route to handle audit form submission
app.post('/submit-Audit', async (req, res) => {
    const { auditTool, recIncidents, msAudits, NCsRep, NCsClo,critFind, IntAud, repFind,ttlIod,iodInd,disInjFreq,lostTime } = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.Audits_KPI (SHE_Audit_Tool_Compliance, Num_Of_Recorded_Incidents, ISO_MS_Audits,Num_Of_NCs_Reported,Num_Of_NCs_Closed,Critical_Findings,Internal_Audits,Repeat_Findings,Total_Num_Of_IODs,IOD_Indicator,Disabling_Injury_Frequency_Rate,Lost_Time_In_Hours) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query, [auditTool, recIncidents, msAudits,NCsRep,NCsClo,critFind,IntAud,repFind,ttlIod,iodInd,disInjFreq,lostTime]);
  
      // Close the connection
      await connection.close();
  
      res.send('Audit data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

// Define a route to handle ecowater form submission
app.post('/submit-Ecowater', async (req, res) => {
    const { periodEco,ownerEco, auditDate, lineAvail, ordQuantMet, prodCosts,haccpComp, revSales, newCust,prodVol,saleVol,ovEquipEff,prodSalesCost,fiscalYear,regionEco} = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.ECOWATER_REFORMATTED (Month_Desc,Owner_Name,Line_Availability,Order_Quatities_Met,Production_Costs,HACCP_Compliance,Revenue_Sales,New_Customers,Production_Volume_In_Cases,Sales_Volume_In_Cases,Overall_Equipment_Efficiency,Cost_Of_Production_Vs_Sales,FSCYEAR,Region) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query, [periodEco,ownerEco, lineAvail, ordQuantMet, prodCosts,haccpComp, revSales, newCust,prodVol,saleVol,ovEquipEff,prodSalesCost,fiscalYear,regionEco]);
  
      // Close the connection
      await connection.close();
  
      res.send('Ecowater data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

// Define a route to handle hrcx form submission
app.post('/submit-hrcx', async (req, res) => {
    const {periodHr,ownerHr, auditDateHr, fiscalYear, regionHr, totalDisciplinaryCases,newDisciplinaryCases, closedDisciplinaryCases, aveTurnaround,totalHighCourtCases,casesClosedHighCourt,industrialCourtTotal,industCourtClosed,noEmplInsurClaims,costEmplInsurClaims,vehicleNoInsurance,eInsuranceVehicle,insClaimsOtherNo,insClaimsOtherCost,wellCasesTtl,wellCasesNew,wellCasesRes,grievances,newGrievances,grievancesRr,personnelCosts,noEmployees,temporaryStaffNo,industAttach,aveVacantPos,emplPerThousand,emplOverTotal,trainingCosts,trainedEmployees,staffTurnover,absent,lostTime,ovtEligEmpl,overtime,ttlSrRep,srRes,resRate,ttlCompRep,ComResol,resolRate} = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.Emp_Of_Choice_REFORMATTED(Month_Desc,Owner_Name,AUDTDATE,FSCYEAR,Region,Total_Disciplinary_cases,New_Disciplinary_Cases,Closed_Disciplinary_Cases,Ave_Turnaround_Discpl_Cases,High_Court_Cases_Total,High_Court_Cases_Closed,Industrial_Court_Cases_Total,Industrial_Court_Cases_Closed,Num_Of_Emp_Insurance_Claims,Amount_Of_Emp_Insurance_Claims,Num_Of_Vehicle_Insurance_Claims,Amount_Of_Vehicle_Insurance_Claims,Num_Of_Other_Insurance_Claims,Amount_Of_Other_Insurance_Claims,Wellness_Cases_Total,Wellness_Cases_New,Wellness_Cases_Resolved,Grievances,Grievances_New,Grievances_Resolution_Rate,Personnel_Costs,Num_Of_Employees,Num_Of_Temporal_Staff_Ave,Industrial_Attachment,Vacant_Positions_Ave,Employees_1000_Per_Connections,Employees_Total_Cost,Training_Costs,Num_Of_Employees_Trained,Staff_Turnover_Voluntary,Absenteeism,Lost_Time_Due_To_Covid19,Overtime_Eligible_Employees,Overtime,Total_SRs_Reported,SRs_Resolved,SRs_Resolution_Rate,Total_Complaints_Reported,Complaints_Resolved,Complaints_Resolution_Rate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query,[periodHr,ownerHr, auditDateHr, fiscalYear, regionHr, totalDisciplinaryCases,newDisciplinaryCases, closedDisciplinaryCases, aveTurnaround,totalHighCourtCases,casesClosedHighCourt,industrialCourtTotal,industCourtClosed,noEmplInsurClaims,costEmplInsurClaims,vehicleNoInsurance,eInsuranceVehicle,insClaimsOtherNo,insClaimsOtherCost,wellCasesTtl,wellCasesNew,wellCasesRes,grievances,newGrievances,grievancesRr,personnelCosts,noEmployees,temporaryStaffNo,industAttach,aveVacantPos,emplPerThousand,emplOverTotal,trainingCosts,trainedEmployees,staffTurnover,absent,lostTime,ovtEligEmpl,overtime,ttlSrRep,srRes,resRate,ttlCompRep,ComResol,resolRate]);
  
      // Close the connection
      await connection.close();
  
      res.send('Employer of Choice data uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

// Define a route to handle infrastructure and technology form submission
app.post('/submit-infr', async (req, res) => {
    const {periodInf,ownerInf,auditDateInf,fiscalYearInf,regionInf,overspeeding,fltMgmtInc,mainExp,fltMainCost,sysAvail,netAvail,consReductPum,consReductNRW,tnlWat,tnlSew,MunAppr,newWatConn,newSewConn,bursts,leaks,plnInt,unplannedInterr,prodVsCapWat,prodVsCapSew,cpxExpE,cpxExpPerc} = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.INFR_TECH_REFOMARTTED (Month_Desc,Owner_Name,AUDTDATE,FSCYEAR,Region,Overspeeding,Fleet_Management_incidents,Maintenance_Expences_Facilities,Fleet_Maintenance_Cost,IT_System_Availability,Network_Availability,Energy_Consumption_Reduction_Pumping,Energy_Consumption_Reduction_Non_Pumping,Total_Network_length_Water,Total_Networ_length_Sewer,Municipal_Approvals,New_Water_Extensions,New_Sewer_Extensions,Bursts,Leaks,Planned_Interruptions,Unplanned_Interrruptions,Production_Vs_Capacity_Water,Inflow_Vs_Capacity_Sewer,Capex_Expenditure_Costs,Capex_Expenditure_In_Percentage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query, [periodInf,ownerInf,auditDateInf,fiscalYearInf,regionInf,overspeeding,fltMgmtInc,mainExp,fltMainCost,sysAvail,netAvail,consReductPum,consReductNRW,tnlWat,tnlSew,MunAppr,newWatConn,newSewConn,bursts,leaks,plnInt,unplannedInterr,prodVsCapWat,prodVsCapSew,cpxExpE,cpxExpPerc]);
  
      // Close the connection
      await connection.close();
  
      res.send('Infrastructure and Technology data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

// Define a route to handle ecowater form submission
app.post('/submit-quality', async (req, res) => {
    const {periodq,ownerq, auditDateQ,fiscalYearQ,regionq,treatWatTurb,DistwatTurb,treatWatMicro,distWaterMicro,treatWatPhys,overallComp,wwEffComp,infVolume,outflVol,envInc,wwtpEffMicro,wwtpEfflCOD,wwtpEffEc,wwtpEfflColour,oqc,wqa,ncRep,ncClo} = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.QE_REFORMATTED (Month_Desc,Owner_Name,AUDTDATE,FSCYEAR,Region,Treated_Water_Turbidity_Compliance_5NTU,Distribution_Water_Turbidity_Compliance_5NTU,Treated_Water_Microbiology_Compliance,Distribution_Water_Microbiology_Compliance,Treated_Water_Phys_Chem_Compliance,Overall_Compliance,Wastewater_Effluent_Compliance,Inflow_Volume,Outflow_Volume,Environment_Incidents,EWSC_WWTP_Effluent_Microbiology_Compliance,EWSC_WWTP_Effluent_COD_Compliance,EWSC_WWTP_Effluent_EC_Compliance,EWSC_WWTP_Effluent_Colour_Compliance,Overall_Quality_Compliance,WTP_Quality_Audit,Num_Of_NCs_Reported,Num_Of_NCs_Closed) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query, [periodq,ownerq, auditDateQ,fiscalYearQ,regionq,treatWatTurb,DistwatTurb,treatWatMicro,distWaterMicro,treatWatPhys,overallComp,wwEffComp,infVolume,outflVol,envInc,wwtpEffMicro,wwtpEfflCOD,wwtpEffEc,wwtpEfflColour,oqc,wqa,ncRep,ncClo]);
  
      // Close the connection
      await connection.close();
  
      res.send('Quality and Environment data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

// Define a route to handle Finance form submission
app.post('/submit-finance', async (req, res) => {
    const {periodFin,ownerFin,auditDate,fiscalYearF,regionFin,turnCoBus,othInc,otherIncTurn,collections,collRate,expenses, operProfit,operProfMar,cashCov,ttlWatConn,ttlSewerConn,volBill,discrep,debtors,debtDays,volAbs,volProd,newWatConn,newSewConn,newConnWat,newConnSew,prodUnitCost,labInc,emaNRW,percNRW,illConnInv,illConnConf} = req.body;
  
    try {
      // Create an ODBC connection
      const connection = await odbc.connect({
        connectionString: 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'
      });
  
      // Create an SQL query to insert form data into a table
      const query = `INSERT INTO dbo.FINANCIAL_REFORMATTED(Month_Desc,Owner_Name,AUDTDATE,FSCYEAR,Region,Turnover_Core_Business,Other_Income,Turnover_Other_Income,Collections,Collection_Rate,Expenses,Operating_Profit,Operating_Profit_Margin,Cash_Coverage_Days,Total_Water_Connections,Total_Sewer_Connections,Volume_Billed,Discrepancies,Debtors_Average_YTD,Debtors_Days_Average_YTD,Volume_Abstracted,Volume_Produced,New_Water_Connections,New_Sewer_Connections,New_Connections_Lengths_Water,New_Connections_Lengths_Sewer,Unit_Cost_Of_Prod,Lab_Income_Ext_Customers,NRW,NRW2,Illegal_Connections_Investigated,Illegal_Connections_Confirmed) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      // Execute the query with form data
      await connection.query(query, [periodFin,ownerFin,auditDate,fiscalYearF,regionFin,turnCoBus,othInc,otherIncTurn,collections,collRate,expenses, operProfit,operProfMar,cashCov,ttlWatConn,ttlSewerConn,volBill,discrep,debtors,debtDays,volAbs,volProd,newWatConn,newSewConn,newConnWat,newConnSew,prodUnitCost,labInc,emaNRW,percNRW,illConnInv,illConnConf]);
  
      // Close the connection
      await connection.close();
  
      res.send('Ecowater data inserted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data');
    }
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  
});





/**const auditHtml = fs1.readFileSync('public/audit.html', 'utf-8');
//console.log(auditHtml);
const {window:auditWindow} = new JSDOM(auditHtml);
const auditDocument = auditWindow.document;

auditWindow.onload=()=>{
    const audUpload = auditDocument.getElementById('uploadAud');
    console.log("here");
    audUpload.addEventListener('click', ()=> {
        //Generic inputs
        const region = auditDocument.getElementById('inputGroupSelectRegionA').selected.value;
        const ownerName = auditDocument.getElementById('ownerNameAud').value;
        const period = auditDocument.getElementById('inputGroupSelectPeriodA').selected.value;
        const fiscalYear = auditDocument.getElementById('fiscalYearAud').value;
        const audDate = auditDocument.getElementById('auditDateAud').value;

        // Audit specific inputs
        const auditTool = auditDocument.getElementById('auditTool').value;
        const recIncidents = auditDocument.getElementById('recIncidents').value;
        const msAudits = auditDocument.getElementById('msAudits').value;
        const ncsRep = auditDocument.getElementById('NCsRep').value;
        const ncsClo =  auditDocument.getElementById('NCsClo').value;
        const critFind =  auditDocument.getElementById('critFind').value;
        const repFind =  auditDocument.getElementById('repFind').value;
        const ttlIod =  auditDocument.getElementById('ttlIod').value;
        const iodInd =  auditDocument.getElementById('iodInd').value;
        const disInj =  auditDocument.getElementById('disInjFreq').value;
        const timeInj =  auditDocument.getElementById('timeInjFre').value;
        const lostTime =  auditDocument.getElementById('lostTime').value;
        console.log("hello");
    //database upload
        connector.connect(connectionString, (error, connection) => {
            if (error) {
                console.error(error);
                return;
            }

            const query = `INSERT INTO dbo.Audits_KPI (SHE_Audit_Tool_Compliance, Num_Of_Recorded_Incidents,ISO_MS_Audits,Num_Of_NCs_Reported,Num_Of_Ncs_Closed) VALUES ('${auditTool}', '${recIncidents}','${msAudits}','${ncsRep}','${ncsClo}')`;
            // Replace "column1" and "column2" with the actual column names in your table
            // Add more columns and values as needed, separated by commas

            connection.query(query, (error, rows) => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(rows);
            });
        });


    })


};





/*define(function (require) {
    var requirejs = require('requirejs');
    requirejs.config({
        //Pass the top-level main.js/index.js require
        //function to requirejs so that node modules
        //are loaded relative to the top-level JS file.
        nodeRequire: require
    });
});*/


/*requirejs(['odbc'],
function   (foo) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
    odbc.connect(connectionString, (error, connection) => { 
        if (error) { console.error(error); return;
         } 
        connection.query('SELECT * FROM dbo.Financial_KPI', (error, rows) => { 
            if (error) { console.error(error); return; 
            }
            
        console.log(rows); }); });
});*/



/*import odbc from 'odbc';
const connector = require('odbc'); 
const connectionString = 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'; 
connector.connect(connectionString, (error, connection) => { 
    if (error) { console.error(error); return;
     } 
    connection.query('SELECT * FROM dbo.Financial_KPI', (error, rows) => { 
        if (error) { console.error(error); return; 
        }
        
    console.log(rows); }); });
*/
/*require(['require','odbc'],function(require){
    var connector = require('odbc');
    const connectionString = 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'; 
    connector.connect(connectionString, (error, connection) => { 
        if (error) { console.error(error); return;
        } 
        connection.query('SELECT * FROM dbo.Financial_KPI', (error, rows) => { 
            if (error) { console.error(error); return; 
            }
    console.log(rows); }); });
});

/*define(function (require) {
    var odbc = require('odbc');
    const connectionString = 'DSN=Oper_Matrix;UID=sa;PWD=Astounding*02'; 
    odbc.connect(connectionString, (error, connection) => { 
        if (error) { console.error(error); return;
        } 
        connection.query('SELECT * FROM dbo.Financial_KPI', (error, rows) => { 
            if (error) { console.error(error); return; 
            }
    console.log(rows); }); });
});*/